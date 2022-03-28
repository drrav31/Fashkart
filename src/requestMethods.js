import axios from "axios";

const BASE_URL = "https://fashkart.herokuapp.com/api/";
// const TOKEN = JSON.parse(JSON.parse(
const TOKEN = localStorage.getItem("persist:root")?.user?.currentUser?.accessToken;
console.log(TOKEN);

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers:{token: `Bearer ${TOKEN}`},

    }
)