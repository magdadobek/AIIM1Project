import React from 'react'
import { Link } from 'react-router-dom';

const Chat = (props) => {
    const message = (message) => {
        if (!message) {
            return "Nowy czat";
        }
        if (message.content.length > 30) {
            return message.content.substring(0, 30) + "...";
        }
        return message.content;
    }

    const lastMessageDate = (chat) => {
        if (!chat.lastMessagee) {
            return chat.created_at;
        }
        return chat.lastMessagee.send_at;
    }
    return (
        <Link to={props.link}>
            <div>
                <div className="bg-light_field dark:bg-dark_page border-blue_umg dark:border-gold_umg text-base px-2 py-1 m-5 border-b-4">
                    <p className="text-xl font-bold mx-1 text-blue_umg dark:text-gold_umg">{message(props.data.firstMessage)}</p>
                    <div className="flex gap items-center">
                        <p className="text-base m-1 dark:text-white">{message(props.data.lastMessagee)}</p>
                        <p className="text-base text-dark_field">• {lastMessageDate(props.data)}</p>
                    </div>
                </div>
            </div>
        </Link>

    )
}

export default Chat;
