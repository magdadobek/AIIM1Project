import { useState } from "react";

import RegistrationForm from "../components/auth/RegistrationForm";



const Register = () => {
    const  [hasRegistered, setHasRegistered]  = useState(false);
    const  [hasSubmitted, setHasSubmitted] = useState(false);

    const onRegistrationComplete = (result) => {
        setHasSubmitted(true);
        setHasRegistered(result);
        
    }

    return (
        <div>
            <h1>Rejestracja</h1>
            {(!hasSubmitted && !hasRegistered) && <RegistrationForm onRegistration={onRegistrationComplete} />}
            {(hasSubmitted && !hasRegistered) && <p>Wystąpił błąd przy rejestracji</p>}
            {(hasSubmitted && hasRegistered) && <p>Zarejestrowano pomyślnie</p>}
        </div>
    );
}

export default Register;