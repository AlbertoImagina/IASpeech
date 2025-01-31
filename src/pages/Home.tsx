import { useState, useEffect } from "react";
import { WebsiteAnalyzer } from "../components/WebsiteAnalyzer";
import { VoiceRecorder } from "../components/VoiceRecorder";
import { SpeechEvaluation } from "../components/SpeechEvaluation";
import { StepIndicator } from "../components/StepIndicator";
import { KeyPoint, EvaluationResult } from "../types/EvaluationResult";
import { enviarVoz } from "../middleware/middlewares";
import { Text, OrderedList, ListItem, Box, Flex } from "@chakra-ui/react";
import { motion } from "motion/react"
import { useColorModeValue } from '@chakra-ui/react';
import { useToast } from "@chakra-ui/react";
import { useDataContext } from "../context/data.context";
import ModalCorrectSpeech from "../components/ModalCorrectSpeech";
import Header from "../components/Header";

function Home() {
    const bgColor = useColorModeValue('#FFFFFF', '#1D222D');
    const [keyPoints, setKeyPoints] = useState<KeyPoint[]>([]);
    const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
    const [data, setData] = useState<any>(null);
    const { step, setStep, isLoading, setIsLoading } = useDataContext();
    const toast = useToast();

    const handleAnalysisComplete = (points: KeyPoint[]) => {
        setKeyPoints(points);
        setStep(1);
    };

    const handleRecordingComplete = async (audioBlob: Blob) => {
        const preguntaEmpresa = "Eres el comercial de ProAcademy, realiza un discurso convincente";
        const dificultad = 1;
        const archivo = new File([audioBlob], "recording.webm", { type: audioBlob.type });

        try {
            setIsLoading(true);
            setStep(2);
            try {
                const response = await enviarVoz({
                    pregunta: preguntaEmpresa,
                    guiaCorreccion: JSON.stringify(keyPoints),
                    archivo,
                    dificultad,
                });
                if (response.status === 500) {
                    throw new Error("Internal Server Error");
                }
                setData(response);
                setEvaluation(response);
            } catch (error) {
                console.error("Error al enviar el discurso:", error);
                setStep(1);
                return toast({
                    title: 'Error enviar audio',
                    description: 'El audio no pudo ser procesado correctamente, vuelva a intentarlo.',
                    status: 'error',
                })
            } finally {
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error al enviar el discurso:", error);
        }
    };

    useEffect(() => {
        if (evaluation) {
            setIsLoading(false);
            setStep(3);
        }
    }, [evaluation]);


    return (
        <Flex
            h='100vh'
            flexDirection='column'
            justifyItems={{ sm: 'center', md: 'normal' }}
            align={{sm:'center', md: 'normal'}}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.8, ease: "fade" }}
                style={{ minWidth: '500px', width: '100%' }}
            >
                <Header />
                <Box
                    w='100%'
                    mt={10}
                    justifyItems={{ sm: 'center', md: "normal" }}
                >
                    <StepIndicator
                        currentStep={step}
                    />
                </Box>
            </motion.div>


            {isLoading ? (
                <Flex
                    justifyContent='center'
                >
                    <motion.div
                        initial={{ opacity: 0, translateX: 50 }}
                        animate={{ opacity: 1, translateX: 0 }}
                        transition={{ duration: 0.2, delay: 0.5, ease: "circIn" }}
                        style={{ minWidth: '500px' }}
                    >
                        <ModalCorrectSpeech title={step === 0 ? "Analizando web" : "Enviando tu discurso para corregir"} subTitle="Espere un momento..." />
                    </motion.div>
                </Flex>
            ) : (
                <Flex
                    direction='column'
                    align='center'
                    my={8}
                >
                    {step === 0 && (
                        <Flex
                            w='full'
                            maxWidth='3xl'
                            rounded='2xl'
                            justify='center'
                            p={12}
                            style={{ backgroundColor: bgColor, boxShadow: "-10px 20px 25px -5px rgba(0, 0, 0, 0.10), 10px 8px 10px -6px rgba(0, 0, 0, 0.10)", }}>
                            <motion.div
                                initial={{ opacity: 0, translateX: 50 }}
                                animate={{ opacity: 1, translateX: 0 }}
                                transition={{ duration: 0.2, delay: 0.5, ease: "linear" }}
                                style={{ width: '100%' }}
                            >
                                <WebsiteAnalyzer
                                    onAnalysisComplete={handleAnalysisComplete}
                                />
                            </motion.div>
                        </Flex>
                    )}

                    {step === 1 && (
                        <Box
                            w='full'
                            maxW='3xl'
                            flexDirection='column'
                            alignItems='center'
                        >
                            <motion.div
                                initial={{ opacity: 0, translateX: 50 }}
                                animate={{ opacity: 1, translateX: 0 }}
                                transition={{ duration: 0.2, delay: 0.5, ease: "linear" }}
                            >
                                <Flex
                                    direction='column'
                                    w='full'
                                    rounded='2xl'
                                    p={6}
                                    style={{ backgroundColor: bgColor, boxShadow: "-10px 20px 25px -5px rgba(0, 0, 0, 0.10), 10px 8px 10px -6px rgba(0, 0, 0, 0.10)" }}>
                                    <Text
                                        fontSize="20px"
                                        marginBottom={6}
                                        color="text"
                                    >Puntos clave:</Text>
                                    <OrderedList>
                                        {keyPoints.map((point, index) => (
                                            <ListItem
                                                key={index}
                                                color="text"
                                            >
                                                {point}
                                            </ListItem>
                                        ))}
                                    </OrderedList>
                                </Flex>
                                <Flex
                                    w='full'
                                    rounded='2xl'
                                    p={6}
                                    my={10}
                                    style={{ backgroundColor: bgColor, boxShadow: "-10px 20px 25px -5px rgba(0, 0, 0, 0.10), 10px 8px 10px -6px rgba(0, 0, 0, 0.10)", }}>
                                    <VoiceRecorder
                                        onRecordingComplete={handleRecordingComplete} />
                                </Flex>
                            </motion.div>
                        </Box>
                    )}

                    {step === 3 && (
                        <Flex
                            mb={10}
                            w='100%'
                            justifyContent='center'
                        >
                            <motion.div
                                className="w-full max-w-2xl rounded-2xl shadow-xl p-6" style={{ backgroundColor: bgColor, boxShadow: "-10px 20px 25px -5px rgba(0, 0, 0, 0.10), 10px 8px 10px -6px rgba(0, 0, 0, 0.10)", }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.5,
                                    scale: { type: "spring", visualDuration: 0.4, bounce: 0 },
                                }}
                            >
                                <SpeechEvaluation data={data} />
                            </motion.div>
                        </Flex>
                    )}
                </Flex>
            )}
        </Flex>

    );
}

export default Home;
