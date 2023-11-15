import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ChatList from "../../components/chats/ChatList";

const ChatBoard = () => {
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    const navigate = useNavigate();

    const newChat = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/chats/createChat', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
                message: e.target.content.value
            })
        });
        console.log(response);
        if (!response.ok) {
            throw new Error('Coś poszło nie tak');
        }
        const responseData = await response.json();

        navigate('/chats/' + responseData.data_chat.id)
    }

    useEffect(() => {

        const fetchChats = async () => {
            const response = await fetch('http://localhost:8000/api/chats/showChats?' + new URLSearchParams({
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

            const fetchedChats = responseData.data;

            setChats(fetchedChats);
            setIsLoading(false);
        }

        fetchChats().catch((error) => {
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
                <p className="text-3xl font-bold m-4 text-center dark:text-dark_yellow_umg">Szybka pomoc</p>
                <div className="flex flex-1 justify-end">
                    {/*<button
                        onClick={newChat}
                        className="text-light_menu 
                        dark:text-dark_component border-yellow_umg bg-yellow_umg border-2 
                        hover:bg-dark_yellow_umg hover:border-dark_yellow_umg dark:bg-dark_yellow_umg 
                        dark:border-dark_yellow_umg dark:hover:border-yellow_umg dark:hover:bg-yellow_umg 
                        font-bold p-2 rounded-3xl text-base my-5 px-3 py-1 shadow-md shadow-gold_umg"
                    >
                        Nowy czat
                    </button>*/}
                </div>
            </div>
            <form method="post" className="flex flex-col justify-center items-center" onSubmit={newChat}>
                <div className="w-full px-3  flex items-center">
                    <textarea
                        className="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field rounded border-2 leading-normal resize-none w-full h-12 py-2 mx-2 px-3 focus:outline-none"
                        id="content" name="content" placeholder='Nowy czat' required>
                    </textarea>
                    <button className="text-light_menu dark:text-dark_component border-yellow_umg bg-yellow_umg border-2 hover:bg-dark_yellow_umg hover:border-dark_yellow_umg dark:bg-dark_yellow_umg dark:border-dark_yellow_umg dark:hover:border-yellow_umg dark:hover:bg-yellow_umg font-bold p-2 rounded-3xl text-base mx-2 px-3 py-1 shadow-md shadow-gold_umg">
                        Wyślij
                    </button>
                </div>
            </form>
            <ChatList chatList={chats} />
        </div>
    )
}

export default ChatBoard;