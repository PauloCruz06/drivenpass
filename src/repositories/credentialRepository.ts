import { prisma } from "../config/database.js";
import { credentialData } from "../types/credentialType.js";

export async function findCredentialsByUserId(userId: number) {
    const result = await prisma.credentials.findMany({
        where: { userId },
    });
    return result;
}

export async function findUrlbyUrl(url: string) {
    const result = await prisma.sites.findUnique({
        where: { url },
    });
    return result
}

export async function insertCredential(credential: credentialData) {
    await prisma.credentials.create({ data: credential });
}

export async function insertUrl(url: string) {
    const result = await prisma.sites.create({ data: { url } })
    return result;
}