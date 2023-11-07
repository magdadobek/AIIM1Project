import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';

const ChatPage = (props) => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const chat = {};
    const params = useParams();

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await fetch('http://localhost:8000/api/chats/' + params.chatId + '/messages', {
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

            console.log(responseData);
            if (responseData.data === "brak czatu") {
                throw new Error('Nie znaleziono czatu o podanym id');
            }

            setMessages(responseData.data);
            setIsLoading(false);
        }
        fetchMessages().catch((error) => {
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
        window.location.href = '/chats';
    }

    return (
        <div className="w-[800px] h-[700px]">
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
                    <p className="text-3xl font-bold m-4 text-left dark:text-dark_yellow_umg">Czat</p>
                </div>

            </div>

            <div className="flex flex-col justify-center items-center">
                <p className="text-2xl font-bold m-4 text-center dark:text-dark_yellow_umg">Wiadomości</p>
                <div className="w-[600px] h-[500px] overflow-y-scroll">
                    {messages.map((message) => (
                        <div key={message.id} className="flex justify-between items-center">
                            <div className="flex flex-1">
                                <p className="text-base m-5 dark:text-white">{message.content}</p>
                            </div>
                            <p className="text-base m-5 dark:text-white">{message.created_at}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default ChatPage;