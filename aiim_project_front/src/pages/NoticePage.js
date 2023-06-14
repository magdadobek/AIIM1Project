import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const NoticePage = (props) => {
    const [notice, setNotice] = useState([]);

    const params = useParams();

    const getNotice = async () => {
        const response = await fetch('http://localhost:8000/api/noticeboard/find/' + params.noticeId, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }
        });
        const responseData = await response.json();

        setNotice(responseData.data.data);
    }

    useEffect(() => {
        getNotice();
    }, []);

    return (
        <div className="md:container md:mx-auto">
            <div className="bg-light_component dark:bg-dark_component text-light_menu dark:text-white justify-center p-6 rounded-3xl m-5 w-min shadow-lg">
                <p className="text-3xl font-bold m-4 text-center dark:text-dark_yellow_umg">{notice.title}</p>
                <div className="flex flex-col justify-center items-center">
                    <p className="text-base m-5 dark:text-dark_field">Dodano przez {notice.id_user} dnia {notice.date}</p>
                    <p className="text-base m-5 dark:text-dark_field">{notice.content}</p>
                    <p className="text-base m-5 dark:text-dark_field">Tagi: Test, test</p>
                    <p className="text-base m-5 dark:text-dark_field">Komentarze:</p>
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-base m-1 dark:text-dark_field">Komentarz 1</p>
                        <p className="text-base m-1 dark:text-dark_field">Komentarz 2</p>
                        <p className="text-base m-1 dark:text-dark_field">Komentarz 3</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default NoticePage;