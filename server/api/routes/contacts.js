import express from 'express';

import * as contactsController from '../controllers/contactsController';
import tokenAuth from '../middleware/token_auth';

const router = express.Router();

router.get('/', contactsController.getAllContacts);
router.post('/', tokenAuth, contactsController.createContact);
router.get('/:contactId', contactsController.getContactById);
router.patch("/:contactId", tokenAuth, contactsController.updateContact);
router.delete("/:contactId", tokenAuth, contactsController.deleteContact);

export default router;