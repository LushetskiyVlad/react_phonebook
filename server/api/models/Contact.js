import mongoose from "mongoose";

const Schema = mongoose.Schema;

const contactSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 30
	},
	phone: {
		type: String,
		unique: true,
		required: true
	},
	company: {
		type: String
	},
	email: {
		type: String,
		unique: true
	}
});

export default mongoose.model('Contact', contactSchema);