import { Router } from 'express'
import UserRoute from './User.Routes'
import GroupRoutes from './Group.Routes'
import { UNAUTHORIZED, NOT_FOUND, OK } from 'http-status-codes';
import { prepareError } from '../utils/functions';
import { TokenModel } from '../models/Token.Models';

const router = Router();

router.use('/user', UserRoute);
router.use('/group', GroupRoutes);
router.route('/logout')
    .post(async(req, res) => {
        const user = req?.user;
        if (!user) {
            res.status(NOT_FOUND).send(prepareError(
                'User not found',
                'Not Found',
                'user'
            ));
        }
        const logout = await TokenModel.findOneAndUpdate({user: user.id}, {token: ''})
        if(logout){
            res.status(OK).send({data: "Success"})
        }
    })

export default router;