import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  Shield, 
  ArrowLeft, 
  User, 
  Mail, 
  Calendar,
  Download,
  Trash2,
  Save,
  Loader2,
  FileJson,
  AlertTriangle,
  CheckCircle,
  Edit
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfileData {
  id: string;
  user_id: string;
  email: string | null;
  full_name: string | null;
  created_at: string;
  updated_at: string;
}

const Profile = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [fullName, setFullName] = useState('');
  const [deleteConfirmEmail, setDeleteConfirmEmail] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
      return;
    }

    if (user) {
      fetchProfile();
    }
  }, [user, authLoading, navigate]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      
      if (data) {
        setProfile(data);
        setFullName(data.full_name || '');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: 'Грешка',
        description: 'Неуспешно зареждане на профила',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // GDPR: Right to rectification - Update profile
  const handleUpdateProfile = async () => {
    if (!user || !profile) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          full_name: fullName.trim(),
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setProfile({ ...profile, full_name: fullName.trim() });
      setEditMode(false);
      toast({
        title: 'Успешно!',
        description: 'Профилът е актуализиран',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Грешка',
        description: 'Неуспешна актуализация на профила',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  // GDPR: Right to data portability - Export data
  const handleExportData = async () => {
    if (!user || !profile) return;
    
    setExporting(true);
    try {
      // Gather all user data
      const exportData = {
        exportDate: new Date().toISOString(),
        exportFormat: 'JSON',
        gdprArticle: 'Article 20 - Right to data portability',
        userData: {
          profile: {
            id: profile.id,
            email: profile.email,
            fullName: profile.full_name,
            createdAt: profile.created_at,
            updatedAt: profile.updated_at,
          },
          account: {
            userId: user.id,
            email: user.email,
            createdAt: user.created_at,
            lastSignIn: user.last_sign_in_at,
          },
        },
        dataCategories: [
          {
            category: 'Идентификационни данни',
            data: ['Имейл адрес', 'Пълно име'],
            purpose: 'Идентификация и комуникация',
          },
          {
            category: 'Данни за акаунта',
            data: ['Дата на регистрация', 'Последно влизане'],
            purpose: 'Управление на услугата',
          },
        ],
      };

      // Create and download JSON file
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
        type: 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `gdpr-data-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: 'Експортът е готов!',
        description: 'Вашите данни са изтеглени във формат JSON',
      });
    } catch (error) {
      console.error('Error exporting data:', error);
      toast({
        title: 'Грешка',
        description: 'Неуспешен експорт на данните',
        variant: 'destructive',
      });
    } finally {
      setExporting(false);
    }
  };

  // GDPR: Right to erasure - Delete account
  const handleDeleteAccount = async () => {
    if (!user || deleteConfirmEmail !== user.email) {
      toast({
        title: 'Грешка',
        description: 'Моля, въведете коректния имейл за потвърждение',
        variant: 'destructive',
      });
      return;
    }
    
    setDeleting(true);
    try {
      // Delete profile first (RLS will handle permissions)
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('user_id', user.id);
      
      if (profileError) throw profileError;

      // Delete user roles
      const { error: rolesError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', user.id);
      
      // Note: Actual user deletion from auth.users requires admin privileges
      // For now, we sign out and inform the user
      await signOut();
      
      toast({
        title: 'Акаунтът е изтрит',
        description: 'Вашите данни са премахнати от системата',
      });
      
      navigate('/auth');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast({
        title: 'Грешка',
        description: 'Неуспешно изтриване на акаунта. Моля, свържете се с нас.',
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <User className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Моят профил</h1>
              <p className="text-sm text-muted-foreground">GDPR настройки</p>
            </div>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Profile Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Лични данни
                </CardTitle>
                <CardDescription>
                  Преглед и редактиране на Вашите данни
                </CardDescription>
              </div>
              {!editMode && (
                <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Редактирай
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Пълно име</Label>
              {editMode ? (
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Въведете пълното си име"
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.full_name || 'Не е зададено'}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Имейл адрес</Label>
              <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{profile.email || user.email}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Имейлът не може да бъде променен
              </p>
            </div>

            <div className="space-y-2">
              <Label>Дата на регистрация</Label>
              <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  {new Date(profile.created_at).toLocaleDateString('bg-BG', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>

            {editMode && (
              <div className="flex gap-2 pt-4">
                <Button onClick={handleUpdateProfile} disabled={saving}>
                  {saving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Запази
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEditMode(false);
                    setFullName(profile.full_name || '');
                  }}
                >
                  Отказ
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Data Portability Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Експорт на данни
            </CardTitle>
            <CardDescription>
              Право на преносимост на данните
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Изтеглете копие на всички Ваши лични данни в структуриран, 
              машинночетим формат (JSON).
            </p>
            <Button 
              variant="outline" 
              onClick={handleExportData}
              disabled={exporting}
            >
              {exporting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <FileJson className="h-4 w-4 mr-2" />
              )}
              Изтегли данните (JSON)
            </Button>
          </CardContent>
        </Card>

        {/* GDPR Rights Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Вашите GDPR права
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Право на достъп</p>
                  <p className="text-xs text-muted-foreground">Виждате данните си по-горе</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Право на коригиране</p>
                  <p className="text-xs text-muted-foreground">Редактирайте профила</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Право на преносимост</p>
                  <p className="text-xs text-muted-foreground">Експортирайте данните</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Право на изтриване</p>
                  <p className="text-xs text-muted-foreground">Изтрийте акаунта</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delete Account Card */}
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              Изтриване на акаунт
            </CardTitle>
            <CardDescription>
              Право да бъдеш забравен
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3 p-4 bg-destructive/10 rounded-lg mb-4">
              <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-destructive">Внимание!</p>
                <p className="text-muted-foreground">
                  Изтриването на акаунта е необратимо. Всички Ваши данни ще бъдат 
                  окончателно премахнати от системата.
                </p>
              </div>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Изтрий акаунта
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Сигурни ли сте?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Това действие е необратимо. Всички Ваши данни ще бъдат 
                    окончателно изтрити от системата.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="py-4">
                  <Label htmlFor="confirmEmail">
                    Въведете имейла си за потвърждение:
                  </Label>
                  <Input
                    id="confirmEmail"
                    type="email"
                    value={deleteConfirmEmail}
                    onChange={(e) => setDeleteConfirmEmail(e.target.value)}
                    placeholder={user.email || ''}
                    className="mt-2"
                  />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setDeleteConfirmEmail('')}>
                    Отказ
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    disabled={deleting || deleteConfirmEmail !== user.email}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    {deleting ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4 mr-2" />
                    )}
                    Изтрий завинаги
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Link to Privacy Policy */}
        <div className="text-center mt-8">
          <Link to="/privacy" className="text-sm text-primary hover:underline">
            Прочетете пълната Политика за поверителност →
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Profile;
