import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';

const ChatPage = (props) => {
    const [notice, setNotice] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    const params = useParams();

    useEffect(() => {
        const fetchNotice = async () => {
            const response = await fetch('http://localhost:8000/api/noticeboard/find/' + params.noticeId, {
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
        window.location.href = '/notices';
    }

    return (
        <div className="w-[800px] h-[700px]">
            <div className="flex justify-between">
                <div className="w-1/4">

                </div>
                <div className="w-2/4 items-center">
                    <p className="text-3xl font-bold m-4 text-center dark:text-dark_yellow_umg">{notice.title}</p>
                </div>
                <div className="w-1/4 mt-4 flex justify-end">
                    <button
                        className="border-2 border-light_menu hover:border-yellow_umg hover:text-yellow_umg focus:border-yellow_umg
                      focus:text-yellow_umg ring-light_menu dark:border-white dark:hover:border-yellow_umg dark:focus:border-dark_yellow_umg 
                        rounded-full shadow-md text-base px-2 py-1 duration-200 h-10"
                        onClick={handleBackToListPage}
                    >
                        <FaArrowLeft/>
                    </button>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center">
                <p className="text-base m-5 dark:text-dark_field">Dodano przez {notice.id_user} dnia {notice.date}</p>
                <p className="text-base m-5 dark:text-dark_field">{notice.content}</p>
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

export default ChatPage;