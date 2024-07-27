import { Router } from "express";
import * as couponControllar from './coupon.controllar.js';
import { endPoints } from "./coupon.role.js";
import { auth } from "../../middleware/auth.middleware.js";
import * as schema from './coupon.validation.js'
import { validation } from "../../middleware/validation.middleware.js";
import { asyncHandler } from "../../utls/asyncHandler.js";

const router = Router();

router.post('/',validation(schema.createCouponSchema),asyncHandler(auth(endPoints.create)),asyncHandler(couponControllar.create))
router.get('/:id',asyncHandler(auth(endPoints.getAdmin)),asyncHandler(couponControllar.getCoupon))
router.get('/',asyncHandler(auth(endPoints.getAdmin)),asyncHandler(couponControllar.getAll))
router.patch('/:id',asyncHandler(auth(endPoints.update)),asyncHandler(couponControllar.update))

export default router;