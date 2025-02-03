import React, {useEffect, useState} from 'react'
import getQuote from "../../Services/Quote/QuoteServices";

export default function QuoteModalComponent({paragraph, author}) {

    const [quote, setQuote] = useState({paragraph, author})

    useEffect( () => {
        async function fetchData(){
            try {
                const response = await getQuote()
                setQuote(response)
            } catch (e){
                console.log(e)
            }
        }
        fetchData()
    }, []);

    return (
        <div className="p-6 max-w-xl text-sm text-white rounded-2xl bg-gradient-to-r from-red-500 to-blue-500">
            <div><h1 className="font-semibold mb-4">Frase do dia</h1></div>
            <div>
                <p>"{quote.quote}"</p>
            </div>
            <div className="flex justify-end">
                <p>-{quote.author}</p>
            </div>
        </div>
    )
}