import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import RegistrationForm from "../components/auth/RegistrationForm";

const Register = () => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);

    const [hasRegistered, setHasRegistered] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [message, setMessage] = useState();

    useEffect(() => {
        if (isLoggedIn) {
            setMessage("Jesteś już zarejestrowany/a");
        };
    }, [isLoggedIn]);

    const onRegistrationComplete = (responseData) => {
        setHasSubmitted(true);
        if (responseData.status === "success") {
            setHasRegistered(true);
            setMessage("Zarejestrowano jako " + responseData.user.nickname)
            setTimeout(() => {
                window.location.href = 'https://foka.umg.edu.pl/~projgr2324md/login';
            }, 3000);
        }
        else if (responseData.message === "Validation errors") {
            setMessage(Object.entries(responseData.data).map((e) => e[1]))
        }
        else setMessage(responseData.message)
    }

    return (
        <div>
            {!isLoggedIn && <RegistrationForm onRegistration={onRegistrationComplete} />}
            {(hasSubmitted && hasRegistered) && message}
            {(hasSubmitted && !hasRegistered) && Array.isArray(message) ? message.map((el) => <p>{el}</p>) : <p>{message}</p>}
            {isLoggedIn && message}
        </div>
    );
}

export default Register;