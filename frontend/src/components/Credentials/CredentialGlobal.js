import React, { useState } from 'react';

const CredentialGlobal = React.createContext();

export const MyContextProvider = ({ children }) => {
    const [userId, setGlobalVariable] = useState();
    const [token, setToken] = useState();

    const updateCredential = (newValue) => {
        setGlobalVariable(newValue);
    };

    const updateToken = (newValue) => {
        setToken(newValue);
    };

    const contextValue = {
        userId,
        updateCredential,
        token,
        updateToken
    };

    return (
        <CredentialGlobal.Provider value={contextValue}>
            {children}
        </CredentialGlobal.Provider>
    );
};

export default CredentialGlobal;