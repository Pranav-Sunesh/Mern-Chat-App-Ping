import { StatesType } from "@/@types/auth";
import axios, { AxiosResponse } from "axios"

export const signupCall = async( states: StatesType ): Promise<void | string> => {


    if(states.password.length < 8 ){
        console.log('Atleast 8 charachters');
    }else if(states.password != states.confirmPassword){
        console.log("Password should match");
    }else{
        const response: AxiosResponse = await axios.post('http://localhost:5000/auth/signup', states);
        if(response.data.error){
            console.log(response.data.error);
        }else if(response.data.acknowledged){
            console.log("Successfully added user");
            return response.data.token;
        }
    }

}