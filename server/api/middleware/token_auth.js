import jwt from 'jsonwebtoken';
import config from '../config/config';

export default (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const decoded = jwt.verify(token, config.JWT_KEY);
		req.userData = decoded;
		next();
	} catch (error) {
		return res.status(401).json({
			message: error.message
		});
	}
};