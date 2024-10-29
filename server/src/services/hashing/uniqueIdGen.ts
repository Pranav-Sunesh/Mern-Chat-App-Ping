import { v4 as uuidv4 } from 'uuid';

export const uniqueIdGen = () => {
    const uniqueId = uuidv4();
    return uniqueId;
}