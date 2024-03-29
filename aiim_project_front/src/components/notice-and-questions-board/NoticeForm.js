const NoticeForm = (props) => {

    const formatDate = (date) => {
        return new Date(date).toISOString().split('T')[0];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tags = e.target.tags.value.replace(/,/g, ' ').split(' ').filter(el => el !== '')

        const request = {
            date: formatDate(new Date()),
            title: e.target.title.value,
            content: e.target.content.value,
            tags: tags,
            token: localStorage.getItem('token')
        };

        if(!props.notice){
            const response = await fetch('https://foka.umg.edu.pl/~projgr2324md/AIIM1Project/aiim_project/public/api/noticeboard/new/', {
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
        }else{
            const response = await fetch(`https://foka.umg.edu.pl/~projgr2324md/AIIM1Project/aiim_project/public/api/noticeboard/${props.notice.id}`, {
                method: 'PATCH',
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


    }
    return (
        <div >
            <form method="post" className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                <p className="text-3xl font-bold m-4 text-center dark:text-dark_yellow_umg">{props.notice ? 'Zaktualizuj ogłoszenie' : 'Nowe ogłoszenie'}</p>
                <p className="flex-col py-1">
                    <label htmlFor="title" className="text-xl font-bold m-5 dark:text-dark_field">Tytuł</label>
                    <input id="title" name="title" defaultValue={props.notice ? props.notice.title : ''} className="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-80" required />
                </p>
                <p className="flex-col py-1">
                    <label htmlFor="content" className="text-xl font-bold m-5 dark:text-dark_field">Treść</label>
                    <textarea id="content" name="content" defaultValue={props.notice ? props.notice.content : ''} className="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-80 h-40" required />
                </p>
                <p className="flex-col py-1">
                    <label htmlFor="tags" className="text-xl font-bold m-5 dark:text-dark_field">Tagi</label>
                    <input id="tags" name="tags" defaultValue={props.notice ? props.notice.tags : ''} className="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-80" required />
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