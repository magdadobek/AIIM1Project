import React from 'react'
import Notice from './Notice';

const NoticeList = (props) => {
    return (
        <div>
            {props.noticeList.map((notice) => (
                //<Notice key={notice.id} id={notice.id} title={notice.title} content={notice.content} date={notice.date} />
                <Notice data={notice} link={`/notices/${notice.id}`}/>
            ))}
        </div>
    )
}

export default NoticeList;
