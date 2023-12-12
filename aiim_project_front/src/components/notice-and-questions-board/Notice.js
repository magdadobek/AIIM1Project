import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Notice = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const [deleteUrl, setDeleteUrl] = useState();
    const user = useSelector(state => state.user);


    useEffect(() => {
        //console.log('key', props.data)
        if (props.link === `/questions/${props.data.id}`) {
            setDeleteUrl('https://foka.umg.edu.pl/~projgr2324md/AIIM1Project/aiim_project/public/api/qna/delete/')
        } else {
            setDeleteUrl('https://foka.umg.edu.pl/~projgr2324md/AIIM1Project/aiim_project/public/api/noticeboard/delete/')
        }
    }, [props.link])

    const handleDeleteQuestion = () => {

        const deleteQuestion = async () => {
            const response = await fetch(deleteUrl + props.data.id, {
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


    return (
        <Link to={props.link}>
            <div className="bg-light_field dark:bg-dark_page border-blue_umg dark:border-gold_umg text-base px-2 py-1 m-5 border-b-4">
                <div className="w-full flex">
                    <div className="flex justify-start">
                        <p className="text-xl font-bold m-5 text-blue_umg dark:text-gold_umg">{props.data.title}</p>
                    </div>
                    <div className="m-4 ml-auto">
                        {user.account_type === "A" && (
                            <button
                                className="text-white dark:text-white border-danger_warring bg-danger_warring border-2 hover:bg-danger_hover hover:border-danger_hover
            dark:bg-danger_warring dark:border-danger_warring dark:hover:border-danger_hover dark:hover:bg-danger_hover font-bold p-2 rounded-3xl text-base px-3 py-1 
            shadow-md shadow-gold_umg "
                                onClick={handleDeleteQuestion}
                            >
                                Usuń
                            </button>
                        )}
                    </div>
                </div>
                <p className="text-base m-5 dark:text-white">{props.data.content}</p>
                {httpError}
            </div>
        </Link>

    )
}

export default Notice;
