import axios from "axios";

const registrationUsuario = async () => {
    try {
        const respuesta = await axios.post('https://reqres.in/api/register', {
            email: 'eve.holt@reqres.in',
            password: 'pistol'
        });
        console.log('Registro exitoso:', respuesta.data);
    } catch (error) {
        console.error('Error en el registro:', error.response.data);
    }
};

registrationUsuario();