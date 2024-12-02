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

export type ParticipantType = {
    id: string,
    name: string,
    profilePicURL: string,
    bio: string
}

export type GroupType = {
    groupName: string,
    bio: string,
    profilePicURL: string,
    isAdmin: boolean
}

export type ContactType = {
    _id: string, 
    type: string
    groupId: string
    updatedTimestamp: string
    messages: string[]
    participants: ParticipantType[]
    lastMessage: {sender: string, content: string},
    groupDetails: GroupType,
    bio: string
}   

export type JoinRoomType = {
    senderId: string,
    receiverId: string
}
export type LastMessageType = {
    sender: string
    content: string
}

export type UserDetailsType = {
    _id: string
    userName: string
    profilePicURL: string
    bio: string
}

export type sendRequestReturnType = {
    data: string, 
    type: 'default' | 'destructive'
}

export type RequestSectionType = {
    _id: string, 
    username: string
} 