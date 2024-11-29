import axios, { AxiosResponse } from "axios"

interface ReturnType{
    data: string,
    variant: 'destructive' | 'default'
    userName: string | null
}

export const updateProfile = async(userId: string,imageFile: File, username: string, bio: string): Promise<ReturnType> => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('username', username);
    formData.append('bio', bio);
    formData.append('image', imageFile);
    console.log(formData);
    try {
        const response: AxiosResponse = await axios.post('http://localhost:5000/chat/profile/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if(response.status === 204){
            return {data: "Username already taken", variant: "destructive", userName: null}
        }
        return {data: "Successfully updated", variant: 'default', userName: response.data.userName};
        
    } catch (error) {
        console.log(error);
        return {data: "Server Error", variant: 'destructive', userName: null}
    }
}