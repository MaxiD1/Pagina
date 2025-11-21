import { User } from '../App';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Brain, LogOut, Users, Trophy, TrendingUp, Award, BookOpen } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

type TeacherDashboardProps = {
  user: User;
  onLogout: () => void;
};

export function TeacherDashboard({ user, onLogout }: TeacherDashboardProps) {
  // Mock student data for the teacher's assigned course and school
  const students = [
    { id: '1', name: 'Ana García', score: 1850, level: 9, streak: 7, gamesPlayed: 42, averageScore: 88 },
    { id: '2', name: 'Carlos López', score: 2100, level: 10, streak: 12, gamesPlayed: 56, averageScore: 92 },
    { id: '3', name: 'María Silva', score: 1650, level: 8, streak: 5, gamesPlayed: 38, averageScore: 85 },
    { id: '4', name: 'Diego Rojas', score: 1980, level: 10, streak: 9, gamesPlayed: 48, averageScore: 90 },
    { id: '5', name: 'Sofía Torres', score: 2300, level: 11, streak: 15, gamesPlayed: 62, averageScore: 95 },
    { id: '6', name: 'Lucas Martínez', score: 1420, level: 7, streak: 3, gamesPlayed: 32, averageScore: 82 },
    { id: '7', name: 'Valentina Pérez', score: 1750, level: 9, streak: 8, gamesPlayed: 44, averageScore: 87 },
    { id: '8', name: 'Mateo Hernández', score: 2050, level: 10, streak: 11, gamesPlayed: 54, averageScore: 91 },
  ];

  const sortedStudents = [...students].sort((a, b) => b.score - a.score);
  const classAverage = Math.round(students.reduce((sum, s) => sum + s.averageScore, 0) / students.length);
  const totalGamesPlayed = students.reduce((sum, s) => sum + s.gamesPlayed, 0);
  const activeStudents = students.filter(s => s.streak > 0).length;

  const gameStats = [
    { name: 'Desafío de Suma', played: 145, avgScore: 87 },
    { name: 'Multiplicación Loca', played: 132, avgScore: 84 },
    { name: 'Secuencia Numérica', played: 98, avgScore: 79 },
    { name: 'Frenesí de Fracciones', played: 76, avgScore: 75 },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Panel del Profesor
              </h1>
              <p className="text-gray-600">Bienvenido/a, {user.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-600">{user.assignedCourse}</p>
            </div>
            <Button variant="outline" onClick={onLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Salir
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-0 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-blue-200" />
            </div>
            <p className="text-blue-100 text-sm">Total Estudiantes</p>
            <p className="text-3xl">{students.length}</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-green-200" />
            </div>
            <p className="text-green-100 text-sm">Promedio de Clase</p>
            <p className="text-3xl">{classAverage}%</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="w-8 h-8 text-orange-200" />
            </div>
            <p className="text-orange-100 text-sm">Juegos Jugados</p>
            <p className="text-3xl">{totalGamesPlayed}</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 text-purple-200" />
            </div>
            <p className="text-purple-100 text-sm">Estudiantes Activos</p>
            <p className="text-3xl">{activeStudents}/{students.length}</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="students">Estudiantes</TabsTrigger>
            <TabsTrigger value="analytics">Analíticas</TabsTrigger>
          </TabsList>

          {/* Students Tab */}
          <TabsContent value="students">
            <Card className="border-0 shadow-lg bg-white">
              <div className="p-6">
                <h2 className="text-2xl mb-6 text-gray-800">Rendimiento de Estudiantes - {user.assignedCourse}</h2>
                <div className="space-y-4">
                  {sortedStudents.map((student, index) => (
                    <div
                      key={student.id}
                      className="flex items-center gap-4 p-5 rounded-lg bg-gradient-to-r from-gray-50 to-white border border-gray-200 hover:shadow-md transition-all"
                    >
                      {/* Rank */}
                      <div className="flex items-center justify-center w-12 h-12">
                        {index === 0 ? (
                          <Trophy className="w-8 h-8 text-yellow-500" />
                        ) : index === 1 ? (
                          <Award className="w-7 h-7 text-gray-400" />
                        ) : index === 2 ? (
                          <Award className="w-7 h-7 text-orange-600" />
                        ) : (
                          <div className="text-xl text-gray-600">{index + 1}</div>
                        )}
                      </div>

                      {/* Avatar */}
                      <Avatar className="w-14 h-14">
                        <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-500 text-white">
                          {student.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      {/* Student Info */}
                      <div className="flex-1">
                        <div className="text-gray-800">{student.name}</div>
                        <div className="text-sm text-gray-600">
                          Nivel {student.level} • Racha de {student.streak} días
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-6 text-center">
                        <div>
                          <div className="text-sm text-gray-600">Puntos</div>
                          <div className="text-xl text-gray-800">{student.score}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Juegos</div>
                          <div className="text-xl text-gray-800">{student.gamesPlayed}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Promedio</div>
                          <div className="text-xl text-gray-800">{student.averageScore}%</div>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="w-32">
                        <Progress value={student.averageScore} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Game Performance */}
              <Card className="border-0 shadow-lg bg-white">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                    <h2 className="text-xl text-gray-800">Rendimiento por Juego</h2>
                  </div>
                  <div className="space-y-4">
                    {gameStats.map((game, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">{game.name}</span>
                          <span className="text-sm text-gray-600">{game.avgScore}%</span>
                        </div>
                        <Progress value={game.avgScore} className="h-2" />
                        <div className="text-xs text-gray-500">{game.played} juegos jugados</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Top Performers */}
              <Card className="border-0 shadow-lg bg-white">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Trophy className="w-6 h-6 text-purple-600" />
                    <h2 className="text-xl text-gray-800">Mejores Estudiantes</h2>
                  </div>
                  <div className="space-y-4">
                    {sortedStudents.slice(0, 5).map((student, index) => (
                      <div key={student.id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                        <div className={`text-2xl ${
                          index === 0 ? 'text-yellow-500' :
                          index === 1 ? 'text-gray-400' :
                          index === 2 ? 'text-orange-600' :
                          'text-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-500 text-white text-sm">
                            {student.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="text-sm">{student.name}</div>
                          <div className="text-xs text-gray-600">{student.averageScore}% promedio</div>
                        </div>
                        <div className="text-purple-600">{student.score}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="border-0 shadow-lg bg-white lg:col-span-2">
                <div className="p-6">
                  <h2 className="text-xl mb-4 text-gray-800">Actividad de la Clase</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <div className="text-sm text-green-700 mb-1">Estudiantes con racha activa</div>
                      <div className="text-2xl text-green-800">{activeStudents}</div>
                      <div className="text-xs text-green-600 mt-1">
                        {Math.round((activeStudents / students.length) * 100)}% del curso
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                      <div className="text-sm text-blue-700 mb-1">Nivel promedio</div>
                      <div className="text-2xl text-blue-800">
                        {Math.round(students.reduce((sum, s) => sum + s.level, 0) / students.length)}
                      </div>
                      <div className="text-xs text-blue-600 mt-1">de {students.length} estudiantes</div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                      <div className="text-sm text-purple-700 mb-1">Racha máxima</div>
                      <div className="text-2xl text-purple-800">
                        {Math.max(...students.map(s => s.streak))} días
                      </div>
                      <div className="text-xs text-purple-600 mt-1">
                        {students.find(s => s.streak === Math.max(...students.map(s => s.streak)))?.name}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
