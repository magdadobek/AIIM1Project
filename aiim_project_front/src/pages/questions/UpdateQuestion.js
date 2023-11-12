import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import QuestionForm from "../../components/notice-and-questions-board/QuestionFrom";


export const UpdateQuestion = (props) =>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [question, setQuestion] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  const params = useParams();

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [message, setMessage] = useState("Aby zaktualizować pytanie musisz być zalogowany");

  useEffect(() => {
    const fetchNotice = async () => {
        const response = await fetch('http://localhost:8000/api/qna/' + params.questionId, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }
        });

        if (!response.ok) {
            throw new Error('Coś poszło nie tak');
        }

        const responseData = await response.json();

        if (responseData.data === "brak pytania") {
            throw new Error('Nie znaleziono pytania o podanym id');
        }

        setQuestion(responseData.data);
        setIsLoading(false);
    }

    fetchNotice().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
    });

}, []);

  const onSubmit = (responseData) => {
    setHasSubmitted(true);
    if (responseData.status === "success") {
      setMessage("Zaktualizowano pytanie");
      navigate("/qyestions");
    }
    else setMessage(responseData.message)
  }

  if (isLoading) {
    return (
        <div>
            <p>Ładowanie...</p>
        </div>
    );
}

  if (!isLoggedIn) {
    return (
      <div>
        {message}
      </div>
    )
  }

if (httpError) {
    return (
        <div>
            <p>{httpError}</p>
        </div>
    );
}


  return (
    <div>
      {(isLoggedIn) && <QuestionForm onSubmit={onSubmit} question={question}/>}
      {(isLoggedIn && hasSubmitted) && message}
    </div>
  )
}