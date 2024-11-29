import axios from "axios"

export const deleteRequest = async(username: string, requesterName: string, toast:any): Promise<void> => {
    const response = await axios.delete("http://localhost:5000/chat/deleterequest", {
        data: {
            username: username,
            requesterName: requesterName
        }
    });
    toast({
        title: response.data,
        duration: 1500,
    })
}   