import { UserModel, ProfileModel } from '../models/User.Models'
import { CREATED, NOT_ACCEPTABLE, NOT_FOUND, OK } from 'http-status-codes'
import { hash } from 'bcrypt'

export const getUser = async (req, res) => {
    if (req?.user?.id) {
        try {
            const user = await UserModel.findById(req.user.id).select('-updatedAt -createdAt -password').exec();
            const profile = await ProfileModel.findOne({user: req.user.id}).select('-updatedAt -createdAt -user').exec();
            if (user && profile) {
                res.status(OK).send({ data: {user: user, profile: profile} })
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

export const getProfile = async(req, res) => {
    try {
        const profile = await ProfileModel.findOne({user: req.user.id});
        if(!profile){
            throw new Error()
        }
        return res.status(OK).send({data: profile})
    } catch (error) {
        return res.status(NOT_FOUND).send({error: error.message})
    }
}

export const updateProfile = async(req, res) => {
    let profile = {};
    const {first_name, last_name, bio} = req.body;
    if(first_name){
        profile.first_name = first_name;
    }
    if(last_name){
        profile.last_name = last_name;
    }
    if(bio){
        profile.bio = bio
    }
    const newProfile = await ProfileModel.updateOne({user: req.user.id}, profile).exec();
    if(newProfile){
        return res.status(OK).send({data: 'Updated'})
    }
}