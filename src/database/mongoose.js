import mongoose from 'mongoose';
import fs from 'fs';
import * as roleRepository from '../repostories/role.repository.js';
import { dirname } from 'path';
const uri = process.env.DBURI;
export async function connect() {
    try {
        await mongoose.connect(uri);
        const db = mongoose.connection;
        db.on('disconnected', (err) => {
            console.log(`MongoDB is  disconnected ${err.message}`);
        });
        seedData();
        console.log(`MongoDB is now connected on ${uri}`);

    } catch (err) {
        console.log(`MongoDB is  disconnected ${err.message}`);
        process.exit(-1);
    }

}


async function seedData() {
    const roles =  JSON.parse(
        fs.readFileSync(new URL('../data/roles.json', import.meta.url), 'utf-8')
    );
    const savedRoles = (await roleRepository.getAllRolesName()).map((role)=> role.roleName);
    const newRoles = roles.filter((role) => !savedRoles.includes(role.roleName));
    await roleRepository.createManyRoles(newRoles);
}