import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import NoticeList from "../components/noticeboard/NoticeList";


const NoticeBoard = () => {
    const [noticeList, setNoticeList] = useState([]);

    const getNotices = async () => {
        const response = await fetch('http://localhost:8000/api/noticeboard/allOpen', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }
        });
        const responseData = await response.json();

        const noticeArray = responseData.data.data.map((notice) => {
            return {
                id: notice.id,
                title: notice.title,
                content: notice.content,
                date: notice.date,
                id_user: notice.id_user,
                open: notice.open,
                tags: notice.tags
            }
        });
        setNoticeList(noticeArray);
    }

    useEffect(() => {
        getNotices();
    }, []);

    return (
        <div>
            <p className="text-3xl font-bold m-4 text-center dark:text-dark_yellow_umg">Tablica ogłoszeń</p>
            <NoticeList noticeList={noticeList} />
            <div className="flex justify-between py-2 w-64">
                <Link to="/ogloszenia/nowe" className="text-light_menu dark:text-dark_component border-yellow_umg bg-yellow_umg border-2 hover:bg-dark_yellow_umg hover:border-dark_yellow_umg dark:bg-dark_yellow_umg dark:border-dark_yellow_umg dark:hover:border-yellow_umg dark:hover:bg-yellow_umg font-bold p-2 rounded-3xl text-base my-5 px-3 py-1 shadow-md shadow-gold_umg">
                    Dodaj ogłoszenie
                </Link>
            </div>
        </div>

    )
}

export default NoticeBoard;