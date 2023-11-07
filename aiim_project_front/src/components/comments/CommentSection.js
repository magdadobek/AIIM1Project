import React from 'react'
import { useState } from "react";
import { useParams } from "react-router-dom";
import Comment from './Comment';

const CommentSection = (props) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedCommentId, setEditedCommentId] = useState(); 
    const [httpError, setHttpError] = useState();
    const params = useParams();

    const getMyId = () => { //rozwiazanie tymczasowe
        const localUser = localStorage.getItem("user");
        if (localUser) {
            return JSON.parse(localUser).id;
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEditing) {
            handleEdit(e);
            setIsEditing(false);
            setEditedCommentId(null);
            return;
        }

        let requestUrl = 'http://localhost:8000/api/comments/new/';
        if (props.questionId) {
            requestUrl = 'http://localhost:8000/api/qna/comments/new/';
        }

        const request = {
            content: e.target.content.value,
            token: localStorage.getItem('token'),
            id_notice: props.noticeId,
            id_question: props.questionId,
            //uwaga sraka   
            id_user: getMyId(),
            edited: false,
            date: new Date()
        };

        const response = await fetch(requestUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-TOKEN": "{{csrf_token()}}"
            },
            body: JSON.stringify(request)
        });

        const responseData = await response.json();

        if (responseData.status !== "success") {
            setHttpError(responseData.message)
        }

        props.fetchComments().catch((error) => {
            setHttpError(error.message);
        });

        e.target.content.value = "";
    }

    const handleEdit = async (e) => {
        e.preventDefault();

        let requestUrl = 'http://localhost:8000/api/comments/';
        if (props.questionId) {
            requestUrl = 'http://localhost:8000/api/qna/comments/';
        }

        const request = {
            content: e.target.content.value,
            token: localStorage.getItem('token'),
            id_notice: props.noticeId,
            id_question: props.questionId,
            //uwaga sraka   
            id_user: getMyId(),
            edited: true,
            date: new Date()
        };

        const response = await fetch(requestUrl + editedCommentId, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-TOKEN": "{{csrf_token()}}"
            },
            body: JSON.stringify(request)
        });

        const responseData = await response.json();

        if (responseData.status !== "success") {
            setHttpError(responseData.message)
        }

        props.fetchComments().catch((error) => {
            setHttpError(error.message);
        });

        e.target.content.value = "";
    }

    const startEditing = (comment) => {
        setIsEditing(true);
        setEditedCommentId(comment.id);
        document.getElementById('content').value = comment.content;
    }


    return (
        <div>
            <h2 className="text-xl my-5 font-bold dark:text-dark_yellow_umg">Komentarze ({props.comments.length}):</h2>

            <div className="flex flex-col">
                {props.comments.map((comment) => (
                    <Comment onEdit={() => startEditing(comment)} key={comment.id} comment={comment} />
                ))}
                <form method="post" className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                    <div className="w-full px-3 my-3">
                        <textarea
                            className="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field rounded border-2 leading-normal resize-none w-full h-20 py-2 px-3 focus:outline-none"
                            id="content" name="content" placeholder='Komentarz' required></textarea>
                    </div>
                    <div className="w-full flex justify-end px-3">
                        <button className="text-light_menu dark:text-dark_component border-yellow_umg bg-yellow_umg border-2 hover:bg-dark_yellow_umg hover:border-dark_yellow_umg dark:bg-dark_yellow_umg dark:border-dark_yellow_umg dark:hover:border-yellow_umg dark:hover:bg-yellow_umg font-bold p-2 rounded-3xl text-base  px-3 py-1 shadow-md shadow-gold_umg">
                            Opublikuj
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CommentSection;
