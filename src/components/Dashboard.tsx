import { User, GameType } from '../App';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Brain, Plus, X, Hash, Percent, Trophy, Flame, Star, LogOut, RotateCcw } from 'lucide-react';
import { Progress } from './ui/progress';

type DashboardProps = {
  user: User;
  onSelectGame: (game: GameType) => void;
  onLogout: () => void;
};

type GameInfo = {
  id: GameType;
  title: string;
  description: string;
  icon: any;
  color: string;
  difficulty: string;
  courseLevel: number; // 1 for 1° Básico, 2 for 2° Básico, etc.
};

export function Dashboard({ user, onSelectGame, onLogout }: DashboardProps) {
  const progressToNextLevel = ((user.totalScore % 200) / 200) * 100;

  // Get course number from course string (e.g., "1° Básico" -> 1)
  const getCurrentCourseNumber = (): number => {
    const match = user.course?.match(/^(\d+)°/);
    return match ? parseInt(match[1]) : 1;
  };

  const currentCourseLevel = getCurrentCourseNumber();

  const allGames: GameInfo[] = [
    {
      id: 'addition' as GameType,
      title: 'Desafío de Suma',
      description: 'Domina la suma con desafíos cronometrados',
      icon: Plus,
      color: 'from-green-400 to-emerald-500',
      difficulty: 'Fácil',
      courseLevel: 1, // 1° Básico
    },
    {
      id: 'multiplication' as GameType,
      title: 'Multiplicación Loca',
      description: 'Practica las tablas de multiplicar',
      icon: X,
      color: 'from-blue-400 to-cyan-500',
      difficulty: 'Medio',
      courseLevel: 2, // 2° Básico
    },
    {
      id: 'sequence' as GameType,
      title: 'Secuencia Numérica',
      description: 'Encuentra el patrón y completa la secuencia',
      icon: Hash,
      color: 'from-purple-400 to-pink-500',
      difficulty: 'Medio',
      courseLevel: 3, // 3° Básico
    },
    {
      id: 'fractions' as GameType,
      title: 'Frenesí de Fracciones',
      description: 'Simplifica y compara fracciones',
      icon: Percent,
      color: 'from-orange-400 to-red-500',
      difficulty: 'Difícil',
      courseLevel: 4, // 4° Básico
    },
  ];

  // Get games for current course level
  const currentGames = allGames.filter(game => game.courseLevel === currentCourseLevel);
  
  // Get games from previous courses for review
  const reviewGames = allGames.filter(game => game.courseLevel < currentCourseLevel);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <img src="../../Otros assets/diff.png" alt="" />
            </div>
            <div>
              <h1 className="text-4xl mb-2 green-500 bg-clip-text">
                CompiMat
              </h1>
              <p className="text-gray-600">¡Bienvenido de vuelta, {user.name}!</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-600">{user.course}</p>
            </div>
            <Button variant="outline" onClick={onLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Salir
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Nivel</p>
                <p className="text-3xl">{user.level}</p>
              </div>
              <Star className="w-8 h-8 text-purple-200" />
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Racha</p>
                <p className="text-3xl">{user.streak} días</p>
              </div>
              <Flame className="w-8 h-8 text-orange-200" />
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Puntuación Total</p>
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
              Ver Clasificación
            </Button>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="p-6 mb-8 border-2 border-purple-200 shadow-lg bg-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700">Progreso Nivel {user.level}</span>
            <span className="text-gray-600">{user.totalScore % 200}/200 XP</span>
          </div>
          <Progress value={progressToNextLevel} className="h-3" />
        </Card>

        {/* Current Course Games */}
        {currentGames.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl mb-4 text-gray-800">Juegos de {user.course}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentGames.map((game) => (
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
                      game.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' :
                      game.difficulty === 'Medio' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {game.difficulty}
                    </span>
                    <Button size="sm" className={`bg-gradient-to-r ${game.color} text-white border-0`}>
                      Jugar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Review Games from Previous Courses */}
        {reviewGames.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <RotateCcw className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl text-gray-800">Repaso</h2>
              <span className="text-sm text-gray-600">(Juegos de cursos anteriores)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reviewGames.map((game) => (
                <Card
                  key={game.id}
                  className="p-6 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-purple-200 bg-purple-50/50"
                  onClick={() => onSelectGame(game.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-purple-200 text-purple-700">
                      {game.courseLevel}° Básico
                    </span>
                    <RotateCcw className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className={`w-16 h-16 bg-gradient-to-br ${game.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg opacity-90`}>
                    <game.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl mb-2 text-gray-800">{game.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{game.description}</p>
                  <div className="flex items-center justify-between">

                    <Button size="sm" className={`bg-gradient-to-r ${game.color} text-white border-0`}>
                      Repasar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Message if no games available for current course */}
        {currentGames.length === 0 && reviewGames.length === 0 && (
          <Card className="p-12 text-center border-2 border-purple-200 bg-purple-50">
            <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl mb-2 text-gray-800">¡Próximamente!</h3>
            <p className="text-gray-600">
              Los juegos para {user.course} estarán disponibles pronto.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}