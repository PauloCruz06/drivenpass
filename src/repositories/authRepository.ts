import { prisma } from "../config/database.js";
import { userData } from "../types/userType.js";

export async function insertUser( user: userData ) {
    await prisma.users.create({ data: user });
}

export async function findAllUsers() {
    const result = await prisma.users.findMany();
    return result;
}