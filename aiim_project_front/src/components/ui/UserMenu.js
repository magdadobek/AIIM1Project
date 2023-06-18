import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const UserMenu = ({ isLoggedIn, nickname }) => {
    const [theme, setTheme] = useState("");
    const [modeText, setModeText] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        let theme = localStorage.getItem("preferedTheme");
        if (!theme) {
            theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            localStorage.setItem("preferedTheme", theme);
        }
        if (theme === "dark") {
            document.documentElement.classList.add("dark"); //
            setModeText("Light Mode")
        } else {
            document.documentElement.classList.remove("dark");
            setModeText("Dark Mode")
        }
    }, [theme]);


    const handleLogout = () => {
        console.log("wylogowano");
        dispatch({ type: "user/logout" });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
    };

    const handleThemeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark");
        localStorage.setItem("preferedTheme", theme === "dark" ? "light" : "dark");

    }

    return (
        <>
            {!isLoggedIn && (
                <>
                    <div>
                        <NavLink to="/rejestracja">Rejestracja</NavLink>
                    </div>
                    <div>
                        <NavLink to="/logowanie">Logowanie</NavLink>
                    </div>
                </>
            )}
            {isLoggedIn && (
                <>
                    <div>
                        <NavLink to="/profil">Profil ({nickname})</NavLink>
                    </div>
                    <div>
                        <NavLink to="/wyloguj" onClick={handleLogout}>
                            Wyloguj
                        </NavLink>
                    </div>
                </>
            )}

            <div>
                <button className="bg-yellow_umg dark:bg-gold_umg p-2 rounded-3xl m-2 text-sm w-40" onClick={handleThemeSwitch}>
                    {modeText}
                </button>
            </div>
        </>
    );
};

export default UserMenu;