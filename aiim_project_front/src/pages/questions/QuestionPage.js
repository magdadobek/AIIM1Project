import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

import CommentSection from "../../components/comments/CommentSection";

const QuestionPage = (props) => {
    const [question, setQuestion] = useState([]);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    const params = useParams();

    const fetchComments = async () => {
        const response = await fetch('http://localhost:8000/api/qna/showComments/' + params.noticeId, {
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

        /*if (responseData.data === "brak ogloszen") {
            throw new Error('Nie znaleziono ogłoszenia o podanym id');
        }*/

        setComments(responseData.data);
        setIsLoading(false);
    }

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

            if (responseData.data === "brak pytania") {
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

    const handleBackToListPage = () => {
        window.location.href = '/questions';
    }

    const questionContent = (text) => text.split('\n').map(str => <p key={Math.random()}>{str}</p>);

    return (
        <div className="w-[800px] ">
            <div className="flex">
                <div className="mt-4 flex justify-start">
                    <button
                        className="border-2 border-light_menu hover:border-yellow_umg hover:text-yellow_umg focus:border-yellow_umg
                      focus:text-yellow_umg ring-light_menu dark:border-white dark:hover:border-yellow_umg dark:focus:border-dark_yellow_umg 
                        rounded-full shadow-md text-base px-2 py-1 duration-200 h-10"
                        onClick={handleBackToListPage}
                    >
                        <FaArrowLeft />
                    </button>
                </div>
                <div className="justify-start">
                    <p className="text-3xl font-bold m-4 text-left dark:text-dark_yellow_umg">{question.question_title}</p>
                </div>

            </div>
            <p className="text-base text-dark_field">Dodano przez <span className="dark:text-light_field">{question.author_nickname}</span> dnia {format(new Date(question.date), 'dd MMMM yyyy', { locale: pl })}</p>
            <div className="flex flex-col my-5">

                <p className="text-lg mx-3 my-5">{questionContent(question.question_content)}</p>
                <h2 className="text-xl my-5 font-bold dark:text-dark_yellow_umg">Tagi:</h2>
                <div className="flex space-x-4 mx-3 ">{question.tags.map((tag) => (
                    <div key={tag} className="border rounded-md py-1 px-2 border-light_menu dark:border-dark_field">{tag}</div>
                ))}
                </div>

                <CommentSection questionId={params.questionId} comments={comments} fetchComments={fetchComments} />

            </div>
        </div>


    )
}

export default QuestionPage;