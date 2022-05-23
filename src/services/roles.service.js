import * as roleRepository from '../repostories/role.repository.js';

export  async function getRoleByRoleName(roleName) {
    try {
        return roleRepository.findRoleByName(roleName);
    } catch (error) {
        throw error;
    }
}

export async function getRoles(rolesIds) {
    try {
        return roleRepository.findRoles(rolesIds);
    } catch (error) {
        throw error;
    }
}