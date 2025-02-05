import {useState} from "react";
import {animatePresence} from "motion/react"
import {motion} from 'motion/react'

export default function BookDetailsBar(){

    const [details, setDetails] = useState(false)

    const tabs = ["Overview", "Detalhes", "Reviews"]

    const [selectedTab, setSelectedTab] = useState(tabs[0])

    const handleDetails = async () => {
        setDetails(!details)
    }

    return(
        <nav>
            <ul className="flex bg-white gap-4 mt-8 justify-evenly rounded-xl py-2 text-gray-700">
                {tabs.map((item) => (
                    <li className={`cursor-pointer hover:text-gray-900 transition-colors select-none`}
                        onClick={() => {
                            setSelectedTab(item)
                            handleDetails()
                        }}
                    >
                        {item === selectedTab ? (
                            <div className={`border-b-2 border-orange-500`}><h1>{item}</h1></div>
                        ) : <div><h1>{item}</h1></div>}

                    </li>
                ))}
            </ul>

            {details &&
            <>
                <motion.div
                    initial={{opacity: 0, y:-20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity:0}}
                    className={`p-4 flex bg-white rounded-xl mt-4 text-gray-700 opacity-0`}>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-xl font-semibold">Detalhes do Livro</h1>
                        <div>
                            <p className="font-semibold">Publicado em:</p>
                            <p>Estados Unidos</p>
                        </div>

                        <div className="flex gap-2">
                            <p className="font-semibold">Numero de paginas:</p>
                            <p>206</p>
                        </div>

                    </div>
                </motion.div>
            </>
            }
        </nav>


    )
}