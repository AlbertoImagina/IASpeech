import { Button, Flex } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/auth.context";
import SwitchTheme from "./SwitchTheme"
import { useDataContext } from "../context/data.context";


function Header() {
    const { setStep } = useDataContext();
    const { logout } = useAuthContext();
    const navigate = useNavigate();

    return (
        <header className="dark:bg-black">
            <Flex
                direction={{base: 'row', lg:'row' ,sm: 'column'}}
                fontSize='24px'
                mx='auto'
                px={4}
                py={4}
                align='center'
                justify='space-between'
            >
                <Flex
                    onClick={() => setStep(0)}
                    fontSize='2xl'
                    fontWeight='700'
                    layerStyle='textGradient'
                    mb={{base: '0px', sm:'8px', lg:'0px'}}
                >
                    <Link to=''>Speech Trainer AI</Link>
                </Flex>
                <Flex
                    justify="space-between"
                    align="center"
                >
                    <SwitchTheme />

                    <Button
                        id="logout_button"
                        px="8"
                        layerStyle="buttonGradient"
                        fontSize="18px"
                        onClick={() => logout(navigate)}
                    >
                        Cerrar Sesión
                    </Button>
                </Flex>

            </Flex>
        </header>
    )
}

export default Header