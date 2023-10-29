import React from 'react'
import Notice from './Notice';

const QuestionList = (props) => {
    return (
        <div>
            {props.questionList.map((question) => (
                <Notice data={question} link={`/questions/${question.id}`}/>
            ))}
        </div>
    )
}

export default QuestionList;
