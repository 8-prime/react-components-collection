export type SolariBoardCharacter = {
    current: string
    next: string
    previous: string
}

export type SolariBoardCharacterProps = {
    character: SolariBoardCharacter
}

function SolariBoardCharacterComponent({ character }: SolariBoardCharacterProps) {
    return (
        <div className="grid text-3xl text-white	bg-neutral-950 p-1">
            <p className="col-start-1 row-start-1">
                {character.current}
            </p>
            <div className="col-start-1 row-start-1"></div>
            <p className="col-start-1 row-start-1">
                {character.current}
            </p>
        </div>
    )
}

export { SolariBoardCharacterComponent };