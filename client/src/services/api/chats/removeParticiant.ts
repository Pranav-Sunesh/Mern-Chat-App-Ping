import axios, { Axios, AxiosError, AxiosResponse } from "axios"

interface ReturnType{
    data: string,
    variant: 'default' | 'destructive'
}

export const removeParticipant = async(chatId: string, user: string): Promise<ReturnType> => {

    try {
        const response: AxiosResponse = await axios.delete('http://localhost:5000/chat/delete/participant',{
            data: {
                chatId: chatId,
                user: user
            }
        })
        return {
            data: response.data,
            variant: 'default'
        }
    } catch (error) {
        console.log(error);
        const axiosError = error as AxiosError
        return {
            data: axiosError.response?.data as string,
            variant: 'destructive'
        }
    }
}