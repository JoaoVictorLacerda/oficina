import axios from "axios";

const client = axios.create({
    baseURL: "https://tame-erin-leopard-kit.cyclic.cloud",
    withCredentials: false,
});

export default client