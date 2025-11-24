import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Brain, Sparkles } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

type LoginPageProps = {
  onLogin: (email: string, password: string) => void;
  onSignup: (name: string, email: string, password: string, userType: 'student' | 'teacher', schoolId: string, course?: string) => void;
};

export function LoginPage({ onLogin, onSignup }: LoginPageProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  const [schoolId, setSchoolId] = useState('');
  const [course, setCourse] = useState('');

  // Mock schools
  const schools = [
    { id: 'school1', name: 'Colegio San Marcos' },
    { id: 'school2', name: 'Escuela Gabriela Mistral' },
    { id: 'school3', name: 'Liceo Arturo Prat' },
    { id: 'school4', name: 'Colegio Pablo Neruda' },
  ];

  const courses = [
    '1° Básico',
    '2° Básico',
    '3° Básico',
    '4° Básico',
    '5° Básico',
    '6° Básico',
    '7° Básico',
    '8° Básico',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      onSignup(name, email, password, userType, schoolId, course);
    } else {
      onLogin(email, password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-15 h-15 bg-gradient-to-br from-green-600 to-green-600 rounded-3xl mb-4 shadow-lg">
            <img src="../../Otros assets/diff.png" alt="" />
          </div>
          <h1 className="text-4xl mb-2 green-500 bg-clip-text">
            CompiMat
          </h1>
          <p className="text-gray-600">¡Aprende matemáticas a través de juegos divertidos!</p>
        </div>

        <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <>
                <div>
                  <label className="block mb-2 text-gray-700">Tipo de Usuario</label>
                  <RadioGroup value={userType} onValueChange={(value) => setUserType(value as 'student' | 'teacher')}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="student" />
                      <Label htmlFor="student">Estudiante</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="teacher" id="teacher" />
                      <Label htmlFor="teacher">Profesor/a</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">Nombre</label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ingresa tu nombre"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">Escuela</label>
                  <Select value={schoolId} onValueChange={setSchoolId} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tu escuela" />
                    </SelectTrigger>
                    <SelectContent>
                      {schools.map((school) => (
                        <SelectItem key={school.id} value={school.id}>
                          {school.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">
                    {userType === 'student' ? 'Tu Curso' : 'Curso Asignado'}
                  </label>
                  <Select value={course} onValueChange={setCourse} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el curso" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            <div>
              <label className="block mb-2 text-gray-700">Correo Electrónico</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Contraseña</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-green-500 from-green-400 to-green-400 hover:from-green-400 hover:to-green-400">
              <Sparkles className="w-4 h-4 mr-2" />
              {isSignup ? 'Registrarse' : 'Iniciar Sesión'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-green-500 hover:text-purple-700"
            >
              {isSignup ? '¿Ya tienes una cuenta? Iniciar Sesión' : '¿No tienes una cuenta? Registrarse'}
            </button>
          </div>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>🎮 Mini-juegos interactivos</p>
          <p>📊 Sigue tu progreso</p>
          <p>🏆 Compite con amigos</p>
        </div>
      </div>
    </div>
  );
}