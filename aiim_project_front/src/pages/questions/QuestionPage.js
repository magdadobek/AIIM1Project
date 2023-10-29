import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const QuestionPage = (props) => {
    const [question, setQuestion] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    const params = useParams();

    useEffect(() => {
        const fetchQuestion = async () => {
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

            if (responseData.data==="brak pytania") {
                throw new Error('Nie znaleziono pytania o podanym id');
            }

            setQuestion(responseData.data);
            setIsLoading(false);
        }
        fetchQuestion().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    if (isLoading) {
        return (
            <div>
                <p>Ładowanie...</p>
            </div>
        );
    }

    if (httpError) {
        return (
            <div>
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div className="w-[800px] h-[700px]">
            <p className="text-3xl font-bold m-4 text-center dark:text-dark_yellow_umg">{question.question_title}</p>
            <div className="flex flex-col justify-center items-center">
                <p className="text-base m-5 dark:text-dark_field">Dodano przez {question.id_user} dnia {question.date}</p>
                <p className="text-base m-5 dark:text-dark_field">{question.question_content}</p>
                <p className="text-base m-5 dark:text-dark_field">Tagi: Test, test</p>
                <p className="text-base m-5 dark:text-dark_field">Komentarze:</p>
                <div className="flex flex-col justify-center items-center">
                    <p className="text-base m-1 dark:text-dark_field">Komentarz 1</p>
                    <p className="text-base m-1 dark:text-dark_field">Komentarz 2</p>
                    <p className="text-base m-1 dark:text-dark_field">Komentarz 3</p>
                </div>
            </div>
        </div>

    )
}

export default QuestionPage;