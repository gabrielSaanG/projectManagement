import axios from "axios";

async function getQuote(){
    try{
        const response = await axios.get("http://localhost:8231/api/quote/get")
        if (response.status === 200){
            return response.data
        }
    } catch (e) {
        console.log("Couldnt get quote", e)
    }
}

export default getQuote