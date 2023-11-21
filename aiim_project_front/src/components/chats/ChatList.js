import React from 'react'
import Chat from './Chat';

const ChatList = (props) => {
    const refreshChats = (id) => {
        props.setChats(props.chatList.filter(chat => chat.id !== id))
    }

    return (
        <div>
            {props.chatList.map((chat) => (
                <Chat refreshChats={() => refreshChats(chat.id)} key={chat.id} data={chat} link={`/chats/${chat.id}`}/>
            ))}
        </div>
    )
}

export default ChatList;
