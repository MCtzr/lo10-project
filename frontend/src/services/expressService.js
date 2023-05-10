
const path = 'http://localhost:8080/api/ArtMatch'

export const createUser = (body) => {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    fetch(path + '/users', requestOptions)
        .then(response => response.json())
}

export const modifyUser = (body, userId) => {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    fetch(path + `/users/${userId}`, requestOptions)
        .then(response => response.json())
}

export const verifyId = async (body) => {
    try {
        const response = await fetch(path + `/users/${body.userId}/${body.password}`);
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const getAccountInfos = async (userId) => {
    try {
        const response = await fetch(path + `/users/${userId}`);
        const data = await response.json();
        return data[0][0];
    } catch (error) {
        console.error(error);
        return false;
    }
}