import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

import CommentSection from "../../components/comments/CommentSection";
import { useSelector } from "react-redux";

const QuestionPage = (props) => {
    const [question, setQuestion] = useState([]);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const user = useSelector(state => state.user);

    const params = useParams();

    const fetchComments = async () => {
        const response = await fetch('https://foka.umg.edu.pl/~projgr2324md/AIIM1Project/aiim_project/public/api/qna/showComments/' + params.questionId, {
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

        setComments(responseData.data);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchComments()
    }, [])

    useEffect(() => {
        const fetchQuestion = async () => {
            const response = await fetch('https://foka.umg.edu.pl/~projgr2324md/AIIM1Project/aiim_project/public/api/qna/' + params.questionId, {
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
        window.location.href = 'https://foka.umg.edu.pl/questions';
    }

    const handleDeleteQuestion = () => {

        const deleteQuestion = async () => {
            const response = await fetch('https://foka.umg.edu.pl/~projgr2324md/AIIM1Project/aiim_project/public/api/qna/delete/' + params.questionId, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-Requested-With": "XMLHttpRequest"
                }
            });

            if (!response.ok) {
                throw new Error('Coś poszło nie tak');
            } else {
                window.location.href = 'https://foka.umg.edu.pl/questions';
            }
        }

        deleteQuestion().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });

    }

    const handleUpdateQuestion = () => {
        window.location.href = `https://foka.umg.edu.pl/~projgr2324md/questions/update/${params.questionId}`;
    }
    const questionContent = (text) => text?.split('\n').map(str => <p key={Math.random()}>{str}</p>);

    return (
        <div className="w-[800px] ">
            <div className="w-full flex">
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
                <div className="flex-1">
                    <p className="text-3xl font-bold m-4 text-left dark:text-dark_yellow_umg">{question.question_title}</p>
                </div>
                <div className="m-4 ml-auto">
                    {user.id === question.id_user || user.account_type === 'admin' ? (
                        <>
                            <button
                                className="text-light_menu dark:text-dark_component border-yellow_umg bg-yellow_umg border-2 hover:bg-dark_yellow_umg hover:border-dark_yellow_umg
               dark:bg-dark_yellow_umg dark:border-dark_yellow_umg dark:hover:border-yellow_umg dark:hover:bg-yellow_umg font-bold p-2 rounded-3xl text-base px-3 py-1 
                 shadow-md shadow-gold_umg "
                                onClick={handleUpdateQuestion}
                            >
                                Zaktualizuj
                            </button>
                            <button
                                className="text-white dark:text-white border-danger_warring bg-danger_warring border-2 hover:bg-danger_hover hover:border-danger_hover
                dark:bg-danger_warring dark:border-danger_warring dark:hover:border-danger_hover dark:hover:bg-danger_hover font-bold p-2 rounded-3xl text-base px-3 py-1 
                shadow-md shadow-gold_umg "
                                onClick={handleDeleteQuestion}
                            >
                                Usuń
                            </button>
                        </>
                    ) : (
                        ('')
                    )}

                </div>
            </div>
            <p className="text-base text-dark_field">Dodano przez <span className="dark:text-light_field">{question.author_nickname}</span> dnia {question.date ? format(new Date(question.date), 'dd MMMM yyyy', { locale: pl }) : ""}</p>
            <div className="flex flex-col my-5">

                <div className="text-lg mx-3 my-5">{questionContent(question.question_content)}</div>
                <h2 className="text-xl my-5 font-bold dark:text-dark_yellow_umg">Tagi:</h2>

                <div className="flex space-x-4 mx-3 ">

                    {question.tags && question.tags.map((tag) => (
                        <div key={tag} className="border rounded-md py-1 px-2 border-light_menu dark:border-dark_field">{tag}</div>
                    ))}
                </div>

                <CommentSection questionId={params.questionId} comments={comments} fetchComments={fetchComments} />

            </div>
        </div>


    )
}

export default QuestionPage;