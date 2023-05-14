const RegistrationForm = (props) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target.nickname.value);
        const request = {
            nickname: e.target.nickname.value,
            index: e.target.index.value,
            email: e.target.email.value,
            password: e.target.password.value,
            account_type: "A",
        };

        const response = await fetch('http://localhost:8000/api/user/new/', {
            method: 'POST',
            body: JSON.stringify(request)
        });
        console.log(response.ok);
        props.onRegistration(response.ok);
    }
    return (
        <>
            <form method="post" onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="nickname">Nazwa użytkownika</label>
                    <input id="nickname" name="nickname" required />
                </p>
                <p>
                    <label htmlFor="index">Indeks</label>
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