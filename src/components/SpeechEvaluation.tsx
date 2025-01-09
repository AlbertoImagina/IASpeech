
import { CheckCircle, XCircle } from 'lucide-react';
import { FaAward } from "react-icons/fa";
import { Flex, Text, Button, Icon, useColorMode } from "@chakra-ui/react";
import { useDataContext } from "../context/data.context";

interface SpeechEvaluationProps {
  puntuacion: number,
  evaluacion: string[]
}

export function SpeechEvaluation({ data }: { data: SpeechEvaluationProps }) {
  const { colorMode } = useColorMode()
  const { setStep } = useDataContext();

  return (
    <Flex
      w='full'
      my={4}
      direction='column'
    >
      <Flex
        direction='column'
        align='center'
      >
        <Icon
          as={FaAward}
          w={10}
          h={10}
          mb={4}
          color='icon'
        />

        <Text
          fontSize="20px"
          marginBottom={6}
          color="text"
        >
          Evaluación de discurso
        </Text>
        <Text
          fontSize="18px"
          marginBottom={6}
          color="text"
        >
          Detalles de tus respuestas y como lo has hecho:
        </Text>
      </Flex>

      <Flex
        direction='column'
        position='relative'
        pt={1}
      >
        <Flex
          align='center'
          justify='space-between'
          mb='2'
        >
          <Text
            fontSize="18px"
            color="text"
          >
            Puntuación total
          </Text>
          <Text
            fontSize='3xl'
            fontWeight='bold'
            layerStyle='textGradient'
          >
            {data.puntuacion}%
          </Text>
        </Flex>
        <Flex
          w='full'
          h='3'
          overflow='hidden'
          backgroundColor={colorMode === 'dark' ? '#535353' : 'gray.200'}
          rounded='full'
          >
          <Flex
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000"
            style={{ width: `${data.puntuacion}%` }}
          />
        </Flex>
      </Flex>

      <Flex
        my={4}
        direction='column'
      >
        <Text
          fontSize="18px"
          color="text"
        >
          Claves usadas:
        </Text>
        {data.evaluacion.map((item, index) => {
          return (
            <Flex
              my={2}
              key={index}
              p='4'
              rounded='xl'
              gap='10px'
              border='1px solid'
              borderColor='border_green'
              color={colorMode === 'dark' ? 'bg-transparent' : 'text_green'}
            >
              {item ? (
                <CheckCircle className={`flex-shrink-0 ${colorMode === 'dark' ? 'text-[#40DE7B]' : 'text-green-500'} mt-0.5`} size={20} />
              ) : (
                <XCircle className={`flex-shrink-0 ${colorMode === 'dark' ? 'text-red-500' : 'text-red-500'} mt-0.5`} size={20} />
              )}
              <Text
                color={colorMode === 'dark' ? '#40DE7B' : 'green.500'}
              >
                {item}
              </Text>
            </Flex>
          );
        })}
      </Flex>
      <Flex
        justifyContent='center'
        mt='20px'
      >
        <Button
          layerStyle={'buttonGradient'}
          onClick={() => setStep(1)}
        >
          Volver a intentarlo
        </Button>
      </Flex>
    </Flex>
  );
}