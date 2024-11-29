import axios, { AxiosResponse } from "axios";

export const getUser = async(username: string | null) => {
    const user: AxiosResponse = await axios.get(`http://localhost:5000/chat/getuser/${username}`);
    return user.data.userDetails;
}