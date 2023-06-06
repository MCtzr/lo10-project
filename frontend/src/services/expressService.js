import { useContext } from 'react';
import CredentialGlobal from '../components/Credentials/CredentialGlobal';

const useExpressService = () => {
    const { token } = useContext(CredentialGlobal);

    const path = 'http://localhost:8080/api/ArtMatch'

    const createUser = async (body) => {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        const response = await fetch(path + '/users', requestOptions);
        const data = await response.json();
        return data;
    }

    const modifyUser = async (body, userId) => {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token.accessToken}` },
            body: JSON.stringify(body)
        };
        const response = await fetch(path + `/users/${userId}`, requestOptions);
        const data = await response.json();
        return data;
    }

    const verifyId = async (body) => {
        try {
            const response = await fetch(path + `/authentify/${body.userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password: body.password })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const getAccountInfos = async (userId) => {
        try {
            const response = await fetch(path + `/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.accessToken}`
                }
            });
            const data = await response.json();
            return data[0][0];
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    return {
        createUser,
        modifyUser,
        verifyId,
        getAccountInfos
    };
}

export default useExpressService;