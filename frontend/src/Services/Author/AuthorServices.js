import axios from "axios";

async function getAuthor(authorName){
    const [firstName, lastName] = authorName.split(" ")
    const author = {
        firstName,
        lastName
    }

    try{
        return await axios.post("http://localhost:8231/api/author/get_author", author, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    } catch (e){
        throw new Error()
    }
}

export {getAuthor}