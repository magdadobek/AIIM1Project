import React from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Chat = (props) => {

    const myRole = useSelector(state => state.user.account_type);
    const myId = useSelector(state => state.user.id);

    const navigate = useNavigate();

    const firstMessage = (message) => {
        if (!message) {
            return "Nowy czat";
        }
        if (message.content.length > 30) {
            return message.content.substring(0, 30) + "...";
        }
        return message.content;
    }

    const lastMessage = (message) => {
        if (!message) {
            return "Nowy czat";
        }

        let nickname = message.nickname;
        if (message.id_user === myId) {
            nickname = "Ty";
        }

        if (message.content.length > 30) {
            return nickname + ": " + message.content.substring(0, 30) + "...";
        }
        return nickname + ": " + message.content;
    }

    const lastMessageDate = (chat) => {
        if (!chat.lastMessagee) {
            return chat.created_at;
        }
        return chat.lastMessagee.send_at;
    }

    const assignToChat = async () => {
        const response = await fetch("https://foka.umg.edu.pl/~projgr2324md/AIIM1Project/aiim_project/public/api/chats/assignToChat", {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-TOKEN": "{{csrf_token()}}"
            },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
                chat_id: props.data.id
            })
        });

        const responseData = await response.json();

        if (responseData.status !== "success") {
            console.log(responseData.message)
        }

        navigate("/chats/" + props.data.id)

    }

    const closeChat = async () => {
        const response = await fetch("https://foka.umg.edu.pl/~projgr2324md/AIIM1Project/aiim_project/public/api/chats/closeChat/" + props.data.id, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-TOKEN": "{{csrf_token()}}"
            },
            body: JSON.stringify({
                token: localStorage.getItem('token')
            })
        });

        const responseData = await response.json();

        if (responseData.status !== "success") {
            console.log(responseData.message)
            return;
        }
        props.refreshChats();
    }

    return (
        <Link to={props.link}>
            <div>
                <div className="bg-light_field dark:bg-dark_page border-blue_umg dark:border-gold_umg text-base px-2 py-1 m-5 border-b-4">
                    <div className="flex justify-between">
                        <p className="text-xl font-bold mx-1 text-blue_umg dark:text-gold_umg">{firstMessage(props.data.firstMessage)}</p>
                        <div className="flex gap-2">
                            {(!props.data.id_guide && (myRole === "G" || myRole === "A")) && <button onClick={(e) => { e.preventDefault(); assignToChat(); }} className="text-base text-dark_field hover:dark:text-white hover:text-gold_umg">Dołącz jako wolontariusz</button>}
                            {(props.data.id_user === myId) && <button onClick={(e) => { e.preventDefault(); closeChat(); } } className="text-base text-dark_field hover:dark:text-white hover:text-gold_umg">Zamknij wątek</button>}
                        </div>
                    </div>
                    <div className="flex gap items-center">
                        <p className="text-base m-1 dark:text-white">{lastMessage(props.data.lastMessagee)}</p>
                        <p className="text-base text-dark_field">• {lastMessageDate(props.data)}</p>
                    </div>
                </div>
            </div>
        </Link>

    )
}

export default Chat;
