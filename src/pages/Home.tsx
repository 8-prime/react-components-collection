import ComponentDisplay from "../components/ComponentDisplay";


const components = [
    {
        id: 1,
        link: "/demo",
        image: "demo.png",
        description: "A demo component",
        title: "Demo",
    },
];



function Home() {
    return (
        <div className="w-screen min-h-screen grid grid-cols-3 grid-rows-1 justify-center p-4">
            {components.map(c =>
                <ComponentDisplay key={c.id} description={c.description} image={c.image} link={c.link} title={c.title} ></ComponentDisplay>
            )}
        </div>
    )
}
export default Home