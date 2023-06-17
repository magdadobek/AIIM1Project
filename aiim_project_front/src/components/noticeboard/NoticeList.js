import React from 'react'
import Notice from './Notice';

const NoticeList = (props) => {
    return (
        <div className="flex flex-col justify-center items-center">
            {props.noticeList.map((notice) => (
                <Notice key={notice.id} id={notice.id} title={notice.title} content={notice.content} date={notice.date} />
            ))}
        </div>
    )
}

export default NoticeList;
