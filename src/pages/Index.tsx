import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import OnboardingFlow from '@/components/OnboardingFlow';
import DashboardStats from '@/components/DashboardStats';
import HabitsList from '@/components/HabitsList';
import PremiumPaywall from '@/components/PremiumPaywall';

type Habit = {
  id: string;
  title: string;
  category: string;
  streak: number;
  completedToday: boolean;
  weekProgress: boolean[];
  color: string;
};

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isPremium, setIsPremium] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      title: 'Медитация',
      category: 'Здоровье',
      streak: 12,
      completedToday: true,
      weekProgress: [true, true, false, true, true, true, false],
      color: 'bg-purple-500'
    },
    {
      id: '2',
      title: 'Чтение',
      category: 'Развитие',
      streak: 8,
      completedToday: false,
      weekProgress: [true, true, true, false, true, true, false],
      color: 'bg-blue-500'
    },
    {
      id: '3',
      title: 'Спорт',
      category: 'Здоровье',
      streak: 5,
      completedToday: true,
      weekProgress: [false, true, true, true, true, true, false],
      color: 'bg-green-500'
    }
  ]);

  const categories = [
    { name: 'Здоровье', icon: 'Heart', color: 'bg-red-100 text-red-600' },
    { name: 'Развитие', icon: 'Brain', color: 'bg-blue-100 text-blue-600' },
    { name: 'Финансы', icon: 'DollarSign', color: 'bg-green-100 text-green-600' },
    { name: 'Отношения', icon: 'Users', color: 'bg-purple-100 text-purple-600' },
    { name: 'Творчество', icon: 'Palette', color: 'bg-yellow-100 text-yellow-600' },
    { name: 'Продуктивность', icon: 'Zap', color: 'bg-orange-100 text-orange-600' }
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleHabit = (id: string) => {
    setHabits(prev =>
      prev.map(h =>
        h.id === id ? { ...h, completedToday: !h.completedToday } : h
      )
    );
  };

  const completionRate = Math.round(
    (habits.filter(h => h.completedToday).length / habits.length) * 100
  );

  const totalStreak = habits.reduce((sum, h) => sum + h.streak, 0);

  if (showOnboarding) {
    return (
      <OnboardingFlow
        onboardingStep={onboardingStep}
        setOnboardingStep={setOnboardingStep}
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
        categories={categories}
        onComplete={() => setShowOnboarding(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Icon name="Sparkles" size={18} className="text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">Quality of Life</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-sm font-medium text-primary">Главная</button>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition">
              Привычки
            </button>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition">
              Статистика
            </button>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition">
              Трекер
            </button>
            {!isPremium && (
              <Button size="sm" onClick={() => setShowPaywall(true)} className="ml-4">
                <Icon name="Crown" size={16} className="mr-1" />
                Premium
              </Button>
            )}
            {isPremium && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 ml-4">
                <Icon name="Crown" size={14} className="mr-1" />
                Premium
              </Badge>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Добрый день!</h1>
          <p className="text-muted-foreground text-lg">
            Сегодня {new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>

        <DashboardStats
          completionRate={completionRate}
          completedCount={habits.filter(h => h.completedToday).length}
          totalCount={habits.length}
          totalStreak={totalStreak}
        />

        <Tabs defaultValue="habits" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="habits">Мои привычки</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            <TabsTrigger value="chaos">Контроль хаоса</TabsTrigger>
          </TabsList>

          <TabsContent value="habits" className="space-y-4">
            <HabitsList habits={habits} toggleHabit={toggleHabit} />
          </TabsContent>

          <TabsContent value="analytics">
            {!isPremium && (
              <Card className="p-6 mb-6 border-2 border-primary/20 bg-gradient-to-r from-purple-50 to-blue-50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <Icon name="Crown" size={24} className="text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Расширенная аналитика — Premium</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Получите доступ к детальным графикам, трендам и персональным инсайтам всего за 100₽/месяц
                    </p>
                    <Button onClick={() => setShowPaywall(true)} size="sm">
                      Разблокировать за 100₽/мес
                    </Button>
                  </div>
                </div>
              </Card>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ filter: !isPremium ? 'blur(4px)' : 'none', pointerEvents: !isPremium ? 'none' : 'auto' }}>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="BarChart3" size={20} />
                  Динамика за месяц
                </h3>
                <div className="h-64 flex items-end justify-between gap-2">
                  {[65, 72, 68, 80, 85, 78, 90, 88, 92, 95, 87, 91, 89, 94].map((value, idx) => (
                    <div
                      key={idx}
                      className="flex-1 bg-primary/20 rounded-t-lg hover:bg-primary/40 transition-all"
                      style={{ height: `${value}%` }}
                    />
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="PieChart" size={20} />
                  Распределение по категориям
                </h3>
                <div className="space-y-4">
                  {categories.slice(0, 4).map((cat, idx) => (
                    <div key={cat.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{cat.name}</span>
                        <span className="text-sm text-muted-foreground">{[35, 25, 20, 20][idx]}%</span>
                      </div>
                      <Progress value={[35, 25, 20, 20][idx]} />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 md:col-span-2">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Brain" size={20} />
                  Инсайты и рекомендации
                </h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                    <div className="flex gap-3">
                      <Icon name="TrendingUp" size={20} className="text-green-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-green-900 mb-1">Отличная динамика!</p>
                        <p className="text-sm text-green-700">
                          Ваш показатель выполнения привычек вырос на 12% за последнюю неделю
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="flex gap-3">
                      <Icon name="Lightbulb" size={20} className="text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-blue-900 mb-1">Совет</p>
                        <p className="text-sm text-blue-700">
                          Лучшее время для медитации — утро после пробуждения. Попробуйте перенести привычку на 8:00
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="chaos">
            {!isPremium && (
              <Card className="p-6 mb-6 border-2 border-primary/20 bg-gradient-to-r from-purple-50 to-blue-50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <Icon name="Crown" size={24} className="text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Контроль хаоса — Premium</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Отслеживайте баланс всех сфер жизни с AI-рекомендациями за 100₽/месяц
                    </p>
                    <Button onClick={() => setShowPaywall(true)} size="sm">
                      Разблокировать за 100₽/мес
                    </Button>
                  </div>
                </div>
              </Card>
            )}
            <Card className="p-6" style={{ filter: !isPremium ? 'blur(4px)' : 'none', pointerEvents: !isPremium ? 'none' : 'auto' }}>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="Gauge" size={20} />
                Уровень контроля жизни
              </h3>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-bold">78%</span>
                  <Badge className="bg-green-100 text-green-700">Хороший контроль</Badge>
                </div>
                <Progress value={78} className="h-3" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Здоровье', value: 85, icon: 'Heart' },
                  { name: 'Финансы', value: 72, icon: 'DollarSign' },
                  { name: 'Работа', value: 80, icon: 'Briefcase' },
                  { name: 'Отдых', value: 65, icon: 'Sun' }
                ].map((area) => (
                  <div key={area.name} className="p-4 rounded-lg border bg-card">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Icon name={area.icon} size={20} className="text-primary" />
                    </div>
                    <p className="text-2xl font-bold mb-1">{area.value}%</p>
                    <p className="text-sm text-muted-foreground">{area.name}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {showPaywall && (
        <PremiumPaywall
          onClose={() => setShowPaywall(false)}
          onSubscribe={() => {
            setIsPremium(true);
            setShowPaywall(false);
          }}
        />
      )}
    </div>
  );
};

export default Index;
