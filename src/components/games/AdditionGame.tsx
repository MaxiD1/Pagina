import { useState, useEffect } from 'react';
import { User } from '../../App';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft, Clock, Star } from 'lucide-react';
import { Progress } from '../ui/progress';

type AdditionGameProps = {
  user: User;
  onComplete: (score: number) => void;
  onBack: () => void;
};

export function AdditionGame({ user, onComplete, onBack }: AdditionGameProps) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const totalQuestions = 10;

  const generateQuestion = () => {
    const difficulty = Math.min(user.level, 10);
    const maxNumber = 10 + difficulty * 5;
    setNum1(Math.floor(Math.random() * maxNumber) + 1);
    setNum2(Math.floor(Math.random() * maxNumber) + 1);
    setUserAnswer('');
    setFeedback(null);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isGameOver) {
      setIsGameOver(true);
    }
  }, [timeLeft, isGameOver]);

  const handleSubmit = () => {
    const correctAnswer = num1 + num2;
    const isCorrect = parseInt(userAnswer) === correctAnswer;

    if (isCorrect) {
      setFeedback('correct');
      const points = 10 + Math.floor(timeLeft / 10);
      setScore(score + points);
      setQuestionsAnswered(questionsAnswered + 1);

      setTimeout(() => {
        if (questionsAnswered + 1 >= totalQuestions) {
          setIsGameOver(true);
        } else {
          generateQuestion();
        }
      }, 1000);
    } else {
      setFeedback('incorrect');
      setTimeout(() => {
        setFeedback(null);
      }, 1000);
    }
  };

  const handleFinish = () => {
    onComplete(score);
  };

  const progress = (questionsAnswered / totalQuestions) * 100;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-xl">{timeLeft}s</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-xl">{score}</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <Card className="p-4 mb-6 border-0 shadow-lg bg-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700">Progreso</span>
            <span className="text-gray-600">{questionsAnswered}/{totalQuestions}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </Card>

        {!isGameOver ? (
          <Card className="p-12 border-0 shadow-2xl bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="text-center">
              <h2 className="text-2xl mb-8 text-gray-700">Desafío de Suma</h2>

              <div className="mb-8">
                <div className="text-6xl mb-4 text-gray-800">
                  {num1} + {num2} = ?
                </div>
              </div>

              <div className="max-w-xs mx-auto mb-6">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && userAnswer && handleSubmit()}
                  className="w-full text-4xl text-center p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                  placeholder="?"
                  autoFocus
                />
              </div>

              {feedback === 'correct' && (
                <div className="text-2xl text-green-600 mb-4">✓ ¡Correcto! +{10 + Math.floor(timeLeft / 10)} puntos</div>
              )}
              {feedback === 'incorrect' && (
                <div className="text-2xl text-red-600 mb-4">✗ ¡Inténtalo de nuevo!</div>
              )}

              <Button
                onClick={handleSubmit}
                disabled={!userAnswer || feedback !== null}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-xl px-8 py-6"
              >
                Enviar Respuesta
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-12 border-0 shadow-2xl bg-gradient-to-br from-purple-50 to-pink-50 text-center">
            <div className="mb-6">
              <Star className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-4xl mb-4 text-gray-800">¡Juego Completado!</h2>
              <p className="text-2xl text-gray-600 mb-2">Puntuación Final: {score}</p>
              <p className="text-xl text-gray-600">Preguntas Respondidas: {questionsAnswered}/{totalQuestions}</p>
            </div>
            <Button
              onClick={handleFinish}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-xl px-8 py-6"
            >
              Continuar
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}