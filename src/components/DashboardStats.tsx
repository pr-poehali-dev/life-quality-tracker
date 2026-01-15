import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

type DashboardStatsProps = {
  completionRate: number;
  completedCount: number;
  totalCount: number;
  totalStreak: number;
};

const DashboardStats = ({
  completionRate,
  completedCount,
  totalCount,
  totalStreak
}: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="p-6 animate-slide-up hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon name="Target" size={24} className="text-primary" />
          </div>
          <Badge variant="secondary">{completionRate}%</Badge>
        </div>
        <h3 className="text-2xl font-bold mb-1">{completedCount}/{totalCount}</h3>
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
  );
};

export default DashboardStats;
