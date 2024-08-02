import { auth } from '../../middleware/auth.middleware.js';
import { validation } from '../../middleware/validation.middleware.js';
import { asyncHandler } from '../../utls/asyncHandler.js'
import { Router } from 'express'
import { endPoints } from './destination.role.js';
import fileUpload, { filleType } from '../../utls/multer.js';
import * as destinationControllar from './destination.controllar.js'
const router = Router({mergeParams : true});

router.get('/',asyncHandler(destinationControllar.getAll))
router.post('/',asyncHandler(auth(endPoints.create)),fileUpload(filleType.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImages',maxCount:5},
]),asyncHandler(destinationControllar.addDestination))

router.get('/:id',asyncHandler(auth(endPoints.get)),asyncHandler(destinationControllar.getDestinations))

router.patch('/:id',asyncHandler(auth(endPoints.create)),asyncHandler(destinationControllar.updateDestenation))


export default router

