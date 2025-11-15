import { useState, useEffect } from 'react';
import { User } from '../../App';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft, Clock, Star } from 'lucide-react';
import { Progress } from '../ui/progress';

type FractionGameProps = {
  user: User;
  onComplete: (score: number) => void;
  onBack: () => void;
};

export function FractionGame({ user, onComplete, onBack }: FractionGameProps) {
  const [numerator, setNumerator] = useState(0);
  const [denominator, setDenominator] = useState(0);
  const [simplifiedNum, setSimplifiedNum] = useState(0);
  const [simplifiedDen, setSimplifiedDen] = useState(0);
  const [userNum, setUserNum] = useState('');
  const [userDen, setUserDen] = useState('');
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const totalQuestions = 8;

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const generateFraction = () => {
    const maxNum = Math.min(20, 8 + user.level);
    const den = Math.floor(Math.random() * (maxNum - 2)) + 2;
    const num = Math.floor(Math.random() * (den - 1)) + 1;
    
    // Make sure it's not already simplified
    const commonDivisor = gcd(num, den);
    const multiplier = Math.floor(Math.random() * 3) + 2;
    
    const unsimplifiedNum = num * multiplier;
    const unsimplifiedDen = den * multiplier;
    
    setNumerator(unsimplifiedNum);
    setDenominator(unsimplifiedDen);
    setSimplifiedNum(num);
    setSimplifiedDen(den);
    setUserNum('');
    setUserDen('');
    setFeedback(null);
  };

  useEffect(() => {
    generateFraction();
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
    const userNumInt = parseInt(userNum);
    const userDenInt = parseInt(userDen);
    
    const isCorrect = userNumInt === simplifiedNum && userDenInt === simplifiedDen;

    if (isCorrect) {
      setFeedback('correct');
      const points = 25 + Math.floor(timeLeft / 10);
      setScore(score + points);
      setQuestionsAnswered(questionsAnswered + 1);

      setTimeout(() => {
        if (questionsAnswered + 1 >= totalQuestions) {
          setIsGameOver(true);
        } else {
          generateFraction();
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

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
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
            <span className="text-gray-700">Progress</span>
            <span className="text-gray-600">{questionsAnswered}/{totalQuestions}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </Card>

        {!isGameOver ? (
          <Card className="p-12 border-0 shadow-2xl bg-gradient-to-br from-orange-50 to-red-50">
            <div className="text-center">
              <h2 className="text-2xl mb-4 text-gray-700">Fraction Frenzy</h2>
              <p className="text-sm text-gray-600 mb-8">Simplify the fraction to its lowest terms</p>

              <div className="mb-8">
                <div className="text-5xl mb-8 text-gray-800 inline-block">
                  <div className="flex flex-col items-center bg-white px-12 py-8 rounded-lg shadow-lg">
                    <div className="mb-2">{numerator}</div>
                    <div className="w-full h-1 bg-gray-800 mb-2"></div>
                    <div>{denominator}</div>
                  </div>
                </div>

                <div className="text-3xl my-6 text-gray-400">=</div>

                <div className="text-4xl text-gray-800 inline-block">
                  <div className="flex flex-col items-center bg-orange-100 px-12 py-8 rounded-lg border-2 border-orange-300">
                    <input
                      type="number"
                      value={userNum}
                      onChange={(e) => setUserNum(e.target.value)}
                      className="w-24 text-center text-4xl border-b-2 border-orange-400 bg-transparent focus:outline-none mb-2"
                      placeholder="?"
                    />
                    <div className="w-full h-1 bg-gray-800 mb-2"></div>
                    <input
                      type="number"
                      value={userDen}
                      onChange={(e) => setUserDen(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && userNum && userDen && handleSubmit()}
                      className="w-24 text-center text-4xl border-b-2 border-orange-400 bg-transparent focus:outline-none"
                      placeholder="?"
                    />
                  </div>
                </div>
              </div>

              {feedback === 'correct' && (
                <div className="text-2xl text-green-600 mb-4">✓ Correct! +{25 + Math.floor(timeLeft / 10)} points</div>
              )}
              {feedback === 'incorrect' && (
                <div className="text-2xl text-red-600 mb-4">✗ Try again!</div>
              )}

              <Button
                onClick={handleSubmit}
                disabled={!userNum || !userDen || feedback !== null}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-xl px-8 py-6"
              >
                Submit Answer
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-12 border-0 shadow-2xl bg-gradient-to-br from-purple-50 to-pink-50 text-center">
            <div className="mb-6">
              <Star className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-4xl mb-4 text-gray-800">Game Complete!</h2>
              <p className="text-2xl text-gray-600 mb-2">Final Score: {score}</p>
              <p className="text-xl text-gray-600">Questions Answered: {questionsAnswered}/{totalQuestions}</p>
            </div>
            <Button
              onClick={handleFinish}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-xl px-8 py-6"
            >
              Continue
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
