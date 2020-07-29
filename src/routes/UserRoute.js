import {Router} from 'express'
import {getUser} from '../controllers/User.Controller.js'


const router = Router();

router.route('/')
.get(getUser)


export default router