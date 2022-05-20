import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RolePermissionsSchema = new Schema({
  roleName: {
    type: String,
    required: [
      true, 'Role Name is required.'
    ],
    unique: true
  },
  permissions: {
    type: [String],
    required: [
        true, 'permissions are required.'
    ],
  },
});
export const RolePermissionsEntity = mongoose.model('Role', RolePermissionsSchema);