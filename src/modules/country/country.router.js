import { Router } from 'express'
import * as countryControllar from './country.controllar.js'
import { asyncHandler } from '../../utls/asyncHandler.js';
import { auth } from '../../middleware/auth.middleware.js';
import * as schemaValidation from './country.validation.js'
import destinationRouter from '../destination/destination.router.js'
import { endPoints } from './country.role.js';
import fileUpload, { filleType } from '../../utls/multer.js';
const router = Router({caseSensitive : true});

router.use('/:id/destination',asyncHandler(destinationRouter))

router.post('/',asyncHandler(auth(endPoints.create)),fileUpload(filleType.image).single('image')
,asyncHandler(countryControllar.addCountry))

router.get('/',asyncHandler(auth(endPoints.get)),asyncHandler(countryControllar.getAll))
router.get('/active',asyncHandler(countryControllar.getActive))
router.get('/:id',asyncHandler(countryControllar.getContry))

router.put('/:id',asyncHandler(auth(endPoints.create)),asyncHandler(countryControllar.updateCountry))

router.delete('/:id',asyncHandler(auth(endPoints.delete)),asyncHandler(countryControllar.deleteContry))


export default router;
