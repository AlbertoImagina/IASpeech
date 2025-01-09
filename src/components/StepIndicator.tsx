import { TfiWorld } from "react-icons/tfi";
import { FaMicrophone } from "react-icons/fa";
import { FaAward } from "react-icons/fa";

import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator as StepIndicatorChakraUi,
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
    <Stepper 
      size={{base: 'lg', xs:'sm', lg:'lg'}}
      index={currentStep} 
      mb='50px' 
      px="20px"
      colorScheme="purple"
      >
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicatorChakraUi
            color={currentStep === index ? 'icon' : 'disabled'}
            borderColor={currentStep === index ? 'icon' : 'disabled'}
          >
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
          </StepIndicatorChakraUi>

          <Box flexShrink='0'>
            <StepTitle
              color={currentStep === index ? 'icon' : 'disabled'}
            >
              {step.title}
            </StepTitle>
            <StepDescription
              color={currentStep === index ? 'icon' : 'disabled'}
            >
              {step.description}
            </StepDescription>
          </Box>

          <StepSeparator
            bgGradient={currentStep > index ? "linear(to-l, #A052EE, #6645E7)" : "disabled"}
          />
        </Step>
      ))}
    </Stepper>
  );
}
