import { useState } from "react";

import LoginForm from "../components/auth/LoginForm";
//{(hasSubmitted && hasRegistered) && message}
//{(hasSubmitted && !hasRegistered) && message.map((el) => <p>{el}</p>)}
const Login = () => {
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const onLogin = (responseData) => {
    setHasSubmitted(true);
    if (responseData.status === "success") {
      setHasLoggedIn(true);
      setMessage("Zalogowano jako " + responseData.user.nickname);
    }
    else if (responseData.message === "Unauthorized") {
      setMessage("Niepoprawne dane logowania");
    }
    else if (responseData.message === "Validation errors") {
      setMessage(Object.entries(responseData.data).map((e) => e[1]));
    }
    else setMessage(responseData.message);
  }
  return (
    <div>
      <h1>Logowanie</h1>
      <LoginForm onLogin={onLogin} />
      {(hasSubmitted && hasLoggedIn) && message}
      {(hasSubmitted && !hasLoggedIn) && message.map((el) => <p>{el}</p>)}
    </div>
  )
}

export default Login
