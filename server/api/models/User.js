import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	firstName: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 30
	},
	lastName: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 30
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
});

export default mongoose.model('User', userSchema);