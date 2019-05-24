import jwt from 'jsonwebtoken';
import config from '../../config.json';
import User from '../models/User';

export default (req, res, next) => {
	const authHeader = req.headers.authorization;
	let token;

	if (authHeader) {
		token = authHeader.split(' ')[1];
	}

	if (token) {
		jwt.verify(token, config.JWT_KEY, (err, decoded) => {
			if (err) {
				res.status(401).json({ error: "Failed to authenticate" });
			} else {
				User.findById(decoded.userId).exec()
					.then(user => {
						if (!user) {
							res.status(404).json({ error: "No such user" })
						} else {
							req.userData = user;
							next();
						}
					});
			}
		});
	} else {
		res.status(403).json({
			error: "No token provided"
		});
	}
};