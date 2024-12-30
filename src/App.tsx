import { useState, useEffect } from 'react';
import { WebsiteAnalyzer } from './components/WebsiteAnalyzer';
import { VoiceRecorder } from './components/VoiceRecorder';
import { SpeechEvaluation } from './components/SpeechEvaluation';
import { StepIndicator } from './components/StepIndicator';
import { type KeyPoint, type EvaluationResult } from './types';
import { enviarVoz } from './middleware/middlewares';

export function App() {
  const [step, setStep] = useState(1);
  const [keyPoints, setKeyPoints] = useState<KeyPoint[]>([]);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [data, setData] = useState<any>(null);

  const handleAnalysisComplete = (points: KeyPoint[]) => {
    setKeyPoints(points);
    setStep(2);
  };

  const handleRecordingComplete = async (audioBlob: Blob) => {
    const preguntaEmpresa = "Eres el comercial de ProAcademy, realiza un discurso convincente";
    const dificultad = 1;
    const archivo = new File([audioBlob], "recording.webm", { type: audioBlob.type });

    try {
      const response = await enviarVoz({
        pregunta: preguntaEmpresa,
        guiaCorreccion: JSON.stringify(keyPoints),
        archivo,
        dificultad,
      });

      setData(response);
      setEvaluation(response);

    } catch (error) {
      console.error("Error al enviar el discurso:", error);
    }
  };

  useEffect(() => {
    if (evaluation) {
      setStep(3);
    }
  }, [evaluation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Speech Trainer AI
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <StepIndicator currentStep={step} />

        <div className="flex flex-col items-center space-y-8">
          {step === 1 && (
            <div className="w-full max-w-2xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 transition-all duration-300">
              <WebsiteAnalyzer onAnalysisComplete={handleAnalysisComplete} />
            </div>
          )}

          {step >= 2 && (
            <div className="w-full flex flex-col items-center space-y-6">
              <div className="w-full max-w-2xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
                <h2 className="text-xl font-semibold mb-4 text-indigo-900">Puntos clave:</h2>
                <ul className="space-y-3">
                  {keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full max-w-2xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
                <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
              </div>
            </div>
          )}

          {step === 3 && evaluation && (
            <div className="w-full max-w-2xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
              <SpeechEvaluation data={data as any} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
