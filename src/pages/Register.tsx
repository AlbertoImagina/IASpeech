import { Flex, Box, Text, Input, Button, Link, useToast } from "@chakra-ui/react"
import { Formik } from 'formik';
import { useNavigate } from "react-router-dom";
import { useAuthenticate } from '../hooks/useAuthenticate';
import { Link as RouterLink } from 'react-router-dom'
import * as Yup from 'yup';

function Register() {
    const toast = useToast();
    const navigate = useNavigate();
    const { userRegister } = useAuthenticate()

    const validationSchemaRegister = Yup.object({
        name: Yup.string()
            .required('El nombre es obligatorio')
            .min(2, 'El nombre debe tener al menos 2 caracteres'),
        lastName: Yup.string()
            .required('El apellido es obligatorio')
            .min(2, 'El apellido debe tener al menos 2 caracteres'),
        email: Yup.string()
            .required('El correo electrónico es obligatorio')
            .email('Debe ser un correo electrónico válido'),
        password: Yup.string()
            .required('La contraseña es obligatoria')
            .min(8, 'La contraseña debe tener al menos 8 caracteres')
            .matches(/[a-z]/, 'La contraseña debe tener al menos una letra minúscula')
            .matches(/[A-Z]/, 'La contraseña debe tener al menos una letra mayúscula')
            .matches(/[0-9]/, 'La contraseña debe tener al menos un número'),
        confirmPassword: Yup.string()
            .required('Debe confirmar la contraseña')
            .test(
                'passwords-match',
                'Las contraseñas deben coincidir',
                function (value) {
                    return value === this.parent.password;
                }
            ),
        phone: Yup.string()
            .required('El teléfono es obligatorio')
            .matches(/^[6789]\d{8}$/, 'El teléfono debe tener exactamente 9 dígitos y comenzar con 6, 7, 8 o 9'),
    });

    const onSubmit = async (
        values: {
            email: string;
            password: string;
            name: string;
            lastName: string;
            phone: string;
            confirmPassword?: string;
        }) => {
        const { confirmPassword, ...filteredValues } = values;

        const { data } = await userRegister({
            ...filteredValues,
            telefono: String(filteredValues?.phone)
        })

        if (data && data?.email === filteredValues?.email) {
            navigate("/")

            return toast({
                title: `El registro de ${data?.name} fue exitoso.`,
                status: 'success',
            })
        }

        toast({
            title: `Error al registrar al usuario ${filteredValues?.email}, vuelva a intentarlo.`,
            status: 'error',
        })
    }

    return (
        <>
            <Flex
                display='flex'
                flexDirection='column'
                alignItems="center"
                justifyContent='center'
                w='100vw'
                h='100vh'
            >
                <Text
                    mb="5"
                    fontSize="24px"
                    fontWeight="extrabold"
                    bgGradient='linear(to-l, #A052EE, #6645E7)'
                    bgClip="text"
                >Registro</Text>
                <Formik
                    initialValues={{ name: '', lastName: '', email: '', password: '', confirmPassword: '', phone: '' }}
                    validationSchema={validationSchemaRegister}
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
                                w='50vw'
                                >
                                <Input
                                    id="name"
                                    placeholder="Nombre"
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.name}
                                    name="name"
                                >
                                </Input>
                                <Text
                                    opacity={props.errors.name ? 1 : 0}
                                    color="red.500"
                                    fontSize="12px"
                                    mt="3px"
                                >
                                    {props.errors.name}
                                </Text>

                                <Input
                                    id="lastName"
                                    placeholder="Apellidos"
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.lastName}
                                    name="lastName"
                                >
                                </Input>
                                <Text
                                    opacity={props.errors.lastName ? 1 : 0}
                                    color="red.500"
                                    fontSize="12px"
                                    mt="3px"
                                >
                                    {props.errors.lastName}
                                </Text>

                                <Input
                                    id="email"
                                    placeholder="Correo"
                                    type="email"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.email}
                                    name="email"
                                >
                                </Input>
                                <Text
                                    opacity={props.errors.email ? 1 : 0}
                                    color="red.500"
                                    fontSize="12px"
                                    mt="3px"
                                >
                                    {props.errors.email}
                                </Text>

                                <Input
                                    id="password"
                                    placeholder="Contraseña"
                                    type="password"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.password}
                                    name="password"
                                >
                                </Input>
                                <Text
                                    opacity={props.errors.password ? 1 : 0}
                                    color="red.500"
                                    fontSize="12px"
                                    mt="3px"
                                >
                                    {props.errors.password}
                                </Text>

                                <Input
                                    id="confirmPassword"
                                    placeholder="Repite contraseña"
                                    type="password"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.confirmPassword}
                                    name="confirmPassword"
                                >
                                </Input>
                                <Text
                                    opacity={props.errors.confirmPassword ? 1 : 0}
                                    color="red.500"
                                    fontSize="12px"
                                    mt="3px"
                                >
                                    {props.errors.confirmPassword}
                                </Text>

                                <Input
                                    id="phone"
                                    type="tel"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.phone}
                                    name="phone"
                                    maxLength={9}
                                    placeholder="Teléfono"
                                >
                                </Input>
                                <Text
                                    opacity={props.errors.phone ? 1 : 0}
                                    color="red.500"
                                    fontSize="12px"
                                    mt="3px"
                                >
                                    {props.errors.phone}
                                </Text>

                                <Box
                                    display='flex'
                                    alignItems='center'
                                    flexDirection='column'
                                    gap='5'
                                    mt='5'>
                                    <Button
                                        id="register_button"
                                        type="submit"
                                        bgGradient='linear(to-l, #A052EE, #6645E7)'
                                        color="white"
                                        _hover={{ bgGradient: 'linear(to-l, #6645E7)', bgClip: "text" }}
                                    >
                                        Registrarse
                                    </Button>

                                </Box>
                            </Box>
                        </form>
                    )}
                </Formik>
                <Text
                    fontSize='14'
                    mt='10px'
                >
                    ¿Ya tienes una cuenta?,{' '}
                    <Link
                        as={RouterLink}
                        _hover={{ textDecoration: "underline" }}
                        to="/"
                        color="blue.500"
                    >
                        Haz login aqui
                    </Link>

                </Text>
            </Flex>
        </>
    )
}

export default Register