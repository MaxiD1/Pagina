import { User } from '../App';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Trophy, Medal, Award } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';

type LeaderboardProps = {
  currentUser: User;
  onBack: () => void;
};

export function Leaderboard({ currentUser, onBack }: LeaderboardProps) {
  // Mock leaderboard data - filtered by school and course
  const leaderboardData = [
    { id: '1', name: 'Alex Chen', score: 2850, level: 14, streak: 12, course: currentUser.course, schoolId: currentUser.schoolId },
    { id: '2', name: 'Sarah Johnson', score: 2640, level: 13, streak: 8, course: currentUser.course, schoolId: currentUser.schoolId },
    { id: '3', name: 'Mike Rodriguez', score: 2310, level: 11, streak: 15, course: currentUser.course, schoolId: currentUser.schoolId },
    { id: '4', name: currentUser.name, score: currentUser.totalScore, level: currentUser.level, streak: currentUser.streak, course: currentUser.course, schoolId: currentUser.schoolId },
    { id: '5', name: 'Emma Wilson', score: 1180, level: 6, streak: 3, course: currentUser.course, schoolId: currentUser.schoolId },
    { id: '6', name: 'David Kim', score: 980, level: 5, streak: 7, course: currentUser.course, schoolId: currentUser.schoolId },
    { id: '7', name: 'Lisa Brown', score: 750, level: 4, streak: 2, course: currentUser.course, schoolId: currentUser.schoolId },
    { id: '8', name: 'John Smith', score: 520, level: 3, streak: 1, course: currentUser.course, schoolId: currentUser.schoolId },
  ].sort((a, b) => b.score - a.score);

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (index === 1) return <Medal className="w-6 h-6 text-gray-400" />;
    if (index === 2) return <Medal className="w-6 h-6 text-orange-600" />;
    return <Award className="w-5 h-5 text-gray-400" />;
  };

  const getRankColor = (index: number) => {
    if (index === 0) return 'from-yellow-400 to-orange-500';
    if (index === 1) return 'from-gray-300 to-gray-400';
    if (index === 2) return 'from-orange-400 to-orange-600';
    return 'from-blue-400 to-purple-500';
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Clasificación
            </h1>
            <p className="text-gray-600">¡Compite con tus compañeros de {currentUser.course}!</p>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-8 items-end">
          {/* 2nd Place */}
          {leaderboardData[1] && (
            <Card className="p-6 text-center border-0 bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg">
              <div className="mb-4">
                <Medal className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <div className="text-2xl">2°</div>
              </div>
              <Avatar className="w-16 h-16 mx-auto mb-3">
                <AvatarFallback className="bg-gradient-to-br from-gray-300 to-gray-400 text-white">
                  {leaderboardData[1].name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="mb-2">{leaderboardData[1].name}</div>
              <div className="text-2xl">{leaderboardData[1].score}</div>
              <div className="text-sm text-gray-600">Nivel {leaderboardData[1].level}</div>
            </Card>
          )}

          {/* 1st Place */}
          {leaderboardData[0] && (
            <Card className="p-6 text-center border-0 bg-gradient-to-br from-yellow-100 to-orange-200 shadow-2xl transform scale-110">
              <div className="mb-4">
                <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-2" />
                <div className="text-3xl">1°</div>
              </div>
              <Avatar className="w-20 h-20 mx-auto mb-3">
                <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-2xl">
                  {leaderboardData[0].name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="mb-2">{leaderboardData[0].name}</div>
              <div className="text-3xl">{leaderboardData[0].score}</div>
              <div className="text-sm text-gray-600">Nivel {leaderboardData[0].level}</div>
            </Card>
          )}

          {/* 3rd Place */}
          {leaderboardData[2] && (
            <Card className="p-6 text-center border-0 bg-gradient-to-br from-orange-100 to-orange-200 shadow-lg">
              <div className="mb-4">
                <Medal className="w-12 h-12 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl">3°</div>
              </div>
              <Avatar className="w-16 h-16 mx-auto mb-3">
                <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white">
                  {leaderboardData[2].name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="mb-2">{leaderboardData[2].name}</div>
              <div className="text-2xl">{leaderboardData[2].score}</div>
              <div className="text-sm text-gray-600">Nivel {leaderboardData[2].level}</div>
            </Card>
          )}
        </div>

        {/* Full Leaderboard List */}
        <Card className="border-0 shadow-lg overflow-hidden bg-white">
          <div className="p-6">
            <h2 className="text-xl mb-4 text-gray-800">Clasificación Completa</h2>
            <div className="space-y-3">
              {leaderboardData.map((player, index) => {
                const isCurrentUser = player.id === currentUser.id;
                return (
                  <div
                    key={player.id}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                      isCurrentUser
                        ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 shadow-md'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-center w-12 h-12">
                      {index < 3 ? (
                        getRankIcon(index)
                      ) : (
                        <div className="text-xl text-gray-600">{index + 1}</div>
                      )}
                    </div>

                    <Avatar className="w-12 h-12">
                      <AvatarFallback className={`bg-gradient-to-br ${getRankColor(index)} text-white`}>
                        {player.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className={`${isCurrentUser ? '' : 'text-gray-800'}`}>
                        {player.name}
                        {isCurrentUser && <span className="ml-2 text-purple-600">(Tú)</span>}
                      </div>
                      <div className="text-sm text-gray-600">
                        Nivel {player.level} • Racha de {player.streak} días
                      </div>
                    </div>

                    <div className="text-2xl text-gray-800">{player.score}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}