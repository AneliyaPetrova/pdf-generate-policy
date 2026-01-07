import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, 
  ArrowLeft,
  Lock,
  Eye,
  Database,
  UserCheck,
  Clock,
  Mail,
  FileText,
  AlertTriangle
} from 'lucide-react';

const PrivacyPolicy = () => {
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
              <p className="text-sm text-muted-foreground">Поверителност</p>
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
            <Lock className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Политика за поверителност
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Информация за обработката и защитата на личните данни
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Последна актуализация: {new Date().toLocaleDateString('bg-BG')}
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              1. Въведение
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Настоящата Политика за поверителност описва как събираме, използваме, 
              съхраняваме и защитаваме Вашите лични данни при използване на нашата 
              система за генериране на политики за информационна сигурност.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Ние се ангажираме да защитаваме Вашата поверителност и да обработваме 
              личните Ви данни в съответствие с Общия регламент за защита на данните 
              (GDPR) и приложимото българско законодателство.
            </p>
          </CardContent>
        </Card>

        {/* Data Collection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              2. Какви данни събираме
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">2.1. Данни за регистрация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Имейл адрес</strong> - за идентификация и комуникация</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Пълно име</strong> - за персонализация на услугата</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Парола</strong> - криптирана, за защита на акаунта</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">2.2. Автоматично събирани данни</h4>
              <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Дата и час на регистрация</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Бисквитки</strong> - за подобряване на потребителското изживяване</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">2.3. Данни от използването</h4>
              <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Генерирани политики</strong> - съдържанието на създадените документи</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Избрани настройки</strong> - ниво на сигурност и компоненти</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Purpose of Processing */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              3. Цели на обработването
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <UserCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground">Предоставяне на услугата</strong>
                  <p>Създаване и управление на потребителски акаунти, генериране на персонализирани политики за сигурност</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <Lock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground">Сигурност</strong>
                  <p>Защита на Вашия акаунт от неоторизиран достъп, предотвратяване на злоупотреби</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground">Комуникация</strong>
                  <p>Изпращане на важни известия относно услугата, отговор на Вашите запитвания</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Legal Basis */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              4. Правно основание
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              Обработването на Вашите лични данни се основава на:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mt-4">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">а)</span>
                <span><strong>Договорно основание (чл. 6, ал. 1, буква "б" от GDPR)</strong> - 
                обработването е необходимо за изпълнение на договор, по който сте страна</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">б)</span>
                <span><strong>Съгласие (чл. 6, ал. 1, буква "а" от GDPR)</strong> - 
                за използване на бисквитки и маркетингови комуникации</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">в)</span>
                <span><strong>Законен интерес (чл. 6, ал. 1, буква "е" от GDPR)</strong> - 
                за подобряване на услугата и предотвратяване на измами</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Data Retention */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              5. Срок на съхранение
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-semibold">Тип данни</th>
                    <th className="text-left py-2 font-semibold">Срок на съхранение</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2">Данни за акаунта</td>
                    <td className="py-2">До изтриване на акаунта</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Генерирани политики</td>
                    <td className="py-2">До изтриване от потребителя</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Логове за сигурност</td>
                    <td className="py-2">90 дни</td>
                  </tr>
                  <tr>
                    <td className="py-2">Бисквитки</td>
                    <td className="py-2">До 1 година или до оттегляне на съгласието</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* User Rights */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              6. Вашите права
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Съгласно GDPR, Вие имате следните права относно Вашите лични данни:
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="p-3 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-sm mb-1">Право на достъп</h4>
                <p className="text-xs text-muted-foreground">
                  Да получите информация какви данни обработваме за Вас
                </p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-sm mb-1">Право на коригиране</h4>
                <p className="text-xs text-muted-foreground">
                  Да поискате коригиране на неточни данни
                </p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-sm mb-1">Право на изтриване</h4>
                <p className="text-xs text-muted-foreground">
                  Да поискате изтриване на Вашите данни ("право да бъдеш забравен")
                </p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-sm mb-1">Право на ограничаване</h4>
                <p className="text-xs text-muted-foreground">
                  Да ограничите обработването при определени обстоятелства
                </p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-sm mb-1">Право на преносимост</h4>
                <p className="text-xs text-muted-foreground">
                  Да получите данните си в структуриран формат
                </p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-sm mb-1">Право на възражение</h4>
                <p className="text-xs text-muted-foreground">
                  Да възразите срещу обработването за определени цели
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Measures */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              7. Мерки за сигурност
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Прилагаме следните технически и организационни мерки за защита на Вашите данни:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Lock className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Криптиране на пароли с bcrypt алгоритъм</span>
              </li>
              <li className="flex items-start gap-2">
                <Lock className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>HTTPS криптиране на всички комуникации</span>
              </li>
              <li className="flex items-start gap-2">
                <Lock className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Row Level Security (RLS) за защита на базата данни</span>
              </li>
              <li className="flex items-start gap-2">
                <Lock className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>JWT токени за автентикация</span>
              </li>
              <li className="flex items-start gap-2">
                <Lock className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Редовни резервни копия на данните</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Cookies */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              8. Бисквитки (Cookies)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Използваме следните видове бисквитки:
            </p>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <h4 className="font-semibold text-sm mb-1">Задължителни бисквитки</h4>
                <p className="text-xs text-muted-foreground">
                  Необходими за функционирането на сайта - автентикация и сигурност на сесията
                </p>
              </div>
              <div className="p-3 border rounded-lg">
                <h4 className="font-semibold text-sm mb-1">Функционални бисквитки</h4>
                <p className="text-xs text-muted-foreground">
                  Запомняне на Вашите предпочитания и настройки
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              9. Контакт
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              За въпроси относно обработването на лични данни или за упражняване на Вашите права:
            </p>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm">
                <strong>Имейл:</strong>{' '}
                <a href="mailto:aneliyabinin@abv.bg" className="text-primary hover:underline">
                  aneliyabinin@abv.bg
                </a>
              </p>
              <p className="text-sm mt-2 text-muted-foreground">
                Ще отговорим на Вашето запитване в срок до 30 дни.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Complaints */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              10. Право на жалба
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Ако считате, че обработването на Вашите лични данни нарушава GDPR, 
              имате право да подадете жалба до:
            </p>
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="font-semibold text-sm">Комисия за защита на личните данни</p>
              <p className="text-sm text-muted-foreground mt-1">
                Адрес: бул. "Проф. Цветан Лазаров" № 2, София 1592
              </p>
              <p className="text-sm text-muted-foreground">
                Уебсайт:{' '}
                <a 
                  href="https://www.cpdp.bg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  www.cpdp.bg
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Генератор на политики за сигурност</p>
          <p className="mt-1">Дипломен проект - Всички права запазени</p>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
