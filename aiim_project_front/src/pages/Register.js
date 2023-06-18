import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import RegistrationForm from "../components/auth/RegistrationForm";

const Register = () => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);

    const [hasRegistered, setHasRegistered] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [message, setMessage] = useState("");

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
            {(hasSubmitted && !hasRegistered) && message.map((el) => <p>{el}</p>)}
            {isLoggedIn && message}
        </div>
    );
}

export default Register;