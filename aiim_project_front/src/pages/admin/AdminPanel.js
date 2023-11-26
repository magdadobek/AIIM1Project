import { useEffect, useState } from "react";

export const AdminPanel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [users, setUsers] = useState()

  useEffect(() => {

    const fetchChats = async () => {
      const response = await fetch('http://localhost:8000/api/user/findAll?' + new URLSearchParams({
        token: localStorage.getItem('token')
      }), {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Brak autoryzacji');

        } else {
          throw new Error('Coś poszło nie tak');
        }
      }

      const responseData = await response.json();

      const fetchedUsers = responseData.data;

      setUsers(fetchedUsers)

      setIsLoading(false);
    }

    fetchChats().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <div>
        <p>Ładowanie...</p>
      </div>
    );
  }

  if (httpError) {
    return (
      <div>
        <p>{httpError}</p>
      </div>
    );
  }

  const handleUpdate = (id) => {
    window.location.href = `/profil/update/${id}`;
  }

  const handleDelete = (id) => {
    const deleteUser = async () => {
      const response = await fetch('http://localhost:8000/api/user/delete/' + id + '?' + new URLSearchParams({
        token: localStorage.getItem('token')
      }), {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        }
      });

      if (!response.ok) {
        if(response.status === 500){
          throw new Error('Użytkowni ma pytania, czaty lub, ogłoszenia w aplikacji');
        }else{
          throw new Error('Coś poszło nie tak');
        }
      }else{
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
      }
    }

    deleteUser().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }



  return (
    <>
      <div className="w-[800px] h-[700px]  overflow-auto">
        <table>
          <thead>
            <tr>
              <th>Nickname</th>
              <th>Indeks</th>
              <th>Email</th>
              <th>Typ konta</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.nickname}</td>
                <td>{user.index}</td>
                <td>{user.email}</td>
                <td>{user.account_type}</td>
                <td>
                  <button
                    className="text-light_menu dark:text-dark_component border-yellow_umg bg-yellow_umg border-2 hover:bg-dark_yellow_umg hover:border-dark_yellow_umg
               dark:bg-dark_yellow_umg dark:border-dark_yellow_umg dark:hover:border-yellow_umg dark:hover:bg-yellow_umg font-bold p-2 rounded-3xl text-base px-3 py-1 
                 shadow-md shadow-gold_umg"
                    onClick={() => handleUpdate(user.id)}
                  >
                    Zaktualizuj
                  </button>

                  <button
                    className="text-white dark:text-white border-danger_warring bg-danger_warring border-2 hover:bg-danger_hover hover:border-danger_hover
                dark:bg-danger_warring dark:border-danger_warring dark:hover:border-danger_hover dark:hover:bg-danger_hover font-bold p-2 rounded-3xl text-base px-3 py-1 
                shadow-md shadow-gold_umg"
                    onClick={() => handleDelete(user.id)}
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}