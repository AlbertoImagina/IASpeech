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
  Stepper,
  useBreakpointValue
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
  const sm = useBreakpointValue({ sm: true, lg: false, md: false });

  return (
    <Stepper
      orientation={sm ? 'vertical' : 'horizontal'}
      size={{ sm: 'sm', md: 'lg' }}
      index={currentStep}
      mb='50px'
      px={20}
      colorScheme="purple"
    >
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicatorChakraUi
          h={{sm:'40px'}}
          w={{sm:'40px'}}
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
              fontSize={{ sm: '18px' }}
              color={currentStep === index ? 'icon' : 'disabled'}
            >
              {step.title}
            </StepTitle>
            <StepDescription
              fontSize={{ sm: '16px' }}
              color={currentStep === index ? 'icon' : 'disabled'}
            >
              {step.description}
            </StepDescription>
          </Box>

          <StepSeparator
            display={{sm:'none', md: 'block'}}
            bgGradient={currentStep > index ? "linear(to-l, #A052EE, #6645E7)" : "disabled"}
          />
        </Step>
      ))}
    </Stepper>
  );
}
