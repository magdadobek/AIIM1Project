import React from 'react'

const LoginForm = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = new URL('http://localhost:8000/api/user/login/');
    url.searchParams.append('email', e.target.email.value);
    url.searchParams.append('password', e.target.password.value);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": "{{csrf_token()}}"
      }
    });

    const responseData = await response.json();
    console.log(responseData);
    props.onLogin(responseData);

  }
  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="password">Hasło</label>
          <input id="password" type="password" name="password" required />
        </p>
        <button>
          Zaloguj się
        </button>
      </form>
    </>
  )
}

export default LoginForm;
