import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  roleName: {
    type: String,
    required: [
      true, 'Role Name is required.'
    ],
    unique: true
  },
  permissions: {
    type: {},
    required: [
        true, 'permissions are required.'
    ],
  },
});
export const RoleEntity = mongoose.model('Role', RoleSchema);