import {Router} from 'express'
import {createGroup, getGroup, updateGroup} from '../controllers/Group.Controllers'

const router = Router();

router.route('/').post(createGroup);
router.route('/:id').get(getGroup);
router.route('/:id').put(updateGroup);
// router.route('/:id/meta').get(getGroupMeta);
// router.route('/:id/meta').get(createGroupMeta);
// router.route('/:id').delete(removeGroup);
// router.route('/:id/admin').get(getAdmins)
// router.route('/:id/admin').put(addAdmin)
// router.route('/:id/moderator').get(getModerator)
// router.route('/:id/moderator').put(addModerator)

export default router;