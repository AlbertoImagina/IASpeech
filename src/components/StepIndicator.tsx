import { TfiWorld } from "react-icons/tfi";
import { FaMicrophone } from "react-icons/fa";
import { FaAward } from "react-icons/fa";

import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator as StepIndicatorChakaraUi,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper
} from '@chakra-ui/react'

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { title: 'Paso 1', description: 'Analizar web' },
    { title: 'Paso 2', description: 'Grabar discurso' },
    { title: 'Paso 3', description: 'Evaluación' },
  ]


  return (
      <Stepper size='lg' colorScheme="gray" index={currentStep} mb='50px' px="20px">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicatorChakaraUi>
              <StepStatus
                complete={<StepIcon />}
                incomplete={
                  index === 0 ? <TfiWorld /> :
                  index === 1 ? <FaMicrophone /> :
                  index === 2 ? <FaAward /> :
                  <StepNumber />
                }
                active={
                  index === 0 ? <TfiWorld /> :
                  index === 1 ? <FaMicrophone /> :
                  index === 2 ? <FaAward /> :
                  <StepNumber />
                }
              />
              
            </StepIndicatorChakaraUi>

            <Box flexShrink='0'>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
  );
}