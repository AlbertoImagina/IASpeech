import { Flex, Text, Progress } from "@chakra-ui/react"
import { useColorModeValue } from '@chakra-ui/react';

const ModalCorrectSpeech = () => {
    const bgColor = useColorModeValue('white', '#1D222D');

    return (
        <Flex
            direction="column"
            textAlign="center"
            justify="center"
            align="center"
            maxW="2xl"
            w="full"
            bg="whiteAlpha.800"
            rounded="2xl"
            shadow="xl"
            p="20"
            fontSize="20px"
            style={{ backgroundColor: bgColor, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)", }}
        >
            <Text
                fontSize="xl"
                fontWeight="semibold"
                m="4"
                color="#9CA3AF"
            >
                Enviando tu discurso para corregir
            </Text>
            <Text
                fontSize="16px"
                my="5px"
                color="#9CA3AF"
            >
                Un segundo por favor...
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