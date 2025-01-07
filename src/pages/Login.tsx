
import { Formik } from 'formik';
import { useState } from 'react';
import { Input, Text, Flex, Box, Button, Link, useToast } from '@chakra-ui/react';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/auth.context';
import { useAuthenticate } from '../hooks/useAuthenticate';

function Login() {
    const [isLoading, setLoading] = useState(false)
    const { setUser, setAuth } = useAuthContext();
    const navigate = useNavigate();
    const toast = useToast();
    const { userLogin } = useAuthenticate();


    const validationSchemaLogin = Yup.object({
        email: Yup.string()
            .email('Debe ser un correo válido')
            .required('El correo es obligatorio'),
        password: Yup.string()
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .required('La contraseña es obligatoria'),
    });

    const onSubmit = async (values: { email: string; password: string; }) => {
        setLoading(true)
        const response = await userLogin(values);

        if (!response?.auth) {
            setLoading(false)
            return toast({
                title: 'Error autenticación',
                description: response?.error,
                status: 'error',
            })
        }

        localStorage?.setItem("auth", response?.auth.toString())
        localStorage?.setItem("user", JSON.stringify(response?.user))
        setUser(response?.user)
        setAuth(true)
        setLoading(false)

        navigate("/home")
    }

    return (
        <Flex
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            height='100vh'
            boxShadow="xl"
        >
            <Text
                fontSize="24px"
                fontWeight="extrabold"
                mb='5'
                bgGradient='linear(to-l, #A052EE, #6645E7)'
                bgClip="text"
            >
                Iniciar Sesión
            </Text>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchemaLogin}
                validateOnSubmit={true}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={onSubmit}
            >
                {props => (
                    <form onSubmit={props.handleSubmit}>
                        <Box
                            display='flex'
                            flexDirection='column'
                            gap='3px'
                            minW="268px"
                        >
                            <Input
                                placeholder='Correo'
                                id='email'
                                type="email"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.email}
                                name="email"
                            />
                            <Text
                                opacity={props.errors.email ? 1 : 0}
                                color="red.500"
                                fontSize="12px"
                                mt="3px"
                            >
                                {props.errors.email}
                            </Text>

                            <Input
                                placeholder='Contraseña'
                                id='password'
                                type="password"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.password}
                                name="password"
                            />

                            <Text
                                opacity={props.errors.password ? 1 : 0}
                                color="red.500"
                                fontSize="12px"
                                mt="3px"
                            >
                                {props.errors.password}
                            </Text>
                            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} mt={5} gap={3} flexDirection={'column'}>
                                <Button
                                    w="100%"
                                    id='login_button'
                                    bgGradient='linear(to-l, #A052EE, #6645E7)'
                                    color="white"
                                    p='5'
                                    type="submit"
                                    isLoading={isLoading}
                                >
                                    Entrar
                                </Button>

                            </Box>

                        </Box>
                    </form>
                )}
            </Formik>
            <Box
                display='flex'
                flexDirection='column'
                mt='10px'
                gap='4px'
                alignItems='center'
            >
                <Text
                    fontSize='14'
                    bgGradient='linear(to-l, #A052EE, #6645E7)'
                    bgClip='text'
                    mt='10px'
                >
                    ¿Aún no tienes una cuenta?{' '}
                </Text>
                <Link
                    as={RouterLink}
                    _hover={{ textDecoration: "underline" }}
                    to="/register"
                    fontSize='12px'
                    color='white'
                >
                    Regístrate ahora
                </Link>
            </Box>

        </Flex>
    )
}

export default Login