
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

export const verifyId = async (body) => {
    try {
        const response = await fetch(path + `/users/${body.userId}/${body.password}`);
        const data = await response.json();
        console.log(data)
        return data.result;
    } catch (error) {
        console.error(error);
        return false;
    }
}