import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAdmin } from '@/hooks/useAdmin';
import { Button } from '@/components/ui/button';
import { Shield, LogOut, Info, Settings, User } from 'lucide-react';
import PolicyGenerator from '@/components/PolicyGenerator';

const Index = () => {
  const { user, loading, signOut } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Политика за сигурност</h1>
              <p className="text-sm text-muted-foreground">Генератор</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/about">
              <Button variant="ghost" size="sm">
                <Info className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">За нас</span>
              </Button>
            </Link>
            {!adminLoading && isAdmin && (
              <Link to="/admin">
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Админ</span>
                </Button>
              </Link>
            )}
            <Link to="/profile">
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Профил</span>
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Изход</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <PolicyGenerator />
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Генератор на политики за сигурност</p>
            <div className="flex items-center gap-4">
              <Link to="/about" className="hover:text-foreground transition-colors">
                За нас
              </Link>
              <span>•</span>
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                Поверителност
              </Link>
              <span>•</span>
              <span>Дипломен проект</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
