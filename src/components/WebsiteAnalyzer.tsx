import { useState } from 'react';
import { Search } from 'lucide-react';
import { TfiWorld } from "react-icons/tfi";
import { Flex, Input, Text, Button } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react'
import { motion } from "motion/react"
import { ModalCorrectSpeech } from './ModalCorrectSpeech';


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
    }, 4000);
  };

  return (
    <>
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
              disabled={loading}
              layerStyle="buttonGradient"
              color='buttonIcon'
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

      {loading && (

        <motion.div
          style={{marginTop: '20px'}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.2, delay: 0.5, ease: "linear" }}
        >
          <ModalCorrectSpeech title="Analizando web" subTitle="Un segundo por favor..." />
        </motion.div>
      )}
    </>
  );
}