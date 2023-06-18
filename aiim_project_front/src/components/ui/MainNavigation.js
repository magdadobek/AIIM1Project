import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UserMenu from './UserMenu';

const MainNavigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const nickname = useSelector(state => state.user.nickname);

    const handleMenuToggle = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    return (
        <header className={`z-10 ${isMenuOpen ? '' : ''}`}>
            <nav className='flex bg-light_component dark:bg-dark_component text-light_menu dark:text-white justify-center p-6 rounded-3xl m-5 w-min shadow-lg'>
                <button
                    onClick={handleMenuToggle}
                    type="button"
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    aria-expanded={isMenuOpen ? 'true' : 'false'}>

                    <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>

                </button>
                <div className={`${isMenuOpen ? 'block' : 'hidden'}`}> 
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <br/>
                        <div>
                        <NavLink to="/">Strona główna</NavLink>
                        </div>
                        <div>
                        <NavLink to="/szybkapomoc">Szybka pomoc</NavLink>
                        </div>
                        <div>
                        <NavLink to="/ogloszenia">Ogłoszenia</NavLink>
                        </div>
                        <div>
                        <NavLink to="/mapa">Mapa</NavLink>
                        </div>
                        <div>
                        <NavLink to="/kontakt">Kontakt</NavLink>
                        </div>
                        <div>
                        <NavLink to="/dokumenty">Dokumenty</NavLink>
                        </div>
                        <div><NavLink to="/kolanaukowe">Koła naukowe</NavLink></div>
                    </div>
                    <UserMenu isLoggedIn={isLoggedIn} nickname={nickname} />
                </div>
                <div>
                    <p className="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 m-2">Logo</p>
                </div>
                <div>
                    <input id="search" type="search" name="search" className="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-72 m-2" placeholder="Wyszukiwarka"/>
                </div> 
                <div>
                    <p className="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 m-2">User</p>
                </div>
            </nav>
        </header>
    );
};

export default MainNavigation;