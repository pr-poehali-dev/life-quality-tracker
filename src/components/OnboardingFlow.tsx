import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

type Category = {
  name: string;
  icon: string;
  color: string;
};

type OnboardingFlowProps = {
  onboardingStep: number;
  setOnboardingStep: (step: number | ((prev: number) => number)) => void;
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  categories: Category[];
  onComplete: () => void;
};

const OnboardingFlow = ({
  onboardingStep,
  setOnboardingStep,
  selectedCategories,
  toggleCategory,
  categories,
  onComplete
}: OnboardingFlowProps) => {
  const onboardingSteps = [
    {
      title: 'Добро пожаловать в трекер качества жизни',
      description: 'Контролируйте привычки, анализируйте прогресс и управляйте хаосом в вашей жизни',
      icon: 'Sparkles'
    },
    {
      title: 'Выберите сферы жизни',
      description: 'Какие области важны для вас? Выберите категории для отслеживания',
      icon: 'Target'
    },
    {
      title: 'Создайте первую привычку',
      description: 'Начните с малого — добавьте одну привычку, которую хотите развить',
      icon: 'Plus'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 animate-scale-in shadow-xl border-0">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Icon name={onboardingSteps[onboardingStep].icon} size={32} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">{onboardingSteps[onboardingStep].title}</h1>
          <p className="text-muted-foreground text-lg">
            {onboardingSteps[onboardingStep].description}
          </p>
        </div>

        {onboardingStep === 1 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => toggleCategory(cat.name)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedCategories.includes(cat.name)
                    ? 'border-primary bg-primary/5 scale-105'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg ${cat.color} flex items-center justify-center mx-auto mb-2`}>
                  <Icon name={cat.icon} size={20} />
                </div>
                <p className="text-sm font-medium">{cat.name}</p>
              </button>
            ))}
          </div>
        )}

        {onboardingStep === 2 && (
          <div className="mb-8">
            <Input
              placeholder="Например: Пить 2 литра воды"
              className="text-lg h-14 mb-4"
            />
            <div className="flex gap-2">
              {categories.slice(0, 3).map((cat) => (
                <Badge key={cat.name} variant="secondary" className="cursor-pointer">
                  {cat.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {onboardingSteps.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx === onboardingStep ? 'w-8 bg-primary' : 'w-2 bg-muted'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {onboardingStep > 0 && (
              <Button
                variant="ghost"
                onClick={() => setOnboardingStep(prev => prev - 1)}
              >
                Назад
              </Button>
            )}
            <Button
              onClick={() => {
                if (onboardingStep < onboardingSteps.length - 1) {
                  setOnboardingStep(prev => prev + 1);
                } else {
                  onComplete();
                }
              }}
            >
              {onboardingStep === onboardingSteps.length - 1 ? 'Начать' : 'Далее'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
