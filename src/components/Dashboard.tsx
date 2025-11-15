import { User, GameType } from '../App';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Brain, Plus, X, Hash, Percent, Trophy, Flame, Star, LogOut } from 'lucide-react';
import { Progress } from './ui/progress';

type DashboardProps = {
  user: User;
  onSelectGame: (game: GameType) => void;
  onLogout: () => void;
};

export function Dashboard({ user, onSelectGame, onLogout }: DashboardProps) {
  const progressToNextLevel = ((user.totalScore % 200) / 200) * 100;

  const games = [
    {
      id: 'addition' as GameType,
      title: 'Addition Quest',
      description: 'Master addition with timed challenges',
      icon: Plus,
      color: 'from-green-400 to-emerald-500',
      difficulty: 'Easy',
    },
    {
      id: 'multiplication' as GameType,
      title: 'Multiply Madness',
      description: 'Practice multiplication tables',
      icon: X,
      color: 'from-blue-400 to-cyan-500',
      difficulty: 'Medium',
    },
    {
      id: 'sequence' as GameType,
      title: 'Number Sequence',
      description: 'Find the pattern and complete the sequence',
      icon: Hash,
      color: 'from-purple-400 to-pink-500',
      difficulty: 'Medium',
    },
    {
      id: 'fractions' as GameType,
      title: 'Fraction Frenzy',
      description: 'Simplify and compare fractions',
      icon: Percent,
      color: 'from-orange-400 to-red-500',
      difficulty: 'Hard',
    },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                MathQuest
              </h1>
              <p className="text-gray-600">Welcome back, {user.name}!</p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Level</p>
                <p className="text-3xl">{user.level}</p>
              </div>
              <Star className="w-8 h-8 text-purple-200" />
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Streak</p>
                <p className="text-3xl">{user.streak} days</p>
              </div>
              <Flame className="w-8 h-8 text-orange-200" />
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Score</p>
                <p className="text-3xl">{user.totalScore}</p>
              </div>
              <Trophy className="w-8 h-8 text-blue-200" />
            </div>
          </Card>

          <Card className="p-4 border-2 border-purple-200 bg-white shadow-lg">
            <Button
              onClick={() => onSelectGame('leaderboard')}
              className="w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Trophy className="w-5 h-5 mr-2" />
              View Leaderboard
            </Button>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="p-6 mb-8 border-2 border-purple-200 shadow-lg bg-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700">Level {user.level} Progress</span>
            <span className="text-gray-600">{user.totalScore % 200}/200 XP</span>
          </div>
          <Progress value={progressToNextLevel} className="h-3" />
        </Card>

        {/* Games Grid */}
        <div>
          <h2 className="text-2xl mb-4 text-gray-800">Choose Your Challenge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <Card
                key={game.id}
                className="p-6 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white"
                onClick={() => onSelectGame(game.id)}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${game.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                  <game.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl mb-2 text-gray-800">{game.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{game.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    game.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    game.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {game.difficulty}
                  </span>
                  <Button size="sm" className={`bg-gradient-to-r ${game.color} text-white border-0`}>
                    Play
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
