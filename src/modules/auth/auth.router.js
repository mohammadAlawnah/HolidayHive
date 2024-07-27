import { checkEmail } from '../../middleware/checkEmail.middleware.js';
import { validation } from '../../middleware/validation.middleware.js';
import { asyncHandler } from '../../utls/asyncHandler.js'
import * as authControllar from './auth.controllar.js'
import { Router } from 'express'
import { loginSchema, registerSchema } from './auth.validation.js';
const router = Router();

router.post('/register',validation(registerSchema),asyncHandler(checkEmail),asyncHandler(authControllar.register))
router.post('/login',validation(loginSchema),asyncHandler(authControllar.login))

export default router