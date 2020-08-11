import {GroupMetaModel, GroupModel} from '../models/Group.Models'
import { NOT_FOUND, OK, CREATED, NOT_ACCEPTABLE } from 'http-status-codes'
import {prepareError} from '../utils/functions';

export const createGroup = async(req, res) => {
    try {
        const group = await GroupModel.create({
            user: req.user.id,
            name: req.body.name,
            description: req?.body?.description ?? '',
            type: req.body.type,
        })
        const groupMeta = await GroupMetaModel.create({
            admins: [req.user.id],
            moderator: [],
            group: group.id
        })
        if(group && groupMeta){
            return res.status(CREATED).send({data: group})
        }
    } catch (error) {
        res.status(NOT_ACCEPTABLE).send({error: error.message})
    }
}

export const getGroup = async(req, res) => {
    try {
        const group = await GroupModel.findById(req.params.id);
        if(group){
            return res.status(OK).send({data: group})
        }
    } catch (error) {
        res.status(NOT_FOUND).send({error: error})
    }
}

export const getGroups = async(req, res) => {
    try {
        const group = await GroupModel.find({user: req.user.id});
        if(group){
            return res.status(OK).send({data: group})
        }
    } catch (error) {
        res.status(NOT_FOUND).send({error: error})
    }
}


export const updateGroup = async(req, res) => {
    if(!req.body.name && !req.body.description && !req.body.type){
        return res.status(NOT_ACCEPTABLE).send(prepareError('No request body', 'body', 'tracked'));
    }
    try {
        const group = await GroupModel.updateOne(
            {_id: req.params.id},
            {...req.body}
        ).maxTime(10000).exec();
        if(group){
            return res.status(OK).send({data: group})
        }
    } catch (error) {
        res.status(NOT_FOUND).send({error: error})
    }
}

