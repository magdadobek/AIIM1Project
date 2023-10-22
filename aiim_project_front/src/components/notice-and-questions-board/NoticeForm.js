const NoticeForm = (props) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const request = {
            title: e.target.title.value,
            content: e.target.content.value,
            tags: JSON.stringify(e.target.tags.value),
            token: localStorage.getItem('token')
        };

        const response = await fetch('http://localhost:8000/api/noticeboard/new/', {
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
        props.onSubmit(responseData);

    }
    return (
        <div >
            <form method="post" className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                <p className="text-3xl font-bold m-4 text-center dark:text-dark_yellow_umg">Nowe ogłoszenie</p>
                <p className="flex-col py-1">
                    <label htmlFor="title" className="text-xl font-bold m-5 dark:text-dark_field">Tytuł</label>
                    <input id="title" name="title" className="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-80" required />
                </p>
                <p className="flex-col py-1">
                    <label htmlFor="content" className="text-xl font-bold m-5 dark:text-dark_field">Treść</label>
                    <textarea id="content" name="content" className="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-80 h-40" required />
                </p>
                <p className="flex-col py-1">
                    <label htmlFor="tags" className="text-xl font-bold m-5 dark:text-dark_field">Tagi</label>
                    <input id="tags" name="tags" className="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-80" required />
                </p>
                <div className="flex justify-between py-2 w-72">
                    <button className="text-light_menu dark:text-dark_component border-yellow_umg bg-yellow_umg border-2 hover:bg-dark_yellow_umg hover:border-dark_yellow_umg dark:bg-dark_yellow_umg dark:border-dark_yellow_umg dark:hover:border-yellow_umg dark:hover:bg-yellow_umg font-bold p-2 rounded-3xl text-base my-5 px-3 py-1 shadow-md shadow-gold_umg">
                        Opublikuj
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NoticeForm;