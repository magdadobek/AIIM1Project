import React from 'react'
import Chat from './Chat';

const ChatList = (props) => {
    return (
        <div>
            {props.chatList.map((chat) => (
                //<Notice key={notice.id} id={notice.id} title={notice.title} content={notice.content} date={notice.date} />
                <Chat key={chat.id} data={chat} link={`/chats/${chat.id}`}/>
            ))}
        </div>
    )
}

export default ChatList;
