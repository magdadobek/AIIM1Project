import React from 'react';
import { useSelector } from 'react-redux';

const Message = (props) => {
    const userId = useSelector(state => state.user.id);
    const isCurrentUser = props.message.id_user === userId;

    return (
        <div>
            <p className="flex text-base dark:text-white justify-center">{props.message.send_at}</p>
            <div className={`flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} items-center mb-2`}>
                <div className="flex items-center">
                    {!isCurrentUser && (
                        <div title={props.message.nickname} className="w-12 h-12 rounded-full border-2 border-light_menu dark:border-white flex items-center justify-center flex-shrink-0 mr-2">
                            {props.message.nickname.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div className={`flex border-2 border-light_menu dark:border-white rounded-3xl ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                        <p className="text-base m-3 dark:text-white">{props.message.content}</p>
                    </div>
                    {isCurrentUser && (
                        <div title={props.message.nickname} className="w-12 h-12 rounded-full border-2 border-light_menu dark:border-white flex items-center justify-center flex-shrink-0 ml-2">
                            {props.message.nickname.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Message;
