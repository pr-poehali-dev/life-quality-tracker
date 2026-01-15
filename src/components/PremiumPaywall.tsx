import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type PremiumPaywallProps = {
  onClose: () => void;
  onSubscribe: () => void;
};

const PremiumPaywall = ({ onClose, onSubscribe }: PremiumPaywallProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card className="w-full max-w-lg p-8 animate-scale-in relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <Icon name="X" size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mx-auto mb-4">
            <Icon name="Crown" size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Quality of Life Premium</h2>
          <p className="text-muted-foreground">
            Разблокируйте все возможности для полного контроля вашей жизни
          </p>
        </div>

        <div className="bg-muted/50 rounded-xl p-6 mb-6">
          <div className="flex items-baseline justify-center mb-4">
            <span className="text-5xl font-bold">100₽</span>
            <span className="text-muted-foreground ml-2">/месяц</span>
          </div>
          <div className="space-y-3">
            {[
              'Расширенная аналитика с графиками трендов',
              'AI-инсайты и персональные рекомендации',
              'Контроль хаоса по всем сферам жизни',
              'Экспорт данных и отчёты',
              'Неограниченное количество привычек',
              'Приоритетная поддержка'
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="Check" size={14} className="text-primary" />
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <Button
          className="w-full h-12 text-lg mb-3"
          onClick={onSubscribe}
        >
          Оформить Premium за 100₽/мес
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          Отменить можно в любой момент. Без скрытых платежей.
        </p>
      </Card>
    </div>
  );
};

export default PremiumPaywall;
