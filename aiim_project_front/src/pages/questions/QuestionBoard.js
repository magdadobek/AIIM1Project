import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import QuestionList from "../../components/notice-and-questions-board/QuestionList.js";


const QuestionBoard = () => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await fetch('http://localhost:8000/api/qna', {
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

            const fetchedQuestions = responseData.data.map((question) => {
                return {
                    id: question.id,
                    title: question.question_title,
                    content: question.question_content,
                    date: question.date,
                    id_user: question.id_user,
                    open: question.open,
                    tags: question.tags
                }
            });
            setQuestions(fetchedQuestions);
            setIsLoading(false);
        }

        fetchQuestions().catch((error) => {
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
        <div className="w-[800px]">
            <div className="flex justify-between items-center">
                <div className="flex flex-1">
                </div>
                <p className="text-3xl font-bold m-4 text-center dark:text-dark_yellow_umg">Najczęściej zadawane pytania</p>
                <div className="flex flex-1 justify-end">
                    <Link
                        to="/questions/new"
                        className="text-light_menu 
                        dark:text-dark_component border-yellow_umg bg-yellow_umg border-2 
                        hover:bg-dark_yellow_umg hover:border-dark_yellow_umg dark:bg-dark_yellow_umg 
                        dark:border-dark_yellow_umg dark:hover:border-yellow_umg dark:hover:bg-yellow_umg 
                        font-bold p-2 rounded-3xl text-base my-5 px-3 py-1 shadow-md shadow-gold_umg"
                    >
                        Zadaj pytanie
                    </Link>
                </div>
            </div>
            <QuestionList questionList={questions} />
        </div>
    )
}

export default QuestionBoard;