import { NavLink } from 'react-router-dom';

const MainNavigation = () => {
    return(
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
                    <li>
                        <NavLink to="/rejestracja">Rejestracja</NavLink>
                    </li>
                    <li>
                        <NavLink to="/logowanie">Logowanie</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation