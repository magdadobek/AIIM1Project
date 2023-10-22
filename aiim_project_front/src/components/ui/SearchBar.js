import React, { useState } from 'react';
import Fuse from 'fuse.js';

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const options = {
        includeScore: true,
        keys: ['textContent'],
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchQuery(value);

        const fuse = new Fuse(linksData, options);

        const searchResults = fuse.search(value);
        const suggestions = searchResults.map((result) => result.item);

        setSuggestions(suggestions);
        onSearch(value);
    };

    return (
        <div className="relative">
            <input
                id="search"
                type="text"
                name="search"
                className="bg-light_field dark:bg-dark_field border-light_menu dark:border-dark_field border-2 rounded-3xl shadow-md text-base px-2 py-1 w-auto sm:w-72 m-2"
                placeholder="Wyszukiwarka..."
                value={searchQuery}
                onChange={handleInputChange}
            />
            <ul className="absolute top-full left-0 bg-white dark:bg-dark_component border border-light_menu border-none dark:border-dark_menu shadow-lg w-full mt-2">
                {suggestions.map((suggestion, index) => (
                    <li key={index} className="p-2 hover:bg-gray-100 dark:hover:bg-dark_field cursor-pointer">
                        {suggestion.textContent}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;

const linksData = [
    { textContent: 'Strona główna', url: '/' },
    { textContent: 'Szybka pomoc', url: '/help' },
    { textContent: 'Ogłoszenia', url: '/notices' },
    { textContent: 'Najczęstrze pytania', url: '/questions' },
    { textContent: 'Mapa', url: '/map' },
    { textContent: 'Kontakt', url: '/contact' },
    { textContent: 'Dokumenty', url: '/documents' },
    { textContent: 'Koła Naukowe', url: '/circles' },
];