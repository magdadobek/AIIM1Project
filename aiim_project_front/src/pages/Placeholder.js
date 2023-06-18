const Home = ({ title }) => {
    return (
            <div>
                <h1>{title}</h1>
                <p class="text-3xl font-bold underline">Tu będzie {title}</p>
            </div>
    );
}

export default Home;