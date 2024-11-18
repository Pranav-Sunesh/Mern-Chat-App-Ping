export type CardProps = {
    formType: string
}

export type StatesType = {
    user: string,
    password: string,
    confirmPassword: string,
    email: string,
    firstName: string,
    lastName: string
}

export type RequestSectionType = {
    requesterName: string
}

export type ContactType = {
    _id: string, 
    type: string
    updatedTimestamp: string
    messages: string[]
    participants: string[]
    lastMesssage: string
}

export type JoinRoomType = {
    senderId: string,
    receiverId: string
}