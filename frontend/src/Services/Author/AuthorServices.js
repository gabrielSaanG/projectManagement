import axios from "axios";

async function getAuthor(authorName){


    const [firstName, lastName] = authorName.split(" ")
    const author = {
        firstName,
        lastName
    }

    try{
        const response = await axios.get("localhost:8231/api/author/get", {data: author})

        if (response.status === 200){
            return response
        }
        else return response
    } catch (e){
        console.log(e)
    }
}

export {getAuthor}