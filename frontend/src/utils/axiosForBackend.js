import axios from "axios"

const instance = axios.create({
    baseURL: 'https://doc-diff.herokuapp.com/',
});

export default instance