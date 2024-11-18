import { StatesType } from "@/@types";
import axios, { AxiosError, AxiosResponse } from "axios"

export const signupCall = async( states: StatesType , toast: any): Promise<any> => {

    try {
        if(states.password.length < 8 ){
            console.log('Atleast 8 charachters');
            toast({
                title: "Atleast 8 charachters",
                variant: 'destructive'
            })
            return {error: "Atleast 8 charachters"}
        }else if(states.password != states.confirmPassword){
            console.log("Password should match");
            toast({
                title: "Password should match",
                variant: 'destructive'
            })
            return {error: "Password should match"}
        }else{
            const response: AxiosResponse = await axios.post('http://localhost:5000/auth/signup', states);
            if(response.data.error){
                console.log(response.data.error);
            }else if(response.data.acknowledged){
                console.log("Successfully added user");
                if(response.data.token){
                    localStorage.setItem("username", states.user);
                }
                return {token: response.data.token};
                
            }
        }
    } catch (error) {
        const axiosError = error as AxiosError;
        const status = axiosError?.response?.status;
        if(status === 409){
            toast({
                title: "Username already taken",
                variant: 'destructive'
            });
            return {error: "Username already taken"}
        }
    }

}