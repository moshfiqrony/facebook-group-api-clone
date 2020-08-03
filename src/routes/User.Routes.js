import { Router } from 'express'
import { getUser, getProfile, updateProfile } from '../controllers/User.Controllers'


const router = Router();

router.route('/')
    .get(getUser);
router.route('/profile')
    .get(getProfile);
router.route('/profile')
    .put(updateProfile);

export default router