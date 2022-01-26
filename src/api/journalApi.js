
import axios from "axios";

const journalApi = axios.create({
    baseURL: 'https://vue-demos-485ba-default-rtdb.firebaseio.com'
})

export default journalApi