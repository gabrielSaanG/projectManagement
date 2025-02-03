import axios from "axios";
import {imageConverterToBase64} from "../../Utils/ImageConverter/ImageConverterToBase64";

async function postBook(imageURL, title, author, date, rating, genre){

    try{

        // const imageBase64 = await imageConverterToBase64(imageURL)

        const bookData = {
            imageURL: imageURL,
            title: title,
            author: author,
            date: date,
            rating: rating,
            genre: genre
        }


        const response = await axios.post("http://localhost:8231/api/book/post", bookData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (response.status === 200){
            return response
        }
        else {
            return response
        }
    } catch (e){
        console.log(e)
    }
}

async function getAllBooks() {
    try {
        const response =  await axios.get('http://localhost:8231/api/book/get_all', {
            headers: {
                'Content-Type': 'application/json',
            }
        })

        return response.data
    } catch (e) {
        console.log("Couldn't get array of books")
    }
}

export {postBook, getAllBooks}