import { PostModel } from '../models/Post.Models'
import { GroupModel } from '../models/Group.Models'
import { NOT_ACCEPTABLE, BAD_REQUEST, OK, NOT_FOUND, CREATED } from 'http-status-codes'

export const createPost = async (req, res) => {
    if (!req?.body?.content?.trim()) {
        return res.status(NOT_ACCEPTABLE).send({ error: "Content required" });
    }

    try {
        const post = await PostModel.create({
            owner: req.user.id,
            content: req.body.content.trim(),
            group: req.params.id,
            comments: [],
            media: req?.body?.media ?? null,
        })
        if (post) {
            return res.status(CREATED).send({ data: post })
        }
        return res.status(BAD_REQUEST).send({ error: 'Try again' })
    } catch (error) {
        return res.status(NOT_FOUND).send({ error: 'Try again' })
    }
}


export const getPosts = async (req, res) => {
    try {
        const group = await GroupModel.findOne({
            _id: req.params.id,
            members: { "$in": [req.user.id] }
        })
        if (!group) {
            return res.status(NOT_FOUND).send({ error: 'Try again' })
        }
        const posts = await PostModel.find({ group: group._id })
        .populate('owner', '-password -createdAt -updatedAt')
        if (posts) {
            return res.status(OK).send({ data: posts })
        }
        return res.status(NOT_FOUND).send({ error: 'Try again' })
    } catch (error) {
        return res.status(NOT_FOUND).send({ error: 'Try again' })
    }
}