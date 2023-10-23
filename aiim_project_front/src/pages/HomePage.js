import { LinkBox } from "../components/ui/LinkBox"
import we from "../assets/we-white.png"; 
import wm from "../assets/wm-white.png"; 
import wn from "../assets/wn-white.png"; 
import wznj from "../assets/wznj-white.png"; 

export const HomePage = () => {
    return (
        <>
            <div className="w-[800px] h-[500px]">
                <div className="grid grid-cols-2 gap-4">
                    <LinkBox
                        imageUrl={we}
                        linkUrl="https://we.umg.edu.pl/"
                        text = "Wydział Elektryczny"
                    />
                    <LinkBox
                        imageUrl={wm}
                        linkUrl="https://wm.umg.edu.pl/"
                        text = "Wydział Mechaniczny"
                    />
                    <LinkBox
                        imageUrl={wn}
                        linkUrl="https://wn.umg.edu.pl/"
                        text = "Wydział Nawigacyjny"
                    />
                    <LinkBox
                        imageUrl={wznj}
                        linkUrl="https://wznj.umg.edu.pl/"
                        text = "Wydział Zarządzania"
                    />
                </div>
            </div>
        </>
    )
}