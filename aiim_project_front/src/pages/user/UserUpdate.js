import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const UserUpdate = () => {
    const user = useSelector(state => state.user);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const [success, setSuccess] = useState();
    const [updatedUserData, setUpdatedUserData] = useState()

    const params = useParams();
    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('https://foka.umg.edu.pl/api/user/find/' + params.userId + '?' + new URLSearchParams({
                token: localStorage.getItem('token')
            }),
                {
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
            const fetchedUser = responseData.data

            setUpdatedUserData(fetchedUser);
            setIsLoading(false);
        };

        fetchUser().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, [])



    const handleSubmit = async () => {
        setSuccess(null)
        const request = {
            nickname: document.getElementById('nickname').value || updatedUserData.nickname,
            password: document.getElementById('password').value || null,
            index: document.getElementById('index').value || updatedUserData.index,
            email: document.getElementById('email').value || updatedUserData.email,
            account_type: document.getElementById('account_type').value || updatedUserData.account_type,
            token: localStorage.getItem('token'),
        };


        const response = await fetch("https://foka.umg.edu.pl/api/user/update/all/" + params.userId, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-TOKEN": "{{csrf_token()}}"
            },
            body: JSON.stringify(request)
        });

        if (!response.ok) {
            throw new Error('Coś poszło nie tak');
        }

        const responseData = await response.json();
        setSuccess(responseData.message)
    }


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
        <div className="flex flex-col justify-center items-center">
            <p className="text-3xl font-bold m-4 text-center dark:text-dark_yellow_umg">
                {user.account_type === "A"
                    ? `Zaktualizuj użytkownika: ${updatedUserData.nickname}`
                    : 'Zaktualizuj swój profil'}
            </p>

            <div className="flex-col py-1">
                <label htmlFor="nickname" className="text-xl font-bold m-5 dark:text-dark_field">
                    Nickname
                </label>
                <input
                    id="nickname"
                    name="nickname"
                    defaultValue={updatedUserData.nickname}
                    className="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-80 ml-3"
                    required
                />
            </div>

            <div className="flex-col py-1">
                <label htmlFor="password" className="text-xl font-bold m-5 dark:text-dark_field">
                    Nowe hasło *
                </label>
                <input
                    id="password"
                    name="password"
                    className="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-80 ml-3"
                />
            </div>

            {user.account_type === "A" && (
                <>
                    <div className="flex-col py-1">
                        <label htmlFor="index" className="text-xl font-bold m-5 dark:text-dark_field">
                            Indeks
                        </label>
                        <input
                            id="index"
                            name="index"
                            defaultValue={updatedUserData.index}
                            className="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-80 ml-3"
                            required
                        />
                    </div>

                    <div className="flex-col py-1">
                        <label htmlFor="email" className="text-xl font-bold m-5 dark:text-dark_field">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            defaultValue={updatedUserData.email}
                            className="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-80 ml-3"
                            required
                        />
                    </div>

                    <div className="flex-col py-1">
                        <label htmlFor="account_type" className="text-xl font-bold m-5 dark:text-dark_field ">
                            Typ konta
                        </label>
                        <input
                            id="account_type"
                            name="account_type"
                            defaultValue={updatedUserData.account_type}
                            className="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-80 ml-3"
                            required
                        />
                    </div>
                </>
            )}

            {success}
            <div className="flex items-center justify-center w-72 mx-auto">
                <button className="text-light_menu dark:text-dark_component border-yellow_umg 
        bg-yellow_umg border-2 hover:bg-dark_yellow_umg hover:border-dark_yellow_umg 
        dark:bg-dark_yellow_umg dark:border-dark_yellow_umg dark:hover:border-yellow_umg 
        dark:hover:bg-yellow_umg font-bold p-2 rounded-3xl text-base my-5 px-3 py-1 shadow-md 
        shadow-gold_umg"
                    onClick={handleSubmit}>
                    Zaktualizuj Profil
                </button>
            </div>
        </div>
    )
}