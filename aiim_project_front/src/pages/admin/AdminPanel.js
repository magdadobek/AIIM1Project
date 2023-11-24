import { useEffect, useState } from "react";

export const AdminPanel = () =>{
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const [users,setUsers] = useState()
    
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

            if(!response.ok){
                if(response.status === 401){
                    throw new Error('Brak autoryzacji');
                   
                }else{
                    throw new Error('Coś poszło nie tak');
                }
            }

            const responseData = await response.json();

            const fetchedChats = responseData.data;

            setUsers(fetchedChats.filter(chat => chat.open !== false))

            setIsLoading(false);
        }

        fetchChats().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    useEffect(()=>{
        console.log("users",users)
    },[users])

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





    return(
        <>

        </>
    )
}