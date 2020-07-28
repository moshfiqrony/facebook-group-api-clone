import {Router} from 'express'
import {getUser, createUser} from '../controllers/User.Controller.js'


const router = Router();

router.route('/')
.post(createUser)

router.route('/:id')
.get(getUser)


export default router