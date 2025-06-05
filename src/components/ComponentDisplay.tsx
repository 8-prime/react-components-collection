import { Link } from "react-router"

export type ComponentDisplayProps = {
    link: string
    image: string
    description: string
    title: string
}

function ComponentDisplay({ link, image, description, title }: ComponentDisplayProps) {
    return (
        <div className="rounded-lg w-96 h-52 shadow-2xl overflow-hidden">
            <Link to={link} className="w-full h-full grid">
                <img src={image} alt={title} className="w-full h-full object-cover col-start-1 row-start-1" />
                <div className="flex flex-col justify-end items-start col-start-1 row-start-1 bg-gradient-to-b from-[#43ff6600] to-zinc-900 text-white p-2">
                    <div className="grow">

                    </div>
                    <div>
                        <h3 className="text-xl">{title}</h3>
                        <p>{description}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ComponentDisplay