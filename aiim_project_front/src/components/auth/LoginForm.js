import React from 'react'
import { Link } from 'react-router-dom';

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
    <div class="bg-light_component dark:bg-dark_component text-light_menu dark:text-white justify-center p-6 rounded-3xl m-5 w-min shadow-lg">
      <form method="post" class="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
        <p class="text-3xl font-bold m-4 text-center dark:text-dark_yellow_umg">Logowanie</p>
        <div class="flex-col py-2">
          <label htmlFor="email" class="text-xl font-bold m-5 dark:text-dark_field">Email</label>
          <input id="email" type="email" name="email" class="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-72" required />
        </div>
        <div class="flex-col">
          <label htmlFor="password" class="text-xl font-bold m-5 dark:text-dark_field">Hasło</label>
          <input id="password" type="password" name="password" class="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-72" required />
        </div>
        <div class="flex justify-between text-sm py-2 w-64">
          <p class="flex items-center dark:text-gold_umg"><input class="m-2" type="checkbox" /> Zapamiętaj mnie</p>
          <p class="flex items-center text-gold_umg underline hover:text-yellow_umg">Zresetuj hasło</p>
        </div>
        <div class="flex justify-between py-2 w-64">
          <button class="text-light_menu dark:text-dark_component border-yellow_umg bg-yellow_umg border-2 hover:bg-dark_yellow_umg hover:border-dark_yellow_umg dark:bg-dark_yellow_umg dark:border-dark_yellow_umg dark:hover:border-yellow_umg dark:hover:bg-yellow_umg font-bold p-2 rounded-3xl text-base my-5 px-3 py-1 shadow-md shadow-gold_umg">
            Zaloguj się
          </button>
          <Link to="/rejestracja"class="text-light_menu border-light_menu border-2 hover:border-dark_yellow_umg hover:text-dark_yellow_umg dark:border-dark_field dark:text-dark_field dark:hover:border-dark_yellow_umg dark:hover:text-dark_yellow_umg font-bold p-2 rounded-3xl text-base my-5 px-3 py-1 shadow-md ">
            Zarejestruj się
          </Link>
        </div>
      </form>
    </div>
  )
}

export default LoginForm;
