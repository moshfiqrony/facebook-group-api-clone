import { UserModel } from '../models/User.Model'
import { CREATED, NOT_ACCEPTABLE } from 'http-status-codes'
export const getUser = (req, res) => {
    res.status(400).send({ error: 'No user Found' })
}

export const createUser = async (req, res) => {
    try {
        let user = new UserModel({...req.body})
        user.save()
        .then(response => {
            res.status(CREATED).json({
                data: response,
            })
        })
        .catch(error => {
            res.status(NOT_ACCEPTABLE).json({
                error: error?.errors[Object.keys(error.errors)]['properties']?.message ?? 'email or username exist'
            })
        })
    } catch (error) {
        res.status(400).send({error: 'error'})
    }
}