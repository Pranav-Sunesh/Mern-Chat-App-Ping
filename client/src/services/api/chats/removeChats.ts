import axios, { AxiosError, AxiosResponse } from "axios"
interface ReturnType{
    data: string
    variant: 'default' | 'destructive'
}

export const removeChats = async(chatId: string): Promise<ReturnType> => {
    try {
        const response: AxiosResponse = await axios.delete('http://localhost:5000/chat/deletechat',{
            data: {
                chatId: chatId
            }
        });
        return { data: response.data, variant: 'default' }

    } catch (error) {
        console.log(error);
        const axiosError = error as AxiosError;
        return { 
            data: axiosError.response?.data as string || "Error! please try again",
            variant: 'destructive'
        }
    }
}