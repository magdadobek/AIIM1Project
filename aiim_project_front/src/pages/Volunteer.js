import React, { useState } from "react";
import { useSelector } from "react-redux";

const Volunteer = () => {
    const user = useSelector((state) => state.user);
    const [status, setStatus] = useState(null);


    const handleSetVolunteer = () => {
        const request = {
            account_type: "G",
            token: localStorage.getItem('token')
        };

        fetch(`https://foka.umg.edu.pl/~projgr2324md/AIIM1Project/aiim_project/public/api/user/update/accountType/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-TOKEN": "{{csrf_token()}}",
            },
            body: JSON.stringify(request),
        })
            .then((res) => {
                if (res.ok) {
                    setStatus("success");
                    setTimeout(() => {
                        window.location.href = 'https://foka.umg.edu.pl';
                    }, 3000);
                } else {
                    setStatus("error");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setStatus("error");
            });
    };

    const formatDate = (date) => {
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        return new Date(date).toLocaleDateString(undefined, options);
    };
    return (
        <>
            <div className="w-[800px]">
                <div className="p-4 border border-gray-300 dark:border-dark_field bg-white dark:bg-dark_field rounded-md shadow-md">
                    <h2 className="text-3xl font-bold m-4 text-left dark:text-dark_yellow_umg">
                        Oświadczenie Wolontariusza
                    </h2>
                    <p>
                        Ja, {user.nickname} o numerze albumu {user.index}, student Uniwersytetu Morskiego w Gdyni, oświadczam, że:
                    </p>
                    <ol className="list-disc pl-6 mt-2">
                        <li>Zgłaszam swoją chęć dołączenia do programu wolontariatu na rzecz pomocy studentom na naszej uczelni.</li>
                        <li>Rozumiem, że moim obowiązkiem będzie pomaganie innym studentom, udzielanie im wsparcia oraz udostępnianie poprawnych informacji dotyczących życia studenckiego na Uniwersytecie Morskim w Gdyni.</li>
                        <li>Jestem świadomy/a, że moje zaangażowanie jako wolontariusz ma na celu tworzenie pozytywnej atmosfery wśród społeczności akademickiej oraz propagowanie wartości wspólnoty i wzajemnej pomocy.</li>
                        <li>Zobowiązuję się do przestrzegania zasad etyki wolontariatu, uczciwości, studenta, oraz poszanowania prywatności innych studentów.</li>
                        <li>Wyrażam zgodę na udostępnienie moich danych kontaktowych innym wolontariuszom oraz koordynatorom programu w celu organizacji działań wolontariackich.</li>
                        <li>Zobowiązuję się do uczestnictwa w szkoleniach oraz spotkaniach organizowanych w ramach programu wolontariatu.</li>
                    </ol>
                    <p>
                        Jestem gotów/a w pełni zaangażować się w działania wolontariatu na rzecz studentów Uniwersytetu Morskiego w Gdyni i spełniać powierzone mi obowiązki z zaangażowaniem oraz pełną odpowiedzialnością.
                    </p>
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(new Date())}, Uniwersytet Morski w Gdyni.
                    </p>
                    <div className="w-full flex items-center">
                        <button className="text-light_menu dark:text-dark_component border-yellow_umg bg-yellow_umg border-2 hover:bg-dark_yellow_umg
                     hover:border-dark_yellow_umg dark:bg-dark_yellow_umg dark:border-dark_yellow_umg dark:hover:border-yellow_umg
                      dark:hover:bg-yellow_umg font-bold p-2 rounded-3xl text-base my-5 px-3 py-1 shadow-md shadow-gold_umg duration-200"
                            onClick={handleSetVolunteer}>
                            Zostań Wolontariuszem
                        </button>
                    </div>
                    {status === "success" && (
                            <p className="text-green-500 dark:text-green-400 ml-4">
                                Zostałeś Wolontariuszem! Zostaniesz przekierowany na stronę główną za 3 sekundy.
                            </p>
                        )}
                        {status === "error" && (
                            <p className="text-red-500 dark:text-red-400 ml-4">
                                Wystąpił błąd podczas próby zgłoszenia się na wolontariusza. Spróbuj ponownie.
                            </p>
                        )}

                </div>
            </div>
        </>
    );
};

export default Volunteer;

