
import { Formik } from 'formik';
import { useState } from 'react';
import { Input, Text, Flex, Box, Button, Link, useToast } from '@chakra-ui/react';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/auth.context';
import { useAuthenticate } from '../hooks/useAuthenticate';

function Login () {
    const [isLoading, setLoading] = useState(false)
    const { setUser, setAuth } = useAuthContext();
    const navigate = useNavigate();
    const toast = useToast();
    const {userLogin} = useAuthenticate();


    const validationSchemaLogin = Yup.object({
      email: Yup.string()
        .email('Debe ser un correo válido')
        .required('El correo es obligatorio'),
      password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria'),
    });

    const onSubmit = async (values: { email: string; password: string; }) => {
        const response = await userLogin(values);

        if (!response?.auth) {
            return toast({
                title: response?.error,
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
        <div>
            <Flex  alignItems={'center'} justifyContent={'center'} flexDirection={'column'} height={'100vh'}>
                <Text
                    fontSize={28}
                    mb={5}
                >
                    Inicio de Sesión
                </Text>
                <Formik
                  initialValues={{ email: '', password: ''}}
                  validationSchema={validationSchemaLogin}
                  validateOnSubmit={true}
                  validateOnChange={false}
                  validateOnBlur={false}
                  onSubmit={onSubmit}
                >
                  {props => (
                    <form onSubmit={props.handleSubmit}>
                        <Input 
                            placeholder='email'
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
                            placeholder='password'
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
                                id='login_button'
                                colorScheme='green' 
                                p={5} 
                                type="submit"
                                isLoading={isLoading}
                            >
                                Entrar
                            </Button>
                            <Text fontSize={14}>
                                Aún no tienes una cuenta{' '}
                                <Link as={RouterLink} _hover={{ textDecoration: "underline" }} to="/register" color="blue.500">
                                    Registrarse
                                </Link>
                            </Text>
                        </Box>
                        
                    </form>
                  )}
                </Formik>
            </Flex>

            
        </div>
    )
}

export default Login