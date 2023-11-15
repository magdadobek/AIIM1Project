import React from 'react';
import { useSelector } from 'react-redux';

const Message = (props) => {
    const userId = useSelector(state => state.user.id);
    console.log(userId)
    return (
        <div key={props.message.id} >
        <p className="flex text-base dark:text-white justify-center">{props.message.send_at}</p>
        <div className="flex justify-between">
            {props.message.id_user === userId && <p></p>}
            <div className="flex border-2 rounded-3xl justify-end">
                <p className="text-base m-3 dark:text-white ">{props.message.content}</p>
            </div>
            {props.message.id_user !== userId && <p></p>}
        </div>
    </div>
    );
}
export default Message;