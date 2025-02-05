import React, {useEffect, useState} from 'react'
import TopNavBarComponent from "../../../Components/NavBarComponent/TopNavBarComponent";
import QuoteModalComponent from "../../../Components/ModalComponent/QuoteModalComponent";
import BookModalComponent, {teste} from "../../../Components/ModalComponent/BookModalComponent";
import bookImg from "../../../Images/bookImg.png"
import {getAllBooks, postBook} from "../../../Services/Book/BookServices";
import {fromBase64ToImage, ImageConverterToBase64} from "../../../Utils/ImageConverter/ImageConverterToBase64";
export default function MainPage () {
    const [book, setBook] = useState([])

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await getAllBooks()

                if (response === undefined) return null

                const newBooks = response.filter(item => {
                    return !book.some(prevBooks => prevBooks.token === item.token)
                })

                setBook([])

                if (newBooks.length > 0){
                    for (const item of newBooks) {
                        setBook(prev => [...prev, item])
                    }
                }



                console.log(newBooks)
            } catch (e){
                console.log(e)
            }
        }
        fetchData().then(() => {
            console.log("teste")

        })
    }, []);

    // const createBook = async () => {
    //     try{
    //         const response = await postBook(bookUrl, "48 Laws of Power", "Robert Greene",
    //             "2001", "4.3", "Fiction")
    //         if (response.status === 200){
    //             return console.log(response.data)
    //         } else{
    //             return console.log("erro", response.status)
    //         }
    //     } catch (e){
    //         console.log(e)
    //     }
    // }
    //
    // createBook()

    return (
        <div className="h-screen bg-[#F3F3F7] overflow-auto">

            <div className="mx-20 my-10">
                <QuoteModalComponent paragraph="lorem" author="John Doe"/>
                <div className="mt-8 text-2xl font-semibold text-gray-600">
                    <h1>Recomendados para você</h1>
                </div>

                <div className="flex max-w-screen overflow-x-auto pb-12">
                    {book.map(item => {
                        return item && (
                            <BookModalComponent imageURL={"data:image/png;base64, " + item.imageURL} title={item.title}
                                                author={item.author} date={item.date} rating={item.rating} token={item.token}/>
                        )
                    })

                    }


                </div>

                <div className="mt-8 text-2xl font-semibold text-gray-600">
                    <h1>Leituras recentes</h1>
                </div>

                <div className="flex max-w-screen overflow-x-auto pb-12">
                    {book.map(item => {
                        return item && (
                            <BookModalComponent imageURL={"data:image/png;base64, " + item.imageURL} title={item.title}
                                                author={item.author} date={item.date} rating={item.rating} token={item.token}/>
                        )
                    })

                    }


                </div>
            </div>
        </div>
    )
}