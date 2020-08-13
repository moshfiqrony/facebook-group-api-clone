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
            members:[req.user.id],
            admins: [req.user.id],
            moderators: [],
        })
        if(group){
            return res.status(CREATED).send({data: group})
        }
    } catch (error) {
        res.status(NOT_ACCEPTABLE).send({error: error.message})
    }
}

export const getGroup = async(req, res) => {
    try {
        const group = await GroupModel.findOne(req.params.id);
        if(group){
            return res.status(OK).send({data: group})
        }
    } catch (error) {
        res.status(NOT_FOUND).send({error: error})
    }
}

export const getGroups = async(req, res) => {
    try {
        const groups = await GroupModel.find({});
        if(groups){
            console.log(req.user.id)
            return res.status(OK).send({data: groups.filter(item => item.members.includes(req.user.id))})
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

