
import { CheckCircle, XCircle } from 'lucide-react';
import { FaAward } from "react-icons/fa";
import { Text } from "@chakra-ui/react";

interface SpeechEvaluationProps {
  puntuacion: number,
  evaluacion: string[]
}

export function SpeechEvaluation({ data }: { data: SpeechEvaluationProps }) {
  return (
    <div className="w-full space-y-8">
      <div className="text-center">
        <FaAward size={48} className="mx-auto text-indigo-900 mb-4" color={'#6645E7'}/>
        <Text fontSize="20px" marginBottom={6}>Evaluación de discurso</Text>
        <Text fontSize="18px" marginBottom={6}>Detalles de tus respuestas y como lo has hecho:</Text>
      </div>

      <div className="relative pt-1">
        <div className="flex items-center justify-between mb-2">
          <Text fontSize="18px">Puntuación total</Text>
          <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {data.puntuacion}%
          </span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000"
            style={{ width: `${data.puntuacion}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <Text fontSize="18px">Claves usadas:</Text>
        {data.evaluacion.map((item, index) => {
          return (
            <div
              key={index}
              className={`flex items-start space-x-3 p-4 rounded-xl transition-all duration-300 ${item ? 'bg-green-50' : 'bg-red-50'
                }`}
            >
              {item ? (
                <CheckCircle className="flex-shrink-0 text-green-500 mt-0.5" size={20} />
              ) : (
                <XCircle className="flex-shrink-0 text-red-500 mt-0.5" size={20} />
              )}
              <span className={item ? 'text-green-700' : 'text-red-700'}>
                {item}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}