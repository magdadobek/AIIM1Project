import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const UserMenu = ({ user }) => {
    const [theme, setTheme] = useState("");
    const [modeText, setModeText] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        let theme = localStorage.getItem("preferedTheme");
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
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
        let theme = localStorage.getItem("preferedTheme");
        setTheme(theme === "dark" ? "light" : "dark");
        localStorage.setItem("preferedTheme", theme === "dark" ? "light" : "dark");
        window.location.reload();
    }

    return (
        <>
            {!user.isLoggedIn && (
                <>
                    <div className="hover:bg-light_menu hover:text-white dark:hover:bg-dark_yellow_umg dark:hover:text-dark_component px-2 py-1 rounded-lg duration-200">
                        <NavLink to="/registration">Rejestracja</NavLink>
                    </div>
                    <div className="hover:bg-light_menu hover:text-white dark:hover:bg-dark_yellow_umg dark:hover:text-dark_component px-2 py-1 rounded-lg duration-200">
                        <NavLink to="/login">Logowanie</NavLink>
                    </div>
                </>
            )}
            {user.isLoggedIn && (
                <>
                    <div>
                        <NavLink to="/profil">Profil ({user.nickname})</NavLink>
                    </div>
                    <div>
                        <NavLink to="/logout" onClick={handleLogout}>
                            Wyloguj
                        </NavLink>
                    </div>

                    <div>
                        <NavLink to="/volunteering">
                            Wolontariat
                        </NavLink>
                    </div>
                </>
            )}

            <div>
                <button className="text-white bg-light_menu hover:bg-dark_yellow_umg 
                dark:bg-white hover:dark:bg-yellow_umg dark:text-dark_component shadow-sm
                shadow-gold_umg p-2 rounded-3xl m-2 text-sm w-24 duration-200" onClick={handleThemeSwitch}>
                    {modeText}
                </button>
            </div>
        </>
    );
};

export default UserMenu;