import { LinkBox } from "../components/ui/LinkBox"
import we from "../assets/we-blue.png"; 
import wm from "../assets/wm-blue.png"; 
import wn from "../assets/wn-blue.png"; 
import wznj from "../assets/wznj-blue.png"; 
import we_dark from "../assets/we-white.png"; 
import wm_dark from "../assets/wm-white.png"; 
import wn_dark from "../assets/wn-white.png"; 
import wznj_dark from "../assets/wznj-white.png"; 

export const HomePage = () => {
    let storedTheme = localStorage.getItem("preferedTheme");
    console.log(storedTheme);
    return (
        <>
            <div className="w-[800px] h-[500px]">
                <div className="grid grid-cols-2 gap-4">
                    <LinkBox
                        imageUrl={storedTheme === "dark" ? we_dark : we}
                        linkUrl="https://we.umg.edu.pl/"
                        text = "Wydział Elektryczny"
                    />
                    <LinkBox
                        imageUrl={/*darkMode ? wm_dark : */wm}
                        linkUrl="https://wm.umg.edu.pl/"
                        text = "Wydział Mechaniczny"
                    />
                    <LinkBox
                        imageUrl={/*darkMode ? wn_dark : */wn}
                        linkUrl="https://wn.umg.edu.pl/"
                        text = "Wydział Nawigacyjny"
                    />
                    <LinkBox
                        imageUrl={/*darkMode ? wznj_dark : */wznj}
                        linkUrl="https://wznj.umg.edu.pl/"
                        text = "Wydział Zarządzania"
                    />
                </div>
            </div>
        </>
    )
}