import axios from "axios";

async function getAllReviews(bookToken) {
    try{
        const response = await axios.post ("http://localhost:8231/api/review/get_all", bookToken, {
            'Content-Type': 'application/json',
        })
        
        if (response.status === 200){
            return response.data
        }
    } catch (e){
        throw new e()
    }
}

export {getAllReviews}