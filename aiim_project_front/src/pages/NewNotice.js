import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import NoticeForm from "../components/noticeboard/NoticeForm";

const NewNotice = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [message, setMessage] = useState("Aby dodać ogłoszenie musisz być zalogowany");

  const onSubmit = (responseData) => {
    setHasSubmitted(true);
    //dodac logike dodawania ogloszenia jak backend zrobi odpowiedni endpoint
  }

  return (
    <div>
      {(isLoggedIn) && <NoticeForm onSubmit={onSubmit} />}
      {(isLoggedIn && hasSubmitted) && message}
      {!isLoggedIn && message}
    </div>
  )
}

export default NewNotice
