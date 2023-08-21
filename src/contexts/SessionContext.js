import { createContext, useState } from 'react';
import React from 'react';

const SessionContext = createContext();

export function AuthProvider({ children }) {
    const sessionParse = JSON.parse(localStorage.getItem('session'));
    const [session, setSession] = useState(sessionParse);

    function signIn(user) {
        setSession(user);
        localStorage.setItem('session', JSON.stringify(user));
    }

    function signOut() {
        setSession(undefined);
        localStorage.removeItem('session');
    }

    return (
        <SessionContext.Provider value={{ session, signIn, signOut }}>
            {children}
        </SessionContext.Provider>
    );
}

export default SessionContext;

//para usar o context:
//vá para o componente/pagina que vai consumir o context
//import useSession from '../hooks/useSession.js'
//const { session, signIn, signOut } = useSession();