import React from 'react'
import Notice from './Notice';

const NoticeList = (props) => {
    return (
        <div>
            {props.noticeList.map((notice) => (
                <Notice key={notice.id} data={notice} link={`/notices/${notice.id}`}/>
            ))}
        </div>
    )
}

export default NoticeList;
