import { SolariBoardCharacterComponent, type SolariBoardCharacter } from "./SolariBoardCharacter"

export default function SolariBoard() {
    const character: SolariBoardCharacter = {
        current: "A",
        next: "B",
        previous: "C"
    }
    return (
        <div>
            <SolariBoardCharacterComponent character={character} />
        </div>
    )
}