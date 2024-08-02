import { Router } from "express";
import * as tripControllar from './trip.controllar.js'
import { auth } from "../../middleware/auth.middleware.js";
import { endPoints } from "./trip.role.js";
import { validation } from "../../middleware/validation.middleware.js";
import { asyncHandler } from "../../utls/asyncHandler.js";

const router = Router()

router.get('/',asyncHandler(tripControllar.getAll))
router.get('/:id',asyncHandler(tripControllar.get))
router.post('/',asyncHandler(auth(endPoints.create)),asyncHandler(tripControllar.create))
router.put('/:id',asyncHandler(auth(endPoints.update)),asyncHandler(tripControllar.update))
router.delete('/:id',asyncHandler(auth(endPoints.delete)),asyncHandler(tripControllar.remove))

export default router