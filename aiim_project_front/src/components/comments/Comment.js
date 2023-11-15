import React from 'react'

const getMyId = () => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
        return JSON.parse(localUser).id;
    }
}
const Comment = (props) => {
    return (
        <div key={props.comment.id} className="border rounded-md p-3 mx-3 my-3 border-light_menu dark:border-dark_field">
            <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                    <p className="font-bold">{props.comment.author_nickname}</p>
                    <p className="text-dark_field ">{props.comment.date}</p>
                    { props.comment.edited && <p className="text-dark_field ">Edytowano</p>}
                </div>
                <div className="flex gap-3 items-center">
                    { props.comment.id_user === getMyId() && <button onClick={props.onEdit} className="flex justify-end text-dark_field">Edytuj</button>}
                    { props.comment.id_user === getMyId() && <button onClick={props.onDelete} className="flex justify-end text-dark_field">Usuń</button>}
                </div>
                
                
            </div>
            <p className="text-base mt-2">{props.comment.content}</p>
        </div>
    )
}

export default Comment;
