import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { TfiWorld } from "react-icons/tfi";
import { Flex, Input, Text, Button } from '@chakra-ui/react';
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
    <Flex flexDirection='column'>
      <div className="flex items-center justify-center mb-8">
        <Icon as={TfiWorld} w={10} h={10} color={'#6645E7'} />
      </div>
      <Text
        fontSize="20px"
        marginBottom={6}
        textAlign="center"
        color="#9CA3AF"
        fontWeight="semibold"
      >
        Introduce la URL para entrenar
      </Text>
      <form onSubmit={handleAnalyze} className="space-y-4">
        <Flex
          align="center"
        >
          <Input
            type='url'
            py={6}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder='https://ejemplo.com'
            required
          />
          <Button
            type="submit"
            disabled={loading}
            layerStyle="buttonGradient"
            p={6}
            ml={2}
          >
            <Search
              size={25}
            />
          </Button>
        </Flex>
      </form>

      {loading && (
        <div className="mt-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
          <Text
            layerStyle="textGradient"
          >Analizando contenido...</Text>
        </div>
      )}
    </Flex>
  );
}