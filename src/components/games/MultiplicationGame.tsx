import { useState, useEffect } from 'react';
import { User } from '../../App';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft, Clock, Star } from 'lucide-react';
import { Progress } from '../ui/progress';

type MultiplicationGameProps = {
  user: User;
  onComplete: (score: number) => void;
  onBack: () => void;
};

export function MultiplicationGame({ user, onComplete, onBack }: MultiplicationGameProps) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const totalQuestions = 10;

  const generateQuestion = () => {
    const maxNumber = Math.min(12, 5 + user.level);
    const n1 = Math.floor(Math.random() * maxNumber) + 1;
    const n2 = Math.floor(Math.random() * maxNumber) + 1;
    const correctAnswer = n1 * n2;

    // Generate 3 wrong answers
    const wrongAnswers = new Set<number>();
    while (wrongAnswers.size < 3) {
      const offset = Math.floor(Math.random() * 20) - 10;
      const wrongAnswer = correctAnswer + offset;
      if (wrongAnswer !== correctAnswer && wrongAnswer > 0) {
        wrongAnswers.add(wrongAnswer);
      }
    }

    const allOptions = [correctAnswer, ...Array.from(wrongAnswers)];
    const shuffled = allOptions.sort(() => Math.random() - 0.5);

    setNum1(n1);
    setNum2(n2);
    setOptions(shuffled);
    setFeedback(null);
    setSelectedAnswer(null);
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

  const handleAnswer = (answer: number) => {
    const correctAnswer = num1 * num2;
    const isCorrect = answer === correctAnswer;
    setSelectedAnswer(answer);

    if (isCorrect) {
      setFeedback('correct');
      const points = 15 + Math.floor(timeLeft / 10);
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
        setSelectedAnswer(null);
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
          <Card className="p-12 border-0 shadow-2xl bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className="text-center">
              <h2 className="text-2xl mb-8 text-gray-700">Multiplicación Loca</h2>

              <div className="mb-8">
                <div className="text-6xl mb-8 text-gray-800">
                  {num1} × {num2} = ?
                </div>
              </div>

              {feedback === 'correct' && (
                <div className="text-2xl text-green-600 mb-6">✓ ¡Correcto! +{15 + Math.floor(timeLeft / 10)} puntos</div>
              )}
              {feedback === 'incorrect' && (
                <div className="text-2xl text-red-600 mb-6">✗ ¡Inténtalo de nuevo!</div>
              )}

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {options.map((option) => (
                  <Button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={feedback !== null}
                    className={`text-2xl py-8 transition-all ${
                      selectedAnswer === option
                        ? feedback === 'correct'
                          ? 'bg-green-500 hover:bg-green-500'
                          : 'bg-red-500 hover:bg-red-500'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700'
                    }`}
                  >
                    {option}
                  </Button>
                ))}
              </div>
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