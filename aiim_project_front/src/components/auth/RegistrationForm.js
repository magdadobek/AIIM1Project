import { useState } from 'react';
import { Link } from 'react-router-dom';

const RegistrationForm = (props) => {

    const [validError, setValidError] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const request = {
            nickname: e.target.nickname.value,
            index: e.target.index.value,
            email: e.target.email.value,
            password: e.target.password.value,
            token: localStorage.getItem('token'),
        };

        const emailRegex = /@student\.umg\.edu\.pl$/;
        if (!emailRegex.test(request.email)) {
            setValidError("Nieprawidłowy email")
        }else(
            setValidError(null)
        )

        const response = await fetch('https://foka.umg.edu.pl/api/user/new/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-TOKEN": "{{csrf_token()}}"
            },
            body: JSON.stringify(request)
        });

        const responseData = await response.json();
        //console.log(responseData);
        props.onRegistration(responseData);

    }
    return (
        <div>
            <form method="post" className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                <p className="text-3xl font-bold m-4 text-center dark:text-dark_yellow_umg">Rejestracja</p>
                <p className="grid grid-col-1 py-1">
                    <label htmlFor="nickname" className="text-xl font-bold mx-5 dark:text-dark_field">Nazwa użytkownika</label>
                    <input id="nickname" name="nickname" className="bg-light_field dark:bg-dark_field border-light_menu 
                    dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-80" required />
                </p>
                <p className="grid grid-col-1 py-1">
                    <label htmlFor="index" className="text-xl font-bold mx-5 dark:text-dark_field">Indeks studenta</label>
                    <input id="index" name="index" className="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field 
                    border-2 rounded-3xl shadow-md text-base px-2 py-1 w-80" required />
                </p>
                <p className="grid grid-col-1 py-1">
                    <label htmlFor="email" className="text-xl font-bold mx-5 dark:text-dark_field">Email</label>
                    <input id="email" type="email" name="email" className="bg-light_field dark:bg-dark_field border-light_menu
                     dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-80" required />
                </p>
                <p className="grid grid-col-1 py-1">
                    <label htmlFor="password" className="text-xl font-bold mx-5 dark:text-dark_field">Hasło</label>
                    <input id="password" type="password" name="password" className="bg-light_field dark:bg-dark_field border-light_menu
                     dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-80" required />
                </p>
                <div className="flex justify-between py-2 w-72">
                    <button className="text-light_menu dark:text-dark_component border-yellow_umg bg-yellow_umg border-2 hover:bg-dark_yellow_umg
                     hover:border-dark_yellow_umg dark:bg-dark_yellow_umg dark:border-dark_yellow_umg dark:hover:border-yellow_umg dark:hover:bg-yellow_umg
                       font-bold p-2 rounded-3xl text-base my-5 px-3 py-1 shadow-md shadow-gold_umg duration-200">
                        Zarejestruj się
                    </button>
                    <Link to="/logowanie" className="text-light_menu border-light_menu border-2 hover:border-dark_yellow_umg
                     hover:text-dark_yellow_umg dark:border-dark_field dark:text-dark_field dark:hover:border-dark_yellow_umg
                     dark:hover:text-dark_yellow_umg font-bold p-2 rounded-3xl text-base my-5 px-3 py-1 shadow-md duration-200">
                        Mam już konto
                    </Link>
                </div>
            </form>
            {validError}
        </div>
    );
}

export default RegistrationForm;