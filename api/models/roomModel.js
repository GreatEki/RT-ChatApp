import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const roomSchema = new Schema({
	name: {
		type: String,
		required: true,
	},

	createdBy: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},

	members: {
		type: Array,
		default: [],
	},
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
