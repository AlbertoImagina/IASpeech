import { useState, useEffect } from "react";
import { WebsiteAnalyzer } from "../components/WebsiteAnalyzer";
import { VoiceRecorder } from "../components/VoiceRecorder";
import { SpeechEvaluation } from "../components/SpeechEvaluation";
import { StepIndicator } from "../components/StepIndicator";
import { KeyPoint, EvaluationResult } from "../types/EvaluationResult";
import { enviarVoz } from "../middleware/middlewares";
import { useAuthContext } from "../context/auth.context";
import { Button, Flex, Text, OrderedList, ListItem } from "@chakra-ui/react";
import SwitchTheme from "../components/SwitchTheme";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ModalCorrectSpeech } from "../components/ModalCorrectSpeech";
import { motion } from "motion/react"
import { useColorModeValue } from '@chakra-ui/react';

function Home() {
    const [step, setStep] = useState(0);
    const bgColor = useColorModeValue('white', '#1D222D');
    const [isLoading, setIsLoading] = useState(false);
    const [keyPoints, setKeyPoints] = useState<KeyPoint[]>([]);
    const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
    const [data, setData] = useState<any>(null);
    const { logout } = useAuthContext();
    const navigate = useNavigate();


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
            const response = await enviarVoz({
                pregunta: preguntaEmpresa,
                guiaCorreccion: JSON.stringify(keyPoints),
                archivo,
                dificultad,
            });
            setData(response);
            setEvaluation(response);
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
        <>
            <header className="dark:bg-black">
                <div className=" text-[24px] mx-auto px-4 py-4 sm:px-6 lg:px-12 flex items-center justify-between dark:bg-black">
                    <div onClick={() => setStep(0)} className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:bg-black">
                        <Link to=''>Speech Trainer AI</Link>
                    </div>
                    <Flex
                        justify="space-between"
                        align="center"
                    >
                        <SwitchTheme />

                        <Button
                            id="logout_button"
                            px="8"
                            bgGradient="linear(to-l, #A052EE, #6645E7)"
                            fontSize="18px"
                            onClick={() => logout(navigate)}
                        >
                            Cerrar Sesión
                        </Button>
                    </Flex>

                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 h-full dark:bg-black">
                <StepIndicator currentStep={step} />

                <div className="flex flex-col items-center space-y-8">
                    {step === 0 && !isLoading && (
                        <div className="w-full max-w-2xl rounded-2xl p-12" style={{ backgroundColor: bgColor, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)", }}>
                            <motion.div
                                initial={{ opacity: 0, translateX: -50 }}
                                animate={{ opacity: 1, translateX: 0 }}
                                transition={{ duration: 0.2, delay: 0.5, ease: "linear" }}
                            >
                                <WebsiteAnalyzer
                                    onAnalysisComplete={handleAnalysisComplete} />
                            </motion.div>
                        </div>
                    )}


                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0, translateX: -50 }}
                            animate={{ opacity: 1, translateX: 0 }}
                            transition={{ duration: 0.2, delay: 0.5, ease: "circIn" }}
                        >
                            <ModalCorrectSpeech />
                        </motion.div>

                    )}


                    {step === 1 && !isLoading && (
                        <motion.div className="w-full flex flex-col items-center space-y-6"
                            initial={{ opacity: 0, translateX: 50 }}
                            animate={{ opacity: 1, translateX: 0 }}
                            transition={{ duration: 0.2, delay: 0.5, ease: "linear" }}
                        >
                            <div className="w-full max-w-2xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6" style={{ backgroundColor: bgColor, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)", }}>
                                <Text
                                    fontSize="20px"
                                    marginBottom={6}
                                    color="#9CA3AF"
                                >Puntos clave:</Text>
                                <OrderedList>
                                    {keyPoints.map((point, index) => (
                                        <ListItem
                                            key={index}
                                            color="#9CA3AF"
                                        >
                                            {point}
                                        </ListItem>
                                    ))}
                                </OrderedList>
                            </div>
                            <div className="w-full max-w-2xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6" style={{ backgroundColor: bgColor, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)", }}>
                                <VoiceRecorder
                                    onRecordingComplete={handleRecordingComplete} />
                            </div>
                        </motion.div>
                    )}


                    {step === 3 && evaluation && (
                        <motion.div
                            className="w-full max-w-2xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6" style={{ backgroundColor: bgColor, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)", }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.5,
                                scale: { type: "spring", visualDuration: 0.4, bounce: 0 },
                            }}
                        >
                            <SpeechEvaluation data={data} />
                        </motion.div>
                    )}
                </div>
            </main >
        </>
    );
}

export default Home;
