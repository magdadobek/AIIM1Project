const QuestionForm = (props) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const tags = e.target.tags.value.replace(/,/g, ' ').split(' ').filter(el => el !== '')
        
        const request = {
            question_title: e.target.question_title.value,
            question_content: e.target.question_content.value,
            tags: tags,
            token: localStorage.getItem('token')
        };

        if(!props.question){
            const response = await fetch('http://localhost:8000/api/qna/new', {
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
            const response = await fetch(`http://localhost:8000/api/qna/${props.question.id}`, {
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
                <p className="text-3xl font-bold m-4 text-center dark:text-dark_yellow_umg">{props.notice ? 'Zaktualizuj pytanie' : 'Nowe pytanie'}</p>
                <p className="flex-col py-1">
                    <label htmlFor="question_title" className="text-xl font-bold m-5 dark:text-dark_field">Tytuł</label>
                    <input id="question_title" name="question_title" defaultValue={props.question ? props.question.question_title : ''} className="bg-light_field dark:bg-dark_field
                     border-light_menu dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-80" required />
                </p>
                <p className="flex-col py-1">
                    <label htmlFor="question_content" className="text-xl font-bold m-5 dark:text-dark_field">Treść</label>
                    <textarea id="question_content" name="question_content"  defaultValue={props.question ? props.question.question_content : ''} className="bg-light_field dark:bg-dark_field
                     border-light_menu dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-80 h-40" required />
                </p>
                <p className="flex-col py-1">
                    <label htmlFor="tags" className="text-xl font-bold m-5 dark:text-dark_field">Tagi</label>
                    <input id="tags" name="tags"  defaultValue={props.question ? props.question.tags : ''} className="bg-light_field dark:bg-dark_field border-light_menu
                     dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-80" required />
                </p>
                <div className="flex justify-between py-2 w-72">
                    <button className="text-light_menu dark:text-dark_component border-yellow_umg 
                    bg-yellow_umg border-2 hover:bg-dark_yellow_umg hover:border-dark_yellow_umg 
                    dark:bg-dark_yellow_umg dark:border-dark_yellow_umg dark:hover:border-yellow_umg 
                    dark:hover:bg-yellow_umg font-bold p-2 rounded-3xl text-base my-5 px-3 py-1 shadow-md 
                    shadow-gold_umg">
                        Opublikuj
                    </button>
                </div>
            </form>
        </div>
    );
}

export default QuestionForm;