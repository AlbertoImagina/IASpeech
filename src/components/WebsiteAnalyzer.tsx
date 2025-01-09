import { useState } from 'react';
import { Search } from 'lucide-react';
import { TfiWorld } from "react-icons/tfi";
import { Flex, Input, Text, Button } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react'
import { useDataContext } from '../context/data.context';

interface WebsiteAnalyzerProps {
  onAnalysisComplete: (keyPoints: string[]) => void;
}



export function WebsiteAnalyzer({ onAnalysisComplete }: WebsiteAnalyzerProps) {
  const [url, setUrl] = useState('');
  const {isLoading, setIsLoading} = useDataContext();


  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const mockKeyPoints = [
        "El producto incrementará su productividad un 50%",
        "Disponible tres tipos de precios en la suscripción",
        "Soporte 24/7",
        "Integración con las herramientas populares",
      ];
      onAnalysisComplete(mockKeyPoints);
      setIsLoading(false);
    }, 4000);
  };

  return (
      <Flex
        direction='column'
      >
        <Flex
          align='center'
          justify='center'
          mb={8}
        >
          <Icon
            as={TfiWorld}
            w={10}
            h={10}
            color='icon'
          />
        </Flex>
        <Text
          fontSize="20px"
          marginBottom={6}
          textAlign="center"
          layerStyle="textGradient"
          fontWeight="semibold"
        >
          Introduce la URL para empezar
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
              disabled={isLoading}
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
      </Flex>
  );
}