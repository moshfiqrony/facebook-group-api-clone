import {Router} from 'express'
import {createPost, getPosts} from '../controllers/Post.Controllers'

const router = Router();

router.route('/:id').post(createPost);
router.route('/:id').get(getPosts);

export default router;