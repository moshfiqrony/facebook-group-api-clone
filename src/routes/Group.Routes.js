import {Router} from 'express'
import {createGroup, getGroup, updateGroup, getGroups, addModerator, removeModerator, addMember, removeMember, addAdmin, removeAdmin} from '../controllers/Group.Controllers'

const router = Router();

router.route('/').post(createGroup);
router.route('/').get(getGroups);
router.route('/:id').get(getGroup);
router.route('/:id').put(updateGroup);
router.route('/:id/moderator').put(addModerator)
router.route('/:id/moderator').delete(removeModerator)
router.route('/:id/member').put(addMember)
router.route('/:id/member').delete(removeMember)
router.route('/:id/admin').put(addAdmin)
router.route('/:id/admin').delete(removeAdmin)
// router.route('/:id/meta').get(getGroupMeta);
// router.route('/:id/meta').get(createGroupMeta);
// router.route('/:id').delete(removeGroup);
// router.route('/:id/admin').get(getAdmins)
// router.route('/:id/admin').put(addAdmin)
// router.route('/:id/moderator').get(getModerator)

export default router;