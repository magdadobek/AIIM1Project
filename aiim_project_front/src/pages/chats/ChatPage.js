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

    const sendMessage = async (e) => {
        //setMessages(messages+nowyMEssage)
        e.preventDefault();
        const newMessage = {
            content: e.target.content.value,
            token: localStorage.getItem('token'),
            id: Math.floor(Math.random() * 1000),
            id_user: localStorage.getItem('id'),
            send_at: new Date().toTimeString().slice(0, 8)
        };

        setMessages(messages.concat(newMessage));


        //window.location.href = '/chats/' + params.chatId;
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
                <div className=" overflow-auto s">
                    {messages.map((message) => (
                        <div key={message.id} >
                            <p className="flex text-base dark:text-white justify-center">{message.send_at}</p>
                            <div className="flex justify-between">
                                <p></p>
                                <div className="flex border-2 rounded-3xl justify-end">
                                    <p className="text-base m-3 dark:text-white">{message.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                </div>

            </div>
            <form method="post" className="flex flex-col justify-center items-center" onSubmit={sendMessage}>
                <div className="w-full px-3 my-3">
                    <textarea
                        className="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field rounded border-2 leading-normal resize-none w-full h-20 py-2 px-3 focus:outline-none"
                        id="content" name="content" placeholder='Komentarz' required></textarea>
                </div>
                <div className="w-full flex justify-end px-3">
                    <button className="text-light_menu dark:text-dark_component border-yellow_umg bg-yellow_umg border-2 hover:bg-dark_yellow_umg hover:border-dark_yellow_umg dark:bg-dark_yellow_umg dark:border-dark_yellow_umg dark:hover:border-yellow_umg dark:hover:bg-yellow_umg font-bold p-2 rounded-3xl text-base  px-3 py-1 shadow-md shadow-gold_umg">
                        Wyślij
                    </button>
                </div>
            </form>
        </div>

    )
}

export default ChatPage;