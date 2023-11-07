import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from 'react-redux';

import ChatList from "../../components/chats/ChatList";

const ChatBoard = () => {
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const myId = useSelector(state => state.user.id); //temp, endpoint powinien brac token a nie id


    const newChat = async () => {
        const response = await fetch('http://localhost:8000/api/chats/createChat', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
            body: JSON.stringify({
                id_user: myId
            })
        });
        console.log(response);
        if (!response.ok) {
            throw new Error('Coś poszło nie tak');
        }
        const responseData = await response.json();
        window.location.href = '/chats/' + responseData.data.id; // temp nie ma jeszcze endpointa chyba
    }

    useEffect(() => {
        
        const fetchChats = async () => {
            console.log(localStorage.getItem('token')   );
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
            console.log(responseData);
            const fetchedChats = responseData.data.map((chat) => {
                return {
                    id: chat.id,
                    id_user: chat.id_user,
                    id_guide: chat.id_guide,
                    closed_at: chat.closed_at,
                    created_at: chat.created_at,
                    edited_at: chat.edited_at,
                    open: chat.open,
                    to_close: chat.to_close
                }
            });

            
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
                    <button
                        onClick={newChat}
                        className="text-light_menu 
                        dark:text-dark_component border-yellow_umg bg-yellow_umg border-2 
                        hover:bg-dark_yellow_umg hover:border-dark_yellow_umg dark:bg-dark_yellow_umg 
                        dark:border-dark_yellow_umg dark:hover:border-yellow_umg dark:hover:bg-yellow_umg 
                        font-bold p-2 rounded-3xl text-base my-5 px-3 py-1 shadow-md shadow-gold_umg"
                    >
                        Nowy czat
                    </button>
                </div>
            </div>
            <ChatList chatList={chats} />
        </div>
    )
}

export default ChatBoard;