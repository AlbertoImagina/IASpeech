import { Flex, Text, Progress } from "@chakra-ui/react"

const ModalCorrectSpeech = () => {
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
        >
            <Text
                fontSize="xl"
                fontWeight="semibold"
                m="4"
                color="#302E81">
                Enviando tu discurso para corregir
            </Text>
            <Text
                fontSize="16px"
                my="5px"
                color="#302E81">
                Un segundo por favor...
            </Text>
            <Progress
                size="xs"
                isIndeterminate
                w="80%"
                mt="15px" 
                colorScheme="red"
                />
        </Flex>
    )
}

export { ModalCorrectSpeech }