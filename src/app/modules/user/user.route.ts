import { Router } from 'express';
import auth from '../../middleware/auth';
import upload from '../../middleware/fileUpload';
import parseData from '../../middleware/parseData';
import validateRequest from '../../middleware/validateRequest';
import { USER_ROLE } from './user.constant';
import { userControllers } from './user.controller';
import userValidation from './user.validation';
import { authValidation } from '../auth/auth.validation';

const router = Router();

router.post(
  '/signup',
  validateRequest(userValidation.createUserZodSchema),
  userControllers.signupuser,
);
router.patch(
  '/',
  auth(USER_ROLE.user, USER_ROLE.sup_admin),
  upload.single('file'),
  userControllers.updateProfile,
);

router.patch(
  '/phone/update',

  userControllers.updatePhoneNumber,
);
router.get(
  '/profile',
  auth(USER_ROLE.sup_admin, USER_ROLE.user),
  userControllers.getme,
);

router.get(
  '/:id',
  auth(USER_ROLE.vendor, USER_ROLE.admin),
  userControllers.getsingleUser,
);
// router.get(
//   '/',
//   auth(USER_ROLE.vendor, USER_ROLE.admin),
//   userControllers.getAllUsers,
// );

router.patch(
  '/:id',
  auth(USER_ROLE.user),
  parseData(),
  auth(USER_ROLE.sup_admin),
  userControllers.updateProfile,
);
router.delete(
  '/',
  auth(USER_ROLE.user, USER_ROLE.sup_admin),
  validateRequest(authValidation.deleteAccountZodSchema),
  userControllers.deleteAccount,
);
export const userRoutes = router;
