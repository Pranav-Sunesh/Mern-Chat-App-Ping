import axios, { AxiosResponse } from "axios"
import { title } from "process";

export const acceptRequest =async (username: string | null, requesterName :string, toast: any) => {
    const response: AxiosResponse = await axios.put("http://localhost:5000/chat/acceptrequest", {username: username, requesterName: requesterName});
    toast({
        title: "Request accepted",
        description: requesterName,
        duration: 1500
    })
}