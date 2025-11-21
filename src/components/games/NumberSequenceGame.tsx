import { useState, useEffect } from 'react';
import { User } from '../../App';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft, Clock, Star } from 'lucide-react';
import { Progress } from '../ui/progress';

type NumberSequenceGameProps = {
  user: User;
  onComplete: (score: number) => void;
  onBack: () => void;
};

type SequenceType = 'arithmetic' | 'geometric' | 'fibonacci' | 'squares';

export function NumberSequenceGame({ user, onComplete, onBack }: NumberSequenceGameProps) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [answer, setAnswer] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [sequenceType, setSequenceType] = useState<SequenceType>('arithmetic');
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const totalQuestions = 8;

  const generateSequence = () => {
    const types: SequenceType[] = ['arithmetic', 'geometric', 'squares'];
    if (user.level >= 5) types.push('fibonacci');
    
    const type = types[Math.floor(Math.random() * types.length)];
    setSequenceType(type);

    let seq: number[] = [];
    let ans = 0;

    switch (type) {
      case 'arithmetic': {
        const start = Math.floor(Math.random() * 10) + 1;
        const diff = Math.floor(Math.random() * 5) + 2;
        seq = Array.from({ length: 5 }, (_, i) => start + i * diff);
        ans = start + 5 * diff;
        break;
      }
      case 'geometric': {
        const start = Math.floor(Math.random() * 3) + 2;
        const ratio = Math.floor(Math.random() * 2) + 2;
        seq = Array.from({ length: 5 }, (_, i) => start * Math.pow(ratio, i));
        ans = start * Math.pow(ratio, 5);
        break;
      }
      case 'fibonacci': {
        seq = [1, 1];
        for (let i = 2; i < 5; i++) {
          seq.push(seq[i - 1] + seq[i - 2]);
        }
        ans = seq[4] + seq[3];
        break;
      }
      case 'squares': {
        const start = Math.floor(Math.random() * 3) + 1;
        seq = Array.from({ length: 5 }, (_, i) => Math.pow(start + i, 2));
        ans = Math.pow(start + 5, 2);
        break;
      }
    }

    setSequence(seq);
    setAnswer(ans);
    setUserAnswer('');
    setFeedback(null);
  };

  useEffect(() => {
    generateSequence();
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
    const isCorrect = parseInt(userAnswer) === answer;

    if (isCorrect) {
      setFeedback('correct');
      const points = 20 + Math.floor(timeLeft / 10);
      setScore(score + points);
      setQuestionsAnswered(questionsAnswered + 1);

      setTimeout(() => {
        if (questionsAnswered + 1 >= totalQuestions) {
          setIsGameOver(true);
        } else {
          generateSequence();
        }
      }, 1500);
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

  const getSequenceDescription = () => {
    switch (sequenceType) {
      case 'arithmetic': return 'Sumando el mismo número cada vez';
      case 'geometric': return 'Multiplicando por el mismo número cada vez';
      case 'fibonacci': return 'Cada número es la suma de los dos anteriores';
      case 'squares': return 'Secuencia de cuadrados perfectos';
    }
  };

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
          <Card className="p-12 border-0 shadow-2xl bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="text-center">
              <h2 className="text-2xl mb-4 text-gray-700">Secuencia Numérica</h2>
              <p className="text-sm text-gray-600 mb-8">{getSequenceDescription()}</p>

              <div className="mb-8">
                <div className="flex items-center justify-center gap-4 text-4xl mb-8 flex-wrap">
                  {sequence.map((num, i) => (
                    <div key={i}>
                      <div className="bg-white px-6 py-4 rounded-lg shadow-lg text-gray-800">
                        {num}
                      </div>
                    </div>
                  ))}
                  <div className="text-3xl text-gray-400">→</div>
                  <div className="bg-purple-100 px-6 py-4 rounded-lg border-2 border-purple-300 border-dashed">
                    <span className="text-3xl text-purple-600">?</span>
                  </div>
                </div>
              </div>

              <div className="max-w-xs mx-auto mb-6">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && userAnswer && handleSubmit()}
                  className="w-full text-4xl text-center p-4 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="?"
                  autoFocus
                />
              </div>

              {feedback === 'correct' && (
                <div className="text-2xl text-green-600 mb-4">✓ ¡Correcto! +{20 + Math.floor(timeLeft / 10)} puntos</div>
              )}
              {feedback === 'incorrect' && (
                <div className="text-2xl text-red-600 mb-4">✗ ¡Inténtalo de nuevo!</div>
              )}

              <Button
                onClick={handleSubmit}
                disabled={!userAnswer || feedback !== null}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-xl px-8 py-6"
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