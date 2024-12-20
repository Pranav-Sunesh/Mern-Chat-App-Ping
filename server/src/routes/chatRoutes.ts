import { Router } from "express";
import { sendRequest } from "../controllers/chat/sendRequest.controller";
import { getRequest } from "../controllers/chat/getRequest.controller";
import { acceptRequest } from "../controllers/chat/acceptRequest.controller";
import { getChats } from "../controllers/chat/getChats.controller";
import { sendMessage } from "../controllers/chat/sendMessage.controller";
import { getMessages } from "../controllers/chat/getMessages.controllers";
import { getUsers } from "../controllers/chat/getUser.controllers";
import { deleteRequest } from "../controllers/chat/deleteRequest.controller";
import { profileUpdate } from "../controllers/chat/profileUpdate.controllers";
import { upload } from "../config/multer.config";
import { deleteProfilePicture } from "../controllers/chat/deleteProfilePicture.controllers";
import { deleteChats } from "../controllers/chat/deleteChat.controllers";
import { createGroup } from "../controllers/chat/createGroup.controllers";
import { removeParticipant } from "../controllers/chat/removeParticipant.controllers";

const router: Router = Router();

router.get('/getuser/:username', getUsers);
router.post("/sendrequest", sendRequest);
router.get("/getrequest/:username",getRequest)
router.put("/acceptrequest", acceptRequest);
router.delete('/deleterequest', deleteRequest);

router.get("/getchats/:username", getChats);
router.post("/sendmessage",sendMessage);
router.post('/getmessages', getMessages);
router.post('/profile/update', upload.single('image'), profileUpdate);
router.delete('/profile/deletepfp', deleteProfilePicture);
router.delete('/deletechat', deleteChats);
router.post('/create/group', upload.single('image'), createGroup);
router.delete('/delete/participant', removeParticipant)

export default router;