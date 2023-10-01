import { LinkBox } from "../components/ui/LinkBox"

export const HomePage = () => {
    return (
        <>
            <div className="w-[800px]">
                <div className="grid grid-cols-2 gap-4">
                    <LinkBox
                        imageUrl="we.jpg"
                        linkUrl="https://we.umg.edu.pl/"
                    />
                    <LinkBox
                        imageUrl="wm.jpg"
                        linkUrl="https://wm.umg.edu.pl/"
                    />
                    <LinkBox
                        imageUrl="wn.jpg"
                        linkUrl="https://wn.umg.edu.pl/"
                    />
                    <LinkBox
                        imageUrl="wznj.jpg"
                        linkUrl="https://wznj.umg.edu.pl/"
                    />
                </div>
            </div>
        </>
    )
}