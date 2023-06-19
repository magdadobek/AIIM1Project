const Home = ({ title }) => {
    return (
            <div className="w-[800px] h-[700px]">
                <h1>{title}</h1>
                <p class="text-3xl font-bold underline text-center">Tu będzie {title}</p>
            </div>
    );
}

export default Home;