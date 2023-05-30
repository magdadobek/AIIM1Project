import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const UserMenu = ({ isLoggedIn, nickname }) => {
    const [theme, setTheme] = useState("");
    const [modeText, setModeText] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        if(theme === ""){
            setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        }

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
        setTheme(theme === "dark" ? "light" : "dark");
    }

    return (
        <>
            {!isLoggedIn && (
                <>
                    <li>
                        <NavLink to="/rejestracja">Rejestracja</NavLink>
                    </li>
                    <li>
                        <NavLink to="/logowanie">Logowanie</NavLink>
                    </li>
                </>
            )}
            {isLoggedIn && (
                <>
                    <li>
                        <NavLink to="/profil">Profil ({nickname})</NavLink>
                    </li>
                    <li>
                        <NavLink to="/wyloguj" onClick={handleLogout}>
                            Wyloguj
                        </NavLink>
                    </li>
                </>
            )}

            <div>
                <button className="bg-yellow_umg dark:bg-gold_umg p-4 rounded-3xl m-5" onClick={handleThemeSwitch}>{modeText}</button>
            </div>
        </>
    );
};

export default UserMenu;