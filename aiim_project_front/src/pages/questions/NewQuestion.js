import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import QuestionForm from "../../components/notice-and-questions-board/QuestionFrom.js";

const NewQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [message, setMessage] = useState("Aby dodać pytanie musisz być zalogowany");

  const onSubmit = (responseData) => {
    setHasSubmitted(true);
    if (responseData.status === "success") {
      setMessage("Dodano pytanie");
      navigate("/questions");
    }
    else setMessage(responseData.message)
  }

  if (!isLoggedIn) {
    return (
      <div>
        {message}
      </div>
    )
  }

  return (
    <div>
      {(isLoggedIn) && <QuestionForm onSubmit={onSubmit}/>}
      {(isLoggedIn && hasSubmitted) && message}
    </div>
  )
}

export default NewQuestion
