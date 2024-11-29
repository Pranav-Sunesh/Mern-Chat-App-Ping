import { ContactType } from "@/@types";

export const getChatIdArray = (chats: ContactType[] | [] | null) => {
    let chatIdArray: string[] = [];
    chats?.forEach((element: ContactType) =>{
        chatIdArray.push(element._id);
    })
    return chatIdArray;
}