const Content = ({ children }) => {
    return (
        <div className="flex p-4 m-6 md:p-8 space-y-80 md:space-y-8 bg-light_component dark:bg-dark_component rounded-3xl mx-auto max-w-full shadow-lg">
            {children}
        </div>
    );
}

export default Content;