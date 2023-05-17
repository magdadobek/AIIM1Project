import { useState } from "react";

import RegistrationForm from "../components/auth/RegistrationForm";

const Register = () => {
    const [hasRegistered, setHasRegistered] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [message, setMessage] = useState("");

    const onRegistrationComplete = (responseData) => {
        setHasSubmitted(true);
        if (responseData.status === "success") {
            setHasRegistered(true);
            setMessage("Zarejestrowano jako " + responseData.user.nickname)
        }
        else if (responseData.message === "Validation errors") {
            setMessage(Object.entries(responseData.data).map((e) => e[1]))
        }
        else setMessage(responseData.message)
    }

    return (
        <div>
            <h1>Rejestracja</h1>
            <RegistrationForm onRegistration={onRegistrationComplete} />
            {(hasSubmitted && hasRegistered) && message}
            {(hasSubmitted && !hasRegistered) && message.map((el) => <p>{el}</p>)}
        </div >
    );
}