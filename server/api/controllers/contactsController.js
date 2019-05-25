import mongoose from 'mongoose';
import Contact from '../models/Contact';
import { apiPrefix } from '../../config.json';

function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

export const getAllContacts = (req, res, next) => {
	if (req.query.search) {
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');

		Contact.find({ user: req.userData._id }).find({ name: regex })
			.exec()
			.then(docs => {
				res.status(200).json(docs);
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	}
	else {
		Contact.find({ user: req.userData._id })
			.exec()
			.then(docs => {
				res.status(200).json(docs);
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	}
};

export const getContactById = (req, res, next) => {
	const id = req.params.contactId;
	Contact.findById(id)
		.exec()
		.then(doc => {
			if (doc) {
				res.status(200).json(doc);
			} else {
				res.status(404).json({
					message: "No valid entry for provovided ID"
				});
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
};

export const createContact = (req, res, next) => {
	console.log(req.body);
	const photo = req.file ? `${apiPrefix}/uploads/${req.file.filename}` : "";

	const contact = new Contact({
		_id: new mongoose.Types.ObjectId,
		name: req.body.name,
		phone: req.body.phone,
		company: req.body.company,
		email: req.body.email,
		photo: photo,
		user: req.userData._id
	});

	contact.save()
		.then(result => {
			res.status(201).json({
				message: "contact added successfully",
				createdContact: result
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
};

export const updateContact = (req, res) => {
	const id = req.params.contactId;
	const props = {};

	for (let [key, value] of Object.entries(req.body)) {
		props[key] = value;
	}
	if(req.file) {
		props.photo = `${apiPrefix}/uploads/${req.file.filename}`;
	}

	Contact.update({ _id: id }, { $set: props })
		.exec()
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
};

export const deleteContact = (req, res) => {
	const id = req.params.contactId;
	Contact.remove({ _id: id })
		.exec()
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
};