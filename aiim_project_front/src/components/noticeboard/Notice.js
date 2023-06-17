import React from 'react'
import { Link } from 'react-router-dom';

const Notice = (props) => {
    
    return (
        <Link to={`/ogloszenia/${props.id}`}>
        <div className="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-96 m-5">
            <p className="text-xl font-bold m-5 dark:text-dark_field">{props.title}</p>
            <p className="text-base m-5 dark:text-dark_field">{props.content}</p>
            <p className="text-base m-5 dark:text-dark_field">{props.date}</p>
        </div>
        </Link>
    )
}

export default Notice;
