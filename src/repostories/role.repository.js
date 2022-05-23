import { RoleEntity } from "../models/role.model.js";
export function createRole(role) {
    try {
         return RoleEntity.create(role);
    } catch (error) {
        throw error;
    }
}

export function createManyRoles(roles) {
    try {
        return RoleEntity.insertMany(roles);
    } catch (error) {
        throw error;
    }
}

export function getAllRolesName() {
    try {
        return RoleEntity.find({}, 'roleName -_id');
    } catch (error) {
        throw error;
    }
}

export function findAndUpdate(roleName, role) {
    try {
        return RoleEntity.findOneAndUpdate(roleName, {$set: role});
    } catch (error) {
        throw error;
    }
}
