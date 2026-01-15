import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

type HabitsListProps = {
  habits: Habit[];
  toggleHabit: (id: string) => void;
};

const HabitsList = ({ habits, toggleHabit }: HabitsListProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default HabitsList;
