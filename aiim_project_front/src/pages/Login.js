import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const nickname = useSelector(state => state.user.nickname);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("Zalogowano jako " + nickname);
  }, [nickname]);

  const onLogin = (responseData) => {
    setHasSubmitted(true);
    if (responseData.status === "success") {
      setMessage("Zalogowano jako " + responseData.user.nickname);
      localStorage.setItem('token', responseData.authorisation.token);
      localStorage.setItem('user', JSON.stringify(responseData.user));
      const payload = {
        nickname: responseData.user.nickname,
        id: responseData.user.id,
        index: responseData.user.index,
        email: responseData.user.email,
        password: responseData.user.password,
        account_type: responseData.user.account_type,
        isLoggedIn: true,
        token: responseData.authorisation.token
      }
      dispatch({ type: "user/login", payload: payload });

      setTimeout(() => {
        window.location.href = 'https://foka.umg.edu.pl/~projgr2324md';
    }, 3000);
      //dodac czas wygasniecia tokena
    }
    else if (responseData.message === "Unauthorized" || responseData.message === "Validation errors") {
      setMessage("Niepoprawne dane logowania");
    }
    else setMessage(responseData.message);
  }
  return (
    <div>
      {(!isLoggedIn) && <LoginForm onLogin={onLogin} />}
      {(!isLoggedIn && hasSubmitted) && message}
      {isLoggedIn && message}
    </div>
  )
}

export default Login
