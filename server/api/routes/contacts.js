import express from 'express';

import * as contactsController from '../controllers/contactsController';
import upload from '../middleware/imageUpload';
import tokenAuth from '../middleware/token_auth';

const router = express.Router();

router.get('/', contactsController.getAllContacts);
router.post('/', tokenAuth, upload.single('photo'), contactsController.createContact);
router.get('/:contactId', contactsController.getContactById);
router.patch("/:contactId", tokenAuth, upload.single('photo'), contactsController.updateContact);
router.delete("/:contactId", tokenAuth, contactsController.deleteContact);

export default router;