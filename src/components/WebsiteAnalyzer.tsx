import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { TfiWorld } from "react-icons/tfi";
import { Flex } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react'

interface WebsiteAnalyzerProps {
  onAnalysisComplete: (keyPoints: string[]) => void;
}

export function WebsiteAnalyzer({ onAnalysisComplete }: WebsiteAnalyzerProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const mockKeyPoints = [
        "El producto incrementará su productividad un 50%",
        "Disponible tres tipos de precios en la suscripción",
        "Soporte 24/7",
        "Integración con las herramientas populares",
      ];
      onAnalysisComplete(mockKeyPoints);
      setLoading(false);
    }, 2000);
  };

  return (
    <Flex flexDirection='column' className='darkMode'>
      <div className="flex items-center justify-center mb-8">
        <Icon as={TfiWorld} w={10} h={10} color={'#6645E7'}/>
      </div>
      <h2 className="text-[20px] font-semibold text-center mb-6 text-gray-200">
        Introduce la URL para entrenar
      </h2>
      <form onSubmit={handleAnalyze} className="space-y-4">
        <div className="relative">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://ejemplo.com"
            className="w-full px-4 py-3 rounded-xl border border-gray focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-transparent backdrop-blur-sm transition-all duration-300 focus:outline-none text-white"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search size={20} />
          </button>
        </div>
      </form>

      {loading && (
        <div className="mt-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
          <p className="mt-4 text-indigo-900">Analizando contenido...</p>
        </div>
      )}
    </Flex>
  );
}