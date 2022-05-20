import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// const SessionSchema = new Schema({
//   userId: { type: Schema.ObjectId, ref: 'User' }
//   permissions: {
//     type: [String],
//     required: [
//         true, 'permissions are required.'
//     ],
//   },
// });
// export const RolePermissionsEntity = mongoose.model('Session', SessionSchema);