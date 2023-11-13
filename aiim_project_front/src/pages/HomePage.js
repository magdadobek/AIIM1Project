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
            <div className="p-5 m-2">
                <div className="grid gap-4 lg:gap-10 xl:gap-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                    <LinkBox
                        imageUrl={storedTheme === "dark" ? we_dark : we}
                        linkUrl="https://we.umg.edu.pl/"
                        text = "Wydział Elektryczny"
                    />
                    <LinkBox
                        imageUrl={storedTheme === "dark" ? wm_dark : wm}
                        linkUrl="https://wm.umg.edu.pl/"
                        text = "Wydział Mechaniczny"
                    />
                    <LinkBox
                        imageUrl={storedTheme === "dark" ? wn_dark : wn}
                        linkUrl="https://wn.umg.edu.pl/"
                        text = "Wydział Nawigacyjny"
                    />
                    <LinkBox
                        imageUrl={storedTheme === "dark" ? wznj_dark : wznj}
                        linkUrl="https://wznj.umg.edu.pl/"
                        text = "Wydział Zarządzania"
                    />
                </div>
            </div>
        </>
    )
}