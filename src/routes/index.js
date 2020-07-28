import {Router} from 'express'
import UserRoute from './UserRoute'

const router = Router();

router.use('/user', UserRoute);

export default router;