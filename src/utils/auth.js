import { UserModel, ProfileModel } from '../models/User.Models';
import { TokenModel } from '../models/Token.Models';
import { sign, verify } from 'jsonwebtoken';
import { config } from './config';
import { NOT_ACCEPTABLE, CREATED, OK, NOT_FOUND, UNAUTHORIZED } from 'http-status-codes'
import { prepareError } from './functions'
import { hash, compare } from 'bcrypt'

export const verifyToken = token =>
    new Promise((resolve, reject) => {
        verify(token, config.secrets.jwt, (err, payload) => {
            if (err) return reject(err)
            resolve(payload)
        })
    })

export const newToken = (user) => {
    return sign({ id: user.id }, config.secrets.jwt, {
        expiresIn: config.secrets.jwtExp
    })
}

export const login = async (req, res) => {
    const { username, password } = req?.body;
    let match = false;
    if (!username || !password) {
        return res.status(NOT_ACCEPTABLE).send(prepareError(
            'Username Password is required',
            'required',
            'body'
        ))
    }
    try {
        const user = await UserModel.findOne({ username: username })
        if (!user) {
            return res.status(NOT_FOUND).send(prepareError(
                'No user found',
                'Not Found',
                'user'
            ))
        }
        await compare(password, user.password)
            .then(res => {
                match = res
            })
        if (match) {
            let token = await newToken(user)
            let authenticated = await TokenModel.findOneAndUpdate({ user: user.id }, {token: token})
            if (authenticated && token) {
                return res.status(OK).send({
                    data: {
                        email: user.email,
                        username: user.username
                    }, token: token
                })
            }
            return res.status(NOT_ACCEPTABLE).send(prepareError(
                'Could not login',
                'authentication',
                'token'
            ))
        } else {
            return res.status(NOT_ACCEPTABLE).send(prepareError(
                'Password not matched',
                'verify',
                'password'
            ))
        }

    } catch (error) {
        return res.status(NOT_FOUND).send({ error: error })
    }
}

export const register = async (req, res) => {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        return res.status(NOT_ACCEPTABLE).send(prepareError(
            'Email Password Username is required',
            'required',
            'body'
        ))
    }

    if (req?.body?.password?.trim()?.length >= 6) {
        try {
            let pass = '';
            await hash(req.body.password, 10)
                .then(hash => {
                    pass = hash
                })
            const user = await UserModel.create({ ...req.body, password: pass })
            const profile = await ProfileModel.create({user: user.id})
            const authenticated = await TokenModel.create({ user: user.id, token: '' })
            if (!user || !authenticated || !profile) {
                return res.status(NOT_ACCEPTABLE).send(prepareError('Cannot create user', 'tracked', 'user'))
            }
            return res.status(CREATED).send({
                data: 'User created'
            });
        } catch (error) {
            return res.status(NOT_ACCEPTABLE).send({ error: error.errors[Object.keys(error.errors)[0]].properties })
        }
    } else {
        return res.status(NOT_ACCEPTABLE).send(prepareError(
            'Password length should be 6 or more',
            'tracked',
            'password'
        ))
    }
}

export const protect = async (req, res, next) => {
    const token = req?.headers?.authorization?.split('Bearer ')[1];
    if (!token) {
        return res.status(UNAUTHORIZED).send(prepareError('No valid token', 'token', 'validation'))
    }
    try {
        const payload = await verifyToken(token);
        const user = await UserModel.findById(payload.id)
            .select('-password')
            .exec();
        const authenticated = await TokenModel.findOne({user: user.id}).exec();
        if(user && authenticated.token === token){
            req.user = user
            next();
        }else{
            return res.status(UNAUTHORIZED).send(prepareError(
                'Could not validate',
                'validation',
                'token'
            ))
        }
    } catch (error) {
        return res.status(UNAUTHORIZED).send({ error: error })
    }
}