import Content from "../components/ui/Content";


const Home = ({ title }) => {
    return (
        <Content>
            <div>
                <h1>{title}</h1>
                <p class="text-3xl font-bold underline">Tu będzie {title}</p>
            </div>
        </Content>
    );
}

export default Home;