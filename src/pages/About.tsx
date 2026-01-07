import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, 
  Target, 
  BookOpen, 
  Award, 
  ArrowLeft,
  Mail,
  Lock,
  FileText
} from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Политика за сигурност</h1>
              <p className="text-sm text-muted-foreground">За нас</p>
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

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            За нас
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Вашият надежден партньор за създаване на политики за информационна сигурност
          </p>
        </div>

        {/* About Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Какво представлява системата?
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              Нашата платформа е уеб-базирано решение, което помага на организации от всякакъв 
              размер да създават професионални политики за информационна сигурност. Системата 
              автоматизира процеса и гарантира съответствие с най-добрите практики в индустрията.
            </p>
          </CardContent>
        </Card>

        {/* How it works */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Как работи?
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                <span><strong>Изберете ниво на сигурност</strong> – Базово, Средно или Високо, според специфичните нужди на вашата организация.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                <span><strong>Изберете компоненти</strong> – Контрол на достъпа, криптиране, мониторинг, управление на инциденти и други защитни механизми.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                <span><strong>Генерирайте документ</strong> – Системата автоматично създава структуриран документ с вашата персонализирана политика.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">4.</span>
                <span><strong>Изтеглете в PDF</strong> – Експортирайте готовата политика за лесно разпространение и имплементация.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5" />
                Нашата мисия
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Да направим информационната сигурност достъпна за всички
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Да спестим време при създаване на документация
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Да осигурим професионален формат на документите
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Да популяризираме добрите практики в сигурността
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lock className="h-5 w-5" />
                Защо да изберете нас?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Лесен и интуитивен интерфейс
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Персонализирани политики според нуждите ви
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Експорт в професионален PDF формат
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Сигурно съхранение на данните
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Technologies */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Технологии
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Платформата е изградена с използване на съвременни технологии като React.js, 
              TypeScript и PostgreSQL, които гарантират надеждност, бързодействие и сигурност 
              на вашите данни.
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Контакт
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              За въпроси относно проекта или предложения за подобрения:
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-primary" />
              <a href="mailto:aneliyabinin@abv.bg" className="text-primary hover:underline">
                aneliyabinin@abv.bg
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Генератор на политики за сигурност</p>
          <p className="mt-1">Всички права запазени</p>
        </div>
      </main>
    </div>
  );
};

export default About;
