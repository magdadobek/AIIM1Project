import { useSelector } from "react-redux";

export const UserProfil = () => {
    const user = useSelector(state => state.user);

    const handleUpdate = (id) => {
        window.location.href = `/profil/update/${id}`;
      }
      
    return (
        <>
        <div className="flex flex-col justify-center items-center">
            <p className="text-3xl font-bold m-4 text-center dark:text-dark_yellow_umg">
                Nickname : {user.nickname}
            </p>
            <p className="text-3xl font-bold m-4 text-center dark:text-dark_yellow_umg">
                Indeks : {user.index}
            </p>
            <p className="text-3xl font-bold m-4 text-center dark:text-dark_yellow_umg">
                Email : {user.email}
            </p>
            <button
                    className="text-light_menu dark:text-dark_component border-yellow_umg bg-yellow_umg border-2 hover:bg-dark_yellow_umg hover:border-dark_yellow_umg
               dark:bg-dark_yellow_umg dark:border-dark_yellow_umg dark:hover:border-yellow_umg dark:hover:bg-yellow_umg font-bold p-2 rounded-3xl text-base px-3 py-1 
                 shadow-md shadow-gold_umg"
                    onClick={() => handleUpdate(user.id)}
                  >
                    Zaktualizuj
                  </button>
        </div>
        </>
    )
}