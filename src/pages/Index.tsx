import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

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
                    setShowOnboarding(false);
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
          <div className="flex gap-6">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 animate-slide-up hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon name="Target" size={24} className="text-primary" />
              </div>
              <Badge variant="secondary">{completionRate}%</Badge>
            </div>
            <h3 className="text-2xl font-bold mb-1">{habits.filter(h => h.completedToday).length}/{habits.length}</h3>
            <p className="text-sm text-muted-foreground">Привычек выполнено</p>
            <Progress value={completionRate} className="mt-3" />
          </Card>

          <Card className="p-6 animate-slide-up hover:shadow-lg transition-shadow" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <Icon name="Flame" size={24} className="text-green-600" />
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">Активно</Badge>
            </div>
            <h3 className="text-2xl font-bold mb-1">{totalStreak} дней</h3>
            <p className="text-sm text-muted-foreground">Общий streak</p>
          </Card>

          <Card className="p-6 animate-slide-up hover:shadow-lg transition-shadow" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Icon name="TrendingUp" size={24} className="text-blue-600" />
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">+12%</Badge>
            </div>
            <h3 className="text-2xl font-bold mb-1">85%</h3>
            <p className="text-sm text-muted-foreground">Средний прогресс</p>
          </Card>
        </div>

        <Tabs defaultValue="habits" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="habits">Мои привычки</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            <TabsTrigger value="chaos">Контроль хаоса</TabsTrigger>
          </TabsList>

          <TabsContent value="habits" className="space-y-4">
            {habits.map((habit, idx) => (
              <Card
                key={habit.id}
                className="p-6 animate-fade-in hover:shadow-lg transition-all"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <button
                      onClick={() => toggleHabit(habit.id)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        habit.completedToday
                          ? habit.color + ' text-white scale-105'
                          : 'bg-muted text-muted-foreground hover:scale-105'
                      }`}
                    >
                      <Icon name={habit.completedToday ? 'Check' : 'Circle'} size={24} />
                    </button>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{habit.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Flame" size={16} />
                          {habit.streak} дней streak
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {habit.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Icon name="MoreHorizontal" size={20} />
                  </Button>
                </div>

                <div className="flex gap-1">
                  {habit.weekProgress.map((completed, idx) => (
                    <div
                      key={idx}
                      className={`flex-1 h-2 rounded-full transition-all ${
                        completed ? habit.color : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </Card>
            ))}

            <Button className="w-full h-14" variant="outline">
              <Icon name="Plus" size={20} className="mr-2" />
              Добавить привычку
            </Button>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <Card className="p-6">
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
    </div>
  );
};

export default Index;
