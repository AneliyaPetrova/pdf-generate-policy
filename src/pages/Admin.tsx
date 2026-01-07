import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Shield, ArrowLeft, Users, Loader2, RefreshCw, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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

interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  created_at: string;
}

const Admin = () => {
  const { user, loading: authLoading, session } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const deleteUser = async (userId: string, userEmail: string) => {
    if (!session?.access_token) {
      toast({
        title: 'Грешка',
        description: 'Не сте автентикирани',
        variant: 'destructive',
      });
      return;
    }

    setDeletingUserId(userId);
    try {
      const { data, error } = await supabase.functions.invoke('delete-user', {
        body: { user_id: userId },
      });

      if (error) throw error;

      toast({
        title: 'Успех',
        description: `Потребителят ${userEmail} беше изтрит`,
      });

      // Refresh the users list
      await fetchUsers();
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Грешка',
        description: error.message || 'Неуспешно изтриване на потребителя',
        variant: 'destructive',
      });
    } finally {
      setDeletingUserId(null);
    }
  };

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
      return;
    }

    if (user) {
      checkAdminStatus();
    }
  }, [user, authLoading, navigate]);

  const checkAdminStatus = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .rpc('has_role', { _user_id: user.id, _role: 'admin' });
      
      if (error) throw error;
      
      if (data) {
        setIsAdmin(true);
        await fetchUsers();
      } else {
        setIsAdmin(false);
        toast({
          title: 'Достъп отказан',
          description: 'Нямате администраторски права',
          variant: 'destructive',
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setRefreshing(true);
    try {
      const { data, error } = await supabase.rpc('get_all_users');
      
      if (error) throw error;
      
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Грешка',
        description: 'Неуспешно зареждане на потребителите',
        variant: 'destructive',
      });
    } finally {
      setRefreshing(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive">
              <Shield className="h-5 w-5 text-destructive-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Админ панел</h1>
              <p className="text-sm text-muted-foreground">Управление на потребители</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Регистрирани потребители
                </CardTitle>
                <CardDescription>
                  Преглед на всички регистрирани потребители в системата
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchUsers}
                disabled={refreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Обнови
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Няма регистрирани потребители</p>
              </div>
            ) : (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Име</TableHead>
                      <TableHead>Имейл</TableHead>
                      <TableHead>Дата на регистрация</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((userProfile) => (
                      <TableRow key={userProfile.id}>
                        <TableCell className="font-medium">
                          {userProfile.full_name || 'Не е зададено'}
                        </TableCell>
                        <TableCell>{userProfile.email}</TableCell>
                        <TableCell>
                          {new Date(userProfile.created_at).toLocaleDateString('bg-BG', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">Активен</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {userProfile.user_id !== user?.id ? (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  disabled={deletingUserId === userProfile.user_id}
                                >
                                  {deletingUserId === userProfile.user_id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="h-4 w-4" />
                                  )}
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Изтриване на потребител</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Сигурни ли сте, че искате да изтриете потребителя{' '}
                                    <strong>{userProfile.email}</strong>? Това действие е необратимо.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Отказ</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteUser(userProfile.user_id, userProfile.email)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Изтрий
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          ) : (
                            <Badge variant="outline">Вие</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            <div className="mt-4 text-sm text-muted-foreground">
              Общо потребители: <strong>{users.length}</strong>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
