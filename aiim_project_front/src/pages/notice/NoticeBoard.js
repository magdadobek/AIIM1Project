import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import NoticeList from "../../components/notice-and-questions-board/NoticeList";


const NoticeBoard = () => {
    const [notices, setNotices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchNotices = async () => {
            const response = await fetch('https://foka.umg.edu.pl/~projgr2324md/AIIM1Project/aiim_project/public/api/noticeboard/allOpen', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-Requested-With": "XMLHttpRequest"
                }
            });

            if (!response.ok) {
                throw new Error('Coś poszło nie tak');
            }

            const responseData = await response.json();
            
            const fetchedNotices = responseData.data.data.map((notice) => {
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
            setNotices(fetchedNotices);
            setIsLoading(false);
        }

        fetchNotices().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    if (isLoading) {
        return (
            <div>
                <p>Ładowanie...</p>
            </div>
        );
    }

    if (httpError) {
        return (
            <div>
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div className="w-[800px]">
            <div className="flex justify-between items-center">
                <div className="flex flex-1">
                </div>
                <p className="text-3xl font-bold m-4 text-center dark:text-dark_yellow_umg">Tablica ogłoszeń</p>
                <div className="flex flex-1 justify-end">
                    <Link
                        to="/notices/new"
                        className="text-light_menu 
                        dark:text-dark_component border-yellow_umg bg-yellow_umg border-2 
                        hover:bg-dark_yellow_umg hover:border-dark_yellow_umg dark:bg-dark_yellow_umg 
                        dark:border-dark_yellow_umg dark:hover:border-yellow_umg dark:hover:bg-yellow_umg 
                        font-bold p-2 rounded-3xl text-base my-5 px-3 py-1 shadow-md shadow-gold_umg"
                    >
                        Dodaj ogłoszenie
                    </Link>
                </div>
            </div>
            <NoticeList noticeList={notices} />
        </div>
    )
}

export default NoticeBoard;