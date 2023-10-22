import React from 'react'
import Question from './Question';

const QuestionList = (props) => {
    return (
        <div>
            {props.questionList.map((question) => (
                <Question key={question.id} id={question.id} title={question.title} content={question.content} date={question.date} />
            ))}
        </div>
    )
}

export default QuestionList;
