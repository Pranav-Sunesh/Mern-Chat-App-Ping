import axios, { AxiosError, AxiosResponse } from "axios"

interface ReturnType{
    data: string,
    variant: 'default' | 'destructive'
}

export const createGroup = async(img: File | null, participants: string[], name: string, bio: string): Promise<ReturnType> => {
    const formData = new FormData()
    formData.append('image', img? img: "");
    formData.append('participants', JSON.stringify(participants));
    formData.append('groupName', name);
    formData.append('bio', bio);
    formData.append('user', localStorage.getItem('username')!);
    try {
        const response: AxiosResponse = await axios.post("http://localhost:5000/chat/create/group", formData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        });
        return {
            data: response.data,
            variant: "default"
        }
    } catch (error) {
        console.log(error);
        const axiosError = error as AxiosError;
        return {
            data: axiosError.response?.data as string,
            variant: "destructive"
        }
    }
}