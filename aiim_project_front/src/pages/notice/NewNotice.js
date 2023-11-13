import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import NoticeForm from "../../components/notice-and-questions-board/NoticeForm.js";


import { useNavigate } from "react-router-dom";

const NewNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [message, setMessage] = useState("Aby dodać ogłoszenie musisz być zalogowany");

  const onSubmit = (responseData) => {
    setHasSubmitted(true);
    if (responseData.status === "success") {
      setMessage("Dodano ogłoszenie");
      navigate("/notices");
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
      {(isLoggedIn) && <NoticeForm onSubmit={onSubmit}/>}
      {(isLoggedIn && hasSubmitted) && message}
    </div>
  )
}

export default NewNotice
