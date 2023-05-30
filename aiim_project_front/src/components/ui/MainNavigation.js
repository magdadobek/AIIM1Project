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
        <header className={`z-10 ${isMenuOpen ? 'fixed' : ''}`}>
            <nav className='bg-dark_component'>
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
                <button
                    onClick={handleMenuToggle}
                    type="button"
                    className="absolute top-0 left-0 p-2 text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
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
            </nav>
        </header>
    );
};

export default MainNavigation;