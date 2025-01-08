import { Flex, Text, Progress } from "@chakra-ui/react"
import { useColorModeValue } from '@chakra-ui/react';

interface ModalCorrectSpeechProps {
    title: string,
    subTitle?: string
}

const ModalCorrectSpeech = ({title,subTitle}:ModalCorrectSpeechProps) => {
    const bgColor = useColorModeValue('#FFFFFF', '#1D222D');

    return (
        <Flex
            direction="column"
            textAlign="center"
            justify="center"
            align="center"
            maxW="2xl"
            w="full"
            rounded="2xl"
            shadow="xl"
            p="20"
            fontSize="20px"
            color="text"
            style={{ backgroundColor: bgColor, boxShadow: "-10px 20px 25px -5px rgba(0, 0, 0, 0.10), 10px 8px 10px -6px rgba(0, 0, 0, 0.10)", }}
        >
            <Text
                fontSize="xl"
                fontWeight="semibold"
                m="4"
            >
                {title}
            </Text>
            <Text
                fontSize="16px"
                my="5px"
            >
                {subTitle}
            </Text>
            <Progress
                size="xs"
                isIndeterminate
                w="80%"
                mt="15px"
                color='red'
            />
        </Flex>
    )
}

export { ModalCorrectSpeech }