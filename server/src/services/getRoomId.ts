
export const getRoomId = (user1: string, user2: string): string => {
    return [user1, user2].sort().join('_');
} 