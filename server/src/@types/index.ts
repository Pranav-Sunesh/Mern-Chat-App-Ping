
//Database type

import { client } from "../config/db";

export type Database = typeof client.db;

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