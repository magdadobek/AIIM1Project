import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useDispatch } from "react-redux";
const MainNavigation = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const nickname = useSelector(state => state.user.nickname);
    
    const handleLogout = () => {
        console.log("wylogowano");
        dispatch({ type: "user/logout" });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();

    }
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Strona główna</NavLink>
                    </li>
                    <li>
                        <NavLink to="/szybkapomoc">Szybka pomoc</NavLink>
                    </li>
                    <li>
                        <NavLink to="/ogloszenia">Ogłoszenia</NavLink>
                    </li>
                    <li>
                        <NavLink to="/mapa">Mapa</NavLink>
                    </li>
                    <li>
                        <NavLink to="/kontakt">Kontakt</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dokumenty">Dokumenty</NavLink>
                    </li>
                    <li>
                        <NavLink to="/kolanaukowe">Koła naukowe</NavLink>
                    </li>
                    {!isLoggedIn && <>
                        <li>
                            <NavLink to="/rejestracja">Rejestracja</NavLink>
                        </li>
                        <li>
                            <NavLink to="/logowanie">Logowanie</NavLink>
                        </li>
                    </>}
                    {isLoggedIn && <>
                        <li>
                            <NavLink to="/profil">Profil ({nickname})</NavLink>
                        </li>
                        <li>
                            <NavLink to="/wyloguj" onClick={handleLogout}>Wyloguj</NavLink>
                        </li>
                    </>}
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation