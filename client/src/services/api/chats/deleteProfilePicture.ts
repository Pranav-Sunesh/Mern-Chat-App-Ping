import axios, { AxiosError, AxiosResponse } from "axios"

interface ReturnType{
    data: string
    variant: 'destructive' | 'default'
}

export const deleteProfilePicture = async(userId: string): Promise<ReturnType> => {
    try {
        const response: AxiosResponse = await axios.delete('http://localhost:5000/chat/profile/deletepfp', {
            data: {
                userId: userId
            }
        })
        return { 
            data: response.data,
            variant: "default"
         }
    } catch (error) {
        console.log(error);
        const axiosError = error as AxiosError;
        return {
            data: axiosError.response?.data as string || "Error! Please try again",
            variant: 'destructive' 
        }
        
    }
}