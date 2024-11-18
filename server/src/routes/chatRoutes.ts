import { Router } from "express";
import { sendRequest } from "../controllers/chat/sendRequest.controller";
import { getRequest } from "../controllers/chat/getRequest.controller";
import { acceptRequest } from "../controllers/chat/acceptRequest.controller";
import { getChats } from "../controllers/chat/getChats.controller";
import { sendMessage } from "../controllers/chat/sendMessage.controller";
import { getMessages } from "../controllers/chat/getMessages.controllers";
import { getUsers } from "../controllers/chat/getUser.controllers";

const router: Router = Router();

router.get('/getuser/:username', getUsers);
router.post("/sendrequest", sendRequest);
router.get("/getrequest/:username",getRequest)
router.put("/acceptrequest", acceptRequest);

router.get("/getchats/:username", getChats);
router.post("/sendmessage",sendMessage);
router.post('/getmessages', getMessages)

export default router;