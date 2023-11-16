import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UserMenu from './UserMenu';
import SearchBar from './SearchBar';

const MainNavigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [search, setSearch] = useState('');
    const user = useSelector(state => state.user);

    const handleMenuToggle = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    const handleUserMenuToggle = () => {
        setIsUserMenuOpen((prevState) => !prevState);
    };

    const handleSearchInput = (value) => {
        setSearch(value); 
    }
    

    return (
        <header className={`z-10 ${isMenuOpen ? '' : ''}`}>
            <nav className='flex justify-between bg-light_component dark:bg-dark_component text-light_menu dark:text-white items-center p-1 shadow-lg sm:text-lg'>
                <div className="flex justify-start">
                    <button
                        onClick={handleMenuToggle}
                        type="button"
                        className="p-2 m-2 text-light_menu hover:text-white hover:bg-light_menu focus:text-white focus:bg-light_menu dark:text-white dark:hover:bg-yellow_umg dark:hover:text-dark_component dark:focus:text-dark_component dark:focus:bg-yellow_umg rounded-xl duration-200"
                        aria-expanded={isMenuOpen ? 'true' : 'false'}>
                        <svg
                            className="h-8 w-8"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div className={`${isMenuOpen ? 'block' : 'hidden'} absolute bg-white dark:bg-dark_component text-light_menu dark:text-white shadow-lg rounded-b-xl mt-16 z-10`}>
                        <div className="pt-2 pb-2 sm:px-1 font-bold">
                            <div className="hover:bg-light_menu hover:text-white dark:hover:bg-dark_yellow_umg dark:hover:text-dark_component px-2 py-1 rounded-lg duration-200">
                                <NavLink to="/">Strona główna</NavLink>
                            </div>
                            <div className="hover:bg-light_menu hover:text-white dark:hover:bg-dark_yellow_umg dark:hover:text-dark_component px-2 py-1 rounded-lg duration-200">
                                <NavLink to="/chats">Szybka pomoc</NavLink>
                            </div>
                            <div className="hover:bg-light_menu hover:text-white dark:hover:bg-dark_yellow_umg dark:hover:text-dark_component px-2 py-1 rounded-lg duration-200">
                                <NavLink to="/notices">Ogłoszenia</NavLink>
                            </div>
                            <div className="hover:bg-light_menu hover:text-white dark:hover:bg-dark_yellow_umg dark:hover:text-dark_component px-2 py-1 rounded-lg duration-200">
                                <NavLink to="/questions">Zadaj pytanie</NavLink>
                            </div>
                            {/* <div className="hover:bg-light_menu hover:text-white dark:hover:bg-dark_yellow_umg dark:hover:text-dark_component px-2 py-1 rounded-lg duration-200">
                                <NavLink to="/map">Mapa</NavLink>
                            </div>
                            <div className="hover:bg-light_menu hover:text-white dark:hover:bg-dark_yellow_umg dark:hover:text-dark_component px-2 py-1 rounded-lg duration-200">
                                <NavLink to="/contact">Kontakt</NavLink>
                            </div>
                            <div className="hover:bg-light_menu hover:text-white dark:hover:bg-dark_yellow_umg dark:hover:text-dark_component px-2 py-1 rounded-lg duration-200">
                                <NavLink to="/documents">Dokumenty</NavLink>
                            </div>
                            <div className="hover:bg-light_menu hover:text-white dark:hover:bg-dark_yellow_umg dark:hover:text-dark_component px-2 py-1 rounded-lg duration-200">
                                <NavLink to="/circles">Koła naukowe</NavLink>
                            </div> */}
                        </div>
                    </div>

                    <div className='max-sm:hidden'>
                        <NavLink to="https://umg.edu.pl/" target="_blank" rel="noopener noreferrer">
                            <img src={require('../../assets/umgLogo.png')} alt="UMG Logo" className="dark:bg-dark_field rounded-full w-16 h-16" />
                        </NavLink>
                    </div>

                </div>
                <div className="flex justify-end">
                    <div>
                       <SearchBar onSearch={handleSearchInput}/>
                    </div>
                    <div className="flex justify-end relative font-bold">
                        <button
                            className="border-2 border-light_menu hover:border-yellow_umg hover:text-yellow_umg focus:border-yellow_umg focus:text-yellow_umg ring-light_menu dark:border-white dark:hover:border-yellow_umg dark:focus:border-dark_yellow_umg rounded-full shadow-md text-base px-2 py-1 duration-200"
                            onClick={handleUserMenuToggle}>
                            {user.isLoggedIn === true ? user.nickname.slice(1).toUpperCase() : "G"}
                        </button>
                        {isUserMenuOpen && (
                            <div className="absolute bg-light_component dark:bg-dark_component text-light_menu dark:text-white shadow-lg rounded-b-xl mt-14 z-10 p-2">
                                <UserMenu  user={user}/>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default MainNavigation;