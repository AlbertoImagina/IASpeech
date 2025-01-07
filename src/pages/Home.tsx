import { useState, useEffect } from "react";
import { WebsiteAnalyzer } from "../components/WebsiteAnalyzer";
import { VoiceRecorder } from "../components/VoiceRecorder";
import { SpeechEvaluation } from "../components/SpeechEvaluation";
import { StepIndicator } from "../components/StepIndicator";
import { KeyPoint, EvaluationResult } from "../types/EvaluationResult";
import { enviarVoz } from "../middleware/middlewares";
import { useAuthContext } from "../context/auth.context";
import { Button, Flex, Switch, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ModalCorrectSpeech } from "../components/ModalCorrectSpeech";
import { motion } from "motion/react"

function Home() {
    const [step, setStep] = useState(0);
    const [mode, setMode] = useState(false)
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

    useEffect(() => {
        const savedMode = localStorage.getItem('chakra-ui-color-mode');
        if (savedMode) {
            setMode(savedMode === 'dark');
        }
    }, []);

    const handleMode = () => {
        const newMode = !mode;
        setMode(newMode);
        localStorage.setItem('chakra-ui-color-mode', newMode ? 'dark' : 'light');
        window.location.reload();
    }

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
                        <Switch
                            mr="5px"
                            isChecked={mode}
                            onChange={handleMode}
                        />
                        <Text
                            fontSize="md"
                            mr="10px"
                        >{mode ? "Turn on the light" : "Turn off the light"}</Text>
                        <Button
                            id="logout_button"
                            px="8"
                            bgGradient="linear(to-l, #A052EE, #6645E7)"
                            color="white"
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
                        <div className="w-full max-w-2xl rounded-2xl border border-gray p-12 bg-[#1D222D]">
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.8,
                                    scale: { type: "spring", visualDuration: 0.7, bounce: 0.5 },
                                }}
                            >
                                <WebsiteAnalyzer onAnalysisComplete={handleAnalysisComplete} />
                            </motion.div>

                        </div>
                    )}


                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.8,
                                scale: { type: "spring", visualDuration: 0.7, bounce: 0.5 },
                            }}
                        >
                            <ModalCorrectSpeech />
                        </motion.div>

                    )}


                    {step === 1 && !isLoading && (
                        <motion.div className="w-full flex flex-col items-center space-y-6"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.7,
                                scale: { type: "spring", visualDuration: 0.7, bounce: 0.5 },
                            }}
                        >
                            <div className="w-full max-w-2xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
                                <h2 className="text-xl font-semibold mb-4 text-indigo-900">Puntos clave:</h2>
                                <ul className="space-y-3">
                                    {keyPoints.map((point, index) => (
                                        <li key={index} className="flex items-start space-x-3">
                                            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium">
                                                {index + 1}
                                            </span>
                                            <span className="text-gray-700">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="w-full max-w-2xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
                                <VoiceRecorder
                                    onRecordingComplete={handleRecordingComplete} />
                            </div>
                        </motion.div>
                    )}


                    {step === 3 && evaluation && (
                        <motion.div
                            className="w-full max-w-2xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.8,
                                scale: { type: "spring", visualDuration: 0.7, bounce: 0.5 },
                            }}
                        >
                            <SpeechEvaluation data={data} />
                        </motion.div>
                    )}
                </div>
            </main>
        </>
    );
}

export default Home;
