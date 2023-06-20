import React from 'react'
import { Link } from 'react-router-dom';

const Notice = (props) => {

    return (
        <Link to={`/ogloszenia/${props.id}`}>
            <div className="bg-light_field dark:bg-dark_page border-blue_umg dark:border-gold_umg text-base px-2 py-1 m-5 border-b-4">
                <p className="text-xl font-bold m-5 text-blue_umg dark:text-gold_umg">{props.title}</p>
                <p className="text-base m-5 dark:text-white">{props.content}</p>
            </div>
        </Link>
    )
}

export default Notice;
