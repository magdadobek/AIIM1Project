const Content = ({children}) => {
    // poprawić style, dodać margines (nie umiem w tailwind)
    return ( 
        <>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className="p-4 md:p-8 space-y-80 md:space-y-8 bg-dark_component rounded-lg">
            {children}
        </div>
        </>
    );
}
 
export default Content;