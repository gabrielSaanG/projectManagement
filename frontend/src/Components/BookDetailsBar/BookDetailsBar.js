import {useState} from "react";
import { AnimatePresence } from "motion/react"
import {motion} from 'motion/react'
import BookDetailsContent from "./BookDetailsContent";

export default function BookDetailsBar(){

    const [details, setDetails] = useState(false)

    const tabs = ["Overview", "Detalhes", "Reviews"]

    const [selectedTab, setSelectedTab] = useState(tabs[0])

    const handleDetails = async () => {
        setDetails(!details)
    }

    return(
        <nav className="">
            <ul className="flex bg-white gap-4 mt-8 justify-evenly rounded-xl py-2 text-gray-700">
                {tabs.map((item) => (
                    <motion.li
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.5}}
                        key={item.label}
                        layoutId={item}
                        className={`cursor-pointer hover:text-gray-900 transition-colors select-none`}
                        onClick={() => {
                            setSelectedTab(item)
                            handleDetails()
                        }}
                    >
                        {item}
                        {item === selectedTab ? (
                            <motion.div
                                layoutId="underline"
                                id="underline"
                                className={`border-b-2 border-orange-500`}
                            />
                        ) : null}
                    </motion.li>
                ))}
            </ul>

            {selectedTab &&
            <>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedTab}
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 10}}
                        transition={{duration: 0.2}}
                        className={`p-4 flex bg-white rounded-xl mt-4 text-gray-700 opacity-0`}>
                        {<BookDetailsContent selectedTab={selectedTab} tabs={tabs}/>}
                    </motion.div>
                </AnimatePresence>

            </>
            }
        </nav>


    )
}