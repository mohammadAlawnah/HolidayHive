import { Router } from "express";
const router = Router()
import { auth } from "../../middleware/auth.middleware.js";
import { endPoints } from "./tripUser.role.js";
import { asyncHandler } from "../../utls/asyncHandler.js";
import * as tripUserControllar from './tripUser.controllar.js'
import userModel from "../../../DB/model/user.model.js";

router.get('/',asyncHandler(auth(endPoints.get)),asyncHandler(tripUserControllar.get))
router.post('/',asyncHandler(auth(endPoints.create)),asyncHandler(tripUserControllar.create))
router.delete('/',asyncHandler(auth(endPoints.delete)),asyncHandler(tripUserControllar.remove))




export default router