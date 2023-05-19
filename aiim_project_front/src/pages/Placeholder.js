import {useState, useEffect} from "react"; // do dark mode

const Home = ({ title }) => {

    // obsługa dark mode'a
    const [theme, setTheme] = useState("Light");

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        }
        else {
            setTheme('light');
        }
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } 
        else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const handleThemeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    }
    // koniec obsługi dark mode'a

    return (
        <div>
            <h1>{title}</h1>
            <p class="text-3xl font-bold underline">Tu będzie {title}</p>
            <button className="bg-yellow_umg dark:bg-gold_umg p-4 rounded-3xl m-5" onClick={handleThemeSwitch}>Dark Mode</button>
        </div>
    );
}

export default Home;