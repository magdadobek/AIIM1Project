import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowLeft } from 'react-icons/fa';

import Message from "../../components/chats/Message";

const ChatPage = (props) => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const params = useParams();

    const userId = useSelector(state => state.user.id);

    const fetchMessages = async () => {
        const response = await fetch('https://foka.umg.edu.pl/~projgr2324md/AIIM1Project/aiim_project/public/api/chats/' + params.chatId + '/messages?' + new URLSearchParams({
            token: localStorage.getItem('token')
        }), {
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

        if (responseData.data === "brak czatu") {
            throw new Error('Nie znaleziono czatu o podanym id');
        }

        setMessages(responseData.data);
        setIsLoading(false);
    }
    

    useEffect(() => {
        fetchMessages().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });

        const intervalId = setInterval(fetchMessages, 5000);

        return () => clearInterval(intervalId);
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

    const sendMessage = async (e) => {
        e.preventDefault();
        const tempMessage = {
            content: e.target.content.value,
            id: Math.floor(Math.random() * 1000),
            id_user: userId,
            send_at: "wysyłanie...",
            isSending: true
        };

        setMessages(messages.concat(tempMessage));

        const response = await fetch('https://foka.umg.edu.pl/~projgr2324md/AIIM1Project/aiim_project/public/api/chats/sendMessage', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
                chat_id: params.chatId,
                content: e.target.content.value
            })
        });

        if (!response.ok) {
            throw new Error('Coś poszło nie tak');
        }

        e.target.content.value = "";

        fetchMessages().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }

    return (
        <div className="flex flex-col justify-between w-[800px] h-full">
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

            <div className="flex flex-col justify-between">
                <p className="text-2xl font-bold m-4 text-center dark:text-dark_yellow_umg">Wiadomości</p>
                <div className=" overflow-auto mx-4 my-2">
                    {messages.map((message) => (
                        <Message key={message.id} message={message} />
                    ))}

                </div>

            </div>
            <form method="post" className="flex flex-col justify-center items-center" onSubmit={sendMessage}>
                <div className="w-full px-3 my-2 flex items-center">
                    <textarea
                        className="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field rounded border-2 leading-normal resize-none w-full h-12 py-2 mx-2 px-3 focus:outline-none"
                        id="content" name="content" placeholder='Nowa wiadomość' required>
                    </textarea>
                    <button className="text-light_menu dark:text-dark_component border-yellow_umg bg-yellow_umg border-2 hover:bg-dark_yellow_umg hover:border-dark_yellow_umg dark:bg-dark_yellow_umg dark:border-dark_yellow_umg dark:hover:border-yellow_umg dark:hover:bg-yellow_umg font-bold p-2 rounded-3xl text-base mx-2 px-3 py-1 shadow-md shadow-gold_umg">
                        Wyślij
                    </button>
                </div>
            </form>
        </div>

    )
}

export default ChatPage;