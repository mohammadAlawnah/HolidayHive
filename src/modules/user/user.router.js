import { Router } from 'express';
import * as userControllar from './user.controllar.js'
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './user.role.js';
import { asyncHandler } from '../../utls/asyncHandler.js';
import { validation } from '../../middleware/validation.middleware.js';
import * as validationSchema from './user.validation.js'
const router = Router();

router.get('/',asyncHandler(auth(endPoints.get)),asyncHandler(userControllar.getAllUsers))
router.get('/active',asyncHandler(auth(endPoints.get)),asyncHandler(userControllar.getActiveUsers))
router.get('/notActive',asyncHandler(auth(endPoints.get)),asyncHandler(userControllar.getNotActiveUsers))
router.get('/confirmed',asyncHandler(auth(endPoints.get)),asyncHandler(userControllar.getConfirmedUsers))
router.get('/notConfirmed',asyncHandler(auth(endPoints.get)),asyncHandler(userControllar.getNotConfirmedUsers))

router.put('/updatRole',validation(validationSchema.updatRoleSchema),asyncHandler(auth(endPoints.updatAdmin)),asyncHandler(userControllar.updatRole))

export default router;