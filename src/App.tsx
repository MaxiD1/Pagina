import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { Leaderboard } from './components/Leaderboard';
import { AdditionGame } from './components/games/AdditionGame';
import { MultiplicationGame } from './components/games/MultiplicationGame';
import { NumberSequenceGame } from './components/games/NumberSequenceGame';
import { FractionGame } from './components/games/FractionGame';

export type User = {
  id: string;
  name: string;
  email: string;
  totalScore: number;
  level: number;
  streak: number;
};

export type GameType = 'dashboard' | 'addition' | 'multiplication' | 'sequence' | 'fractions' | 'leaderboard';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<GameType>('dashboard');

  const handleLogin = (email: string, password: string) => {
    // Mock login - in production, this would connect to a backend
    const mockUser: User = {
      id: '1',
      name: email.split('@')[0],
      email: email,
      totalScore: 1250,
      level: 8,
      streak: 5,
    };
    setCurrentUser(mockUser);
  };

  const handleSignup = (name: string, email: string, password: string) => {
    // Mock signup
    const mockUser: User = {
      id: '1',
      name: name,
      email: email,
      totalScore: 0,
      level: 1,
      streak: 0,
    };
    setCurrentUser(mockUser);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
  };

  const handleGameComplete = (score: number) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        totalScore: currentUser.totalScore + score,
        level: Math.floor((currentUser.totalScore + score) / 200) + 1,
      });
    }
    setCurrentView('dashboard');
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} onSignup={handleSignup} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {currentView === 'dashboard' && (
        <Dashboard
          user={currentUser}
          onSelectGame={setCurrentView}
          onLogout={handleLogout}
        />
      )}
      {currentView === 'addition' && (
        <AdditionGame
          user={currentUser}
          onComplete={handleGameComplete}
          onBack={() => setCurrentView('dashboard')}
        />
      )}
      {currentView === 'multiplication' && (
        <MultiplicationGame
          user={currentUser}
          onComplete={handleGameComplete}
          onBack={() => setCurrentView('dashboard')}
        />
      )}
      {currentView === 'sequence' && (
        <NumberSequenceGame
          user={currentUser}
          onComplete={handleGameComplete}
          onBack={() => setCurrentView('dashboard')}
        />
      )}
      {currentView === 'fractions' && (
        <FractionGame
          user={currentUser}
          onComplete={handleGameComplete}
          onBack={() => setCurrentView('dashboard')}
        />
      )}
      {currentView === 'leaderboard' && (
        <Leaderboard
          currentUser={currentUser}
          onBack={() => setCurrentView('dashboard')}
        />
      )}
    </div>
  );
}
