const RegistrationForm = (props) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const request = {
            nickname: e.target.nickname.value,
            index: e.target.index.value,
            email: e.target.email.value,
            password: e.target.password.value
        };

        const response = await fetch('http://localhost:8000/api/user/new/', {
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
        console.log(responseData);
        props.onRegistration(responseData);

    }
    return (
        <div class="bg-light_component dark:bg-dark_component text-light_menu dark:text-white justify-center p-6 rounded-3xl m-5 w-min shadow-lg">
            <form method="post" class="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                <p class="text-3xl font-bold m-4 text-center dark:text-dark_yellow_umg">Rejestracja</p>
                <p class="flex-col py-1">
                    <label htmlFor="nickname" class="text-xl font-bold m-5 dark:text-dark_field">Nazwa użytkownika</label>
                    <input id="nickname" name="nickname" class="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-80" required />
                </p>
                <p class="flex-col py-1">
                    <label htmlFor="index" class="text-xl font-bold m-5 dark:text-dark_field">Indeks studenta</label>
                    <input id="index" name="index" class="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-80" required />
                </p>
                <p class="flex-col py-1">
                    <label htmlFor="email" class="text-xl font-bold m-5 dark:text-dark_field">Email</label>
                    <input id="email" type="email" name="email" class="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-80" required />
                </p>
                <p class="flex-col py-1">
                    <label htmlFor="password" class="text-xl font-bold m-5 dark:text-dark_field">Hasło</label>
                    <input id="password" type="password" name="password" class="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-80" required />
                </p>
                <div class="flex justify-between py-2 w-72">
                    <button class="text-light_menu dark:text-dark_component border-yellow_umg bg-yellow_umg border-2 hover:bg-dark_yellow_umg hover:border-dark_yellow_umg dark:bg-dark_yellow_umg dark:border-dark_yellow_umg dark:hover:border-yellow_umg dark:hover:bg-yellow_umg font-bold p-2 rounded-3xl text-base my-5 px-3 py-1 shadow-md shadow-gold_umg">
                        Zarejestruj się
                    </button>
                    <a href="/logowanie" class="text-light_menu border-light_menu border-2 hover:border-dark_yellow_umg hover:text-dark_yellow_umg dark:border-dark_field dark:text-dark_field dark:hover:border-dark_yellow_umg dark:hover:text-dark_yellow_umg font-bold p-2 rounded-3xl text-base my-5 px-3 py-1 shadow-md ">
                        Mam już konto
                    </a>
                </div>
            </form>
        </div>
    );
}

export default RegistrationForm;