import { Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

function SwitchTheme() {
    const [mode, setMode] = useState(false)

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

    return (
        <>
            <Button mr='10px' onClick={handleMode}> {mode ? <FiSun /> : <FiMoon />}</Button>
        </>
    )
}

export default SwitchTheme