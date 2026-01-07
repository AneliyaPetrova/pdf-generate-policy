import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FileDown, Shield, ShieldCheck, ShieldAlert, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import { loadRobotoFont } from '@/lib/pdfFonts';

type SecurityLevel = 'basic' | 'medium' | 'high';

interface SecurityComponent {
  id: string;
  label: string;
  description: string;
}

const securityComponents: SecurityComponent[] = [
  { id: 'encryption', label: 'Криптиране на данни', description: 'Шифроване на чувствителна информация' },
  { id: 'antivirus', label: 'Антивирусна защита', description: 'Защита от зловреден софтуер' },
  { id: 'firewall', label: 'Защитна стена', description: 'Филтриране на мрежовия трафик' },
  { id: 'backup', label: 'Резервни копия', description: 'Редовно архивиране на данни' },
  { id: 'access_control', label: 'Контрол на достъпа', description: 'Ограничаване на достъпа до ресурси' },
  { id: 'audit', label: 'Одит и логове', description: 'Проследяване на действията в системата' },
  { id: 'password_policy', label: 'Политика за пароли', description: 'Правила за сигурни пароли' },
  { id: 'training', label: 'Обучение на персонала', description: 'Програми за повишаване на осведомеността' },
];

const securityLevelDescriptions: Record<SecurityLevel, string> = {
  basic: 'Базово ниво - Подходящо за малки организации с минимални изисквания',
  medium: 'Средно ниво - Балансиран подход за повечето бизнеси',
  high: 'Високо ниво - Максимална защита за критична инфраструктура',
};

const generatePolicyText = (level: SecurityLevel, selectedComponents: string[]): string => {
  const date = new Date().toLocaleDateString('bg-BG');
  const levelName = level === 'basic' ? 'Базово' : level === 'medium' ? 'Средно' : 'Високо';
  
  let text = `ПОЛИТИКА ЗА ИНФОРМАЦИОННА СИГУРНОСТ\n`;
  text += `${'='.repeat(50)}\n\n`;
  text += `Дата на създаване: ${date}\n`;
  text += `Ниво на сигурност: ${levelName}\n\n`;
  
  text += `1. ВЪВЕДЕНИЕ\n`;
  text += `-`.repeat(30) + `\n`;
  text += `Тази политика определя насоките и изискванията за защита на информационните активи на организацията. `;
  text += `Избраното ниво на сигурност е "${levelName}", което осигурява ${securityLevelDescriptions[level].toLowerCase()}.\n\n`;
  
  text += `2. ОБХВАТ\n`;
  text += `-`.repeat(30) + `\n`;
  text += `Политиката се прилага за всички служители, подизпълнители и трети страни, които имат достъп до информационните системи.\n\n`;
  
  text += `3. ИЗБРАНИ ЗАЩИТНИ КОМПОНЕНТИ\n`;
  text += `-`.repeat(30) + `\n`;
  
  selectedComponents.forEach((compId, index) => {
    const component = securityComponents.find(c => c.id === compId);
    if (component) {
      text += `\n${index + 1}. ${component.label}\n`;
      text += `   ${component.description}\n`;
      
      switch (compId) {
        case 'encryption':
          text += `   - Използване на AES-256 за криптиране на данни в покой\n`;
          text += `   - TLS 1.3 за криптиране на данни в движение\n`;
          if (level === 'high') {
            text += `   - End-to-end криптиране за комуникации\n`;
          }
          break;
        case 'antivirus':
          text += `   - Инсталиране на лицензиран антивирусен софтуер\n`;
          text += `   - Автоматично обновяване на дефинициите\n`;
          if (level !== 'basic') {
            text += `   - Редовно сканиране на системите\n`;
          }
          break;
        case 'firewall':
          text += `   - Конфигуриране на мрежова защитна стена\n`;
          text += `   - Блокиране на неоторизиран трафик\n`;
          if (level === 'high') {
            text += `   - Системи за откриване на прониквания (IDS/IPS)\n`;
          }
          break;
        case 'backup':
          const backupFreq = level === 'basic' ? 'седмично' : level === 'medium' ? 'ежедневно' : 'в реално време';
          text += `   - Създаване на резервни копия ${backupFreq}\n`;
          text += `   - Тестване на възстановяването периодично\n`;
          if (level !== 'basic') {
            text += `   - Съхранение на копия на отделна локация\n`;
          }
          break;
        case 'access_control':
          text += `   - Принцип на минимални привилегии\n`;
          text += `   - Многофакторна автентикация за критични системи\n`;
          if (level === 'high') {
            text += `   - Биометрична идентификация\n`;
          }
          break;
        case 'audit':
          text += `   - Записване на всички критични събития\n`;
          const retention = level === 'basic' ? '30 дни' : level === 'medium' ? '90 дни' : '1 година';
          text += `   - Съхранение на логове за ${retention}\n`;
          break;
        case 'password_policy':
          const minLength = level === 'basic' ? 8 : level === 'medium' ? 12 : 16;
          text += `   - Минимална дължина на паролата: ${minLength} символа\n`;
          text += `   - Комбинация от букви, цифри и специални символи\n`;
          const changeFreq = level === 'basic' ? '90 дни' : level === 'medium' ? '60 дни' : '30 дни';
          text += `   - Смяна на паролата на всеки ${changeFreq}\n`;
          break;
        case 'training':
          const trainingFreq = level === 'basic' ? 'годишно' : level === 'medium' ? 'на 6 месеца' : 'на 3 месеца';
          text += `   - Провеждане на обучения ${trainingFreq}\n`;
          text += `   - Тестове за осведоменост относно фишинг атаки\n`;
          break;
      }
    }
  });
  
  text += `\n\n4. ОТГОВОРНОСТИ\n`;
  text += `-`.repeat(30) + `\n`;
  text += `- Ръководството отговаря за осигуряване на ресурси за прилагане на политиката\n`;
  text += `- IT отделът отговаря за техническото изпълнение\n`;
  text += `- Всички служители са длъжни да спазват политиката\n\n`;
  
  text += `5. ПРЕГЛЕД И АКТУАЛИЗАЦИЯ\n`;
  text += `-`.repeat(30) + `\n`;
  const reviewFreq = level === 'basic' ? 'годишно' : level === 'medium' ? 'на 6 месеца' : 'на 3 месеца';
  text += `Политиката се преглежда и актуализира ${reviewFreq} или при значителни промени в средата.\n`;
  
  return text;
};

interface PolicyGeneratorProps {
  userName?: string;
}

const PolicyGenerator = ({ userName }: PolicyGeneratorProps) => {
  const [securityLevel, setSecurityLevel] = useState<SecurityLevel>('medium');
  const [selectedComponents, setSelectedComponents] = useState<string[]>(['encryption', 'antivirus', 'firewall']);
  const [generatedPolicy, setGeneratedPolicy] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleComponentToggle = (componentId: string) => {
    setSelectedComponents(prev =>
      prev.includes(componentId)
        ? prev.filter(id => id !== componentId)
        : [...prev, componentId]
    );
  };

  const handleGenerate = () => {
    if (selectedComponents.length === 0) {
      toast({
        title: 'Грешка',
        description: 'Моля, изберете поне един защитен компонент',
        variant: 'destructive',
      });
      return;
    }
    
    const policy = generatePolicyText(securityLevel, selectedComponents);
    setGeneratedPolicy(policy);
    toast({
      title: 'Успешно!',
      description: 'Политиката е генерирана успешно',
    });
  };

  const handleDownloadPDF = async () => {
    if (!generatedPolicy) return;

    setIsDownloading(true);
    
    try {
      // Load Cyrillic font
      const fontBase64 = await loadRobotoFont();
      
      const doc = new jsPDF();
      
      // Add Roboto font with Cyrillic support
      doc.addFileToVFS('Roboto-Regular.ttf', fontBase64);
      doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
      doc.setFont('Roboto');
      
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const maxWidth = pageWidth - margin * 2;
      
      // Title
      doc.setFontSize(16);
      doc.text('ПОЛИТИКА ЗА ИНФОРМАЦИОННА СИГУРНОСТ', pageWidth / 2, 20, { align: 'center' });
      
      // Content
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(generatedPolicy, maxWidth);
      
      let y = 35;
      const lineHeight = 5;
      const pageHeight = doc.internal.pageSize.getHeight();
      
      lines.forEach((line: string) => {
        if (y + lineHeight > pageHeight - margin) {
          doc.addPage();
          doc.setFont('Roboto');
          y = margin;
        }
        doc.text(line, margin, y);
        y += lineHeight;
      });
      
      // Footer
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFont('Roboto');
        doc.setFontSize(8);
        doc.text(
          `Страница ${i} от ${totalPages}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: 'center' }
        );
      }
      
      doc.save('politika-za-sigurnost.pdf');
      
      toast({
        title: 'Изтеглено!',
        description: 'PDF файлът е изтеглен успешно',
      });
    } catch (error) {
      toast({
        title: 'Грешка',
        description: 'Възникна проблем при генерирането на PDF',
        variant: 'destructive',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Ниво на сигурност
          </CardTitle>
          <CardDescription>Изберете нивото на защита за вашата организация</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={securityLevel}
            onValueChange={(value) => setSecurityLevel(value as SecurityLevel)}
            className="space-y-3"
          >
            <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="basic" id="basic" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="basic" className="flex items-center gap-2 cursor-pointer">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  Базово ниво
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {securityLevelDescriptions.basic}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="medium" id="medium" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="medium" className="flex items-center gap-2 cursor-pointer">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Средно ниво
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {securityLevelDescriptions.medium}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="high" id="high" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="high" className="flex items-center gap-2 cursor-pointer">
                  <ShieldAlert className="h-4 w-4 text-destructive" />
                  Високо ниво
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {securityLevelDescriptions.high}
                </p>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Защитни компоненти</CardTitle>
          <CardDescription>Изберете компонентите, които да бъдат включени в политиката</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {securityComponents.map((component) => (
              <div
                key={component.id}
                className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <Checkbox
                  id={component.id}
                  checked={selectedComponents.includes(component.id)}
                  onCheckedChange={() => handleComponentToggle(component.id)}
                  className="mt-1"
                />
                <div>
                  <Label htmlFor={component.id} className="cursor-pointer font-medium">
                    {component.label}
                  </Label>
                  <p className="text-sm text-muted-foreground">{component.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button size="lg" onClick={handleGenerate}>
          <Shield className="h-5 w-5 mr-2" />
          Генерирай политика
        </Button>
      </div>

      {generatedPolicy && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Генерирана политика</span>
              <Button onClick={handleDownloadPDF} variant="outline" disabled={isDownloading}>
                {isDownloading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <FileDown className="h-4 w-4 mr-2" />
                )}
                {isDownloading ? 'Зареждане...' : 'Изтегли PDF'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg overflow-auto max-h-96 font-mono">
              {generatedPolicy}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PolicyGenerator;
