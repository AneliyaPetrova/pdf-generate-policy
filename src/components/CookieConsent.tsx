import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Cookie, X } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'cookie_consent_accepted';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Delay showing the banner for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'false');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-500">
      <Card className="max-w-4xl mx-auto shadow-lg border-2">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Cookie className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm sm:text-base mb-1">Използване на бисквитки</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Този сайт използва бисквитки за подобряване на потребителското изживяване, 
                анализ на трафика и персонализация на съдържанието. Съгласявайки се, вие 
                приемате нашата политика за поверителност и използването на бисквитки.
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDecline}
                className="flex-1 sm:flex-none"
              >
                Отказ
              </Button>
              <Button 
                size="sm" 
                onClick={handleAccept}
                className="flex-1 sm:flex-none"
              >
                Приемам
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieConsent;
