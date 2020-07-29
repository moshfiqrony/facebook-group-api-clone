import { UserModel } from '../models/User.Model'
import { CREATED, NOT_ACCEPTABLE, NOT_FOUND, OK } from 'http-status-codes'
import { hash } from 'bcrypt'

export const getUser = async (req, res) => {
    if (req?.user?.id) {
        console.log(req.user)
        try {
            const user = await UserModel.findById(req.user.id).exec();
            if (user) {
                res.status(OK).send({ data: user })
            }
        } catch (error) {
            res.status(NOT_ACCEPTABLE).send({
                error: error
            })
        }
    } else {
        res.status(NOT_FOUND).send({
            error: 'User not found'
        })
    }
}

export const createUser = async (req, res) => {
    try {
        let pass = null;
        if(req?.body?.password?.trim()?.length > 6){
            await hash(req.body.password, 10)
            .then(hash => {
                pass = hash
            })
        }else{
            res.status(NOT_ACCEPTABLE).send({
                error:{
                    type: 'password',
                    path: 'password',
                    message: 'Minimum length is 6'
                }
            })
        }
        let user = new UserModel({ ...req.body, password: pass })
        user.save()
            .then(response => {
                res.status(CREATED).json({
                    data: response,
                })
            })
            .catch(error => {
                res.status(NOT_ACCEPTABLE).json({
                    error: error.errors[Object.keys(error.errors)[0]].properties
                })
            })
    } catch (error) {
        res.status(400).send({ error: 'error' })
    }
}