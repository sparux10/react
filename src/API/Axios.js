import axios from "axios";
import Cookie from 'cookie-universal'
import { baseURL } from "./api";

const cookie = Cookie()
const token = cookie.get('token')

export const Axios = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Bearer ' + token,
    }
})