import mongoose from 'mongoose';
import Contact from '../models/Contact';

export const getAllContacts = (req, res, next) => {
	Contact.find()
		.exec()
		.then(docs => {
			console.log(docs);
			res.status(200).json(docs);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
};

export const getContactById = (req, res, next) => {
	const id = req.params.contactId;
	Contact.findById(id)
		.exec()
		.then(doc => {
			console.log("From Database", doc);
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
	const contact = new Contact({
		_id: new mongoose.Types.ObjectId,
		name: req.body.name,
		phone: req.body.phone,
		company: req.body.company,
		email: req.body.email
	});
	contact.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: "Handling POST request to contact",
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

	Contact.update({ _id: id }, { $set: props })
		.exec()
		.then(result => {
			console.log(result);
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
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
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
};