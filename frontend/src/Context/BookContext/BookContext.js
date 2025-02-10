import {createContext, useContext, useEffect, useState} from "react";
import {getAllBooks} from "../../Services/Book/BookServices";

const BookContext = createContext();

export function BookContextProvider({children}){
    const [book, setBook] = useState([])

    const [bookPage, setBookPage] = useState([])

    const [filteredBooks, setFilteredBooks] = useState([])

    const getBookContext = (selectedBook) => {
        setBookPage(selectedBook)
    }

    useEffect(() => {
        async function fetchData(){
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
                setFilteredBooks(newBooks)
                console.log("contexto", response)
            } catch (e){
                console.log(e)
            }

        }
        fetchData()
    }, []);



    return (
        <BookContext.Provider value={{book, getBookContext, filteredBooks, setFilteredBooks, bookPage}}>
            {children}
        </BookContext.Provider>
    )
}

export default function useBookContext() {
    return useContext(BookContext);
}