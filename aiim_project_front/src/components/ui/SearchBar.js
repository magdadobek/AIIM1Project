import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const [notices, setNotices] = useState([]);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await fetch('https://foka.umg.edu.pl/~projgr2324md/AIIM1Project/aiim_project/public/api/noticeboard/allOpen', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "X-Requested-With": "XMLHttpRequest"
                    }
                });

                if (!response.ok) {
                    throw new Error('Coś poszło nie tak');
                }

                const responseData = await response.json();
                const fetchedNotices = responseData.data.data.map((notice) => ({
                    id: notice.id,
                    title: notice.title,
                    content: notice.content,
                    date: notice.date,
                    id_user: notice.id_user,
                    open: notice.open,
                    tags: notice.tags
                }));
                setNotices(fetchedNotices);
            } catch (error) {
                console.error('Błąd podczas pobierania ogłoszeń:', error.message);
            }
        };

        const fetchQuestions = async () => {
            try {
                const response = await fetch('https://foka.umg.edu.pl/~projgr2324md/AIIM1Project/aiim_project/public/api/qna', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "X-Requested-With": "XMLHttpRequest"
                    }
                });

                if (!response.ok) {
                    throw new Error('Coś poszło nie tak');
                }

                const responseData = await response.json();
                const fetchedQuestions = responseData.data.map((question) => ({
                    id: question.id,
                    title: question.question_title,
                    content: question.question_content,
                    date: question.date,
                    id_user: question.id_user,
                    open: question.open,
                    tags: question.tags
                }));
                setQuestions(fetchedQuestions);
            } catch (error) {
                console.error('Błąd podczas pobierania pytań:', error.message);
            }
        };

        fetchNotices();
        fetchQuestions();
    }, []);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchQuery(value);

        const fuseOptions = {
            includeScore: true,
            keys: ['title', 'tags'],
        };

        const noticeFuse = new Fuse(notices, fuseOptions);
        const questionFuse = new Fuse(questions, fuseOptions);

        const noticeResults = noticeFuse.search(value);
        const questionResults = questionFuse.search(value);

        const noticeSuggestions = noticeResults.map((result) => ({
            type: 'notice',
            item: result.item,
        }));

        const questionSuggestions = questionResults.map((result) => ({
            type: 'question',
            item: result.item,
        }));

        const allSuggestions = [...noticeSuggestions, ...questionSuggestions];

        setSuggestions(allSuggestions);
        onSearch(value);
    };

    const handleNoticeClick = (notice) => {
        window.location.href = `/notices/${notice.id}`;
    };

    const handleQuestionClick = (question) => {
        window.location.href = `/questions/${question.id}`;
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
                        {suggestion.type === 'notice' && (
                            <span onClick={() => handleNoticeClick(suggestion.item)}>
                                {suggestion.item.title} (Ogłoszenie)
                            </span>
                        )}
                        {suggestion.type === 'question' && (
                            <span onClick={() => handleQuestionClick(suggestion.item)}>
                                {suggestion.item.title} (Pytanie)
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;