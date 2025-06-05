import ComponentDisplay from "../components/ComponentDisplay";


const components = [
    {
        id: 1,
        link: "/demo",
        image: "demo.png",
        description: "A demo component",
        title: "Demo",
    },
    {
        id: 2,
        link: "/solari-time",
        image: "https://www.executivetraveller.com/photos/view/size:1200,675/67315269af284c5b854e66f8dd799465-solari-board-qantas-1.jpg",
        description: "A component that displays the current time through a solari board",
        title: "Solari Time",
    }
];



function Home() {
    return (
        <div className="w-screen min-h-screen flex flex-row justify-center items-start gap-4 flex-wrap p-4">
            {components.map(c =>
                <ComponentDisplay key={c.id} description={c.description} image={c.image} link={c.link} title={c.title} ></ComponentDisplay>
            )}
        </div>
    )
}
export default Home