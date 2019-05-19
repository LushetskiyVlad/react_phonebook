import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import config from '../../config.json';
import User from '../models/User';

export const signup = (req, res) => {
	User.find({ email: req.body.email })
		.exec()
		.then(user => {
			if (user.length >= 1) {
				return res.status(409).json({
					message: "Mail exists"
				});
			} else {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						return res.status(500).json({
							error: err
						});
					} else {
						const user = new User({
							_id: mongoose.Types.ObjectId(),
							firstName: req.body.firstName,
							lastName: req.body.lastName,
							email: req.body.email,
							password: hash
						});
						user.save()
							.then(result => {
								res.status(201).json({
									message: "User created"
								});
							}).catch(err => {
								res.status(500).json({
									error: err
								});
							});
					}
				});
			}
		});
};

export const signin = (req, res, next) => {
	User.findOne({ email: req.body.email })
		.exec()
		.then(user => {
			if (user) {
				bcrypt.compare(req.body.password, user.password, (err, result) => {
					if (err) {
						return res.status(401).json({
							message: "Auth failed"
						});
					}
					if (result) {
						const token = jwt.sign({
							email: user.email,
							userId: user._id
						}, config.JWT_KEY);
						return res.status(200).json({
							message: "Auth successfull",
							token
						});
					}
					res.status(401).json({
						message: "Auth failed"
					});
				});
			}
			else {
				return res.status(401).json({
					message: "Auth failed"
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