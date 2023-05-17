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
        <>
            <form method="post" onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="nickname">Nazwa użytkownika</label>
                    <input id="nickname" name="nickname" required />
                </p>
                <p>
                    <label htmlFor="index">Indeks studenta</label>
                    <input id="index" name="index" required />
                </p>
                <p>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" required />
                </p>
                <p>
                    <label htmlFor="password">Hasło</label>
                    <input id="password" type="password" name="password" required />
                </p>
                <button>
                    Zarejestruj się
                </button>
            </form>
        </>
    );
}

export default RegistrationForm;