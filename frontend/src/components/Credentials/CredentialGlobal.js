import React, { useState } from 'react';

const CredentialGlobal = React.createContext();

export const MyContextProvider = ({ children }) => {
    const [userId, setGlobalVariable] = useState();

    const updateCredential = (newValue) => {
        setGlobalVariable(newValue);
    };

    return (
        <CredentialGlobal.Provider value={{ userId, updateCredential }}>
            {children}
        </CredentialGlobal.Provider>
    );
};

export default CredentialGlobal;