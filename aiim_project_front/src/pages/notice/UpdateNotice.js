import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NoticeForm from "../../components/notice-and-questions-board/NoticeForm";

export const UpdateNotice = (props) =>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notice, setNotice] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  const params = useParams();

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [message, setMessage] = useState("Aby zaktualizować ogłoszenie musisz być zalogowany");

  useEffect(() => {
    const fetchNotice = async () => {
        const response = await fetch('https://foka.umg.edu.pl/~projgr2324md/AIIM1Project/aiim_project/public/api/noticeboard/find/' + params.noticeId, {
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

        if (responseData.data === "brak ogloszen") {
            throw new Error('Nie znaleziono ogłoszenia o podanym id');
        }

        setNotice(responseData.data.data);
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
      setMessage("Zaktualizowano ogłoszenie");
      navigate("/notices");
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
      {(isLoggedIn) && <NoticeForm onSubmit={onSubmit} notice={notice}/>}
      {(isLoggedIn && hasSubmitted) && message}
    </div>
  )
}