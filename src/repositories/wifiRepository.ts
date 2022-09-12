import { prisma } from "../config/database.js";
import { wifiData } from "../types/wifiType.js";

export async function findWifeByUserId(userId: number) {
    const result = await prisma.wiFis.findMany({
        where: { userId },
    });
    return result;
}

export async function  insertWifi(wifi: wifiData) {
    await prisma.wiFis.create({ data: wifi });
}