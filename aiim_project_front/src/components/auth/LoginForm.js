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
    <div class="bg-light_component dark:bg-dark_component p-6 rounded-3xl m-5 w-min shadow-lg">
      <form method="post" class="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
      <p class="text-3xl font-bold m-4 text-center">Logowanie</p>
        <p class="flex-col">
          <label htmlFor="email" class="text-xl font-bold m-5">Email</label>
          <input id="email" type="email" name="email" class="bg-light_field dark:bg-dark_field border-light_menu border-2 rounded-3xl shadow-md text-base px-2 py-1 w-60" required />
        </p>
        <p class="flex-col">
          <label htmlFor="password" class="text-xl font-bold m-5">Hasło</label>
          <input id="password" type="password" name="password" class="bg-light_field dark:bg-dark_field border-light_menu border-2 rounded-3xl shadow-md text-base px-2 py-1 w-60" required />
        </p>
        <button class="hover:bg-yellow_umg border-light_menu border-2 hover:border-gold_umg hover:text-gold_umg dark:bg-dark_component p-2 rounded-3xl text-base m-5 px-3 py-1 shadow-md">
          Zaloguj się
        </button>
      </form>
    </div>
  )
}

export default LoginForm;
