import { Button } from "@chakra-ui/react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useColorMode } from '@chakra-ui/react';

function SwitchTheme() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            <Button mr='10px' onClick={toggleColorMode}> {colorMode === 'light' ? <FiSun /> : <FiMoon />}</Button>
        </>
    )
}

export default SwitchTheme