import Cryptr from "cryptr";
import dotenv from "dotenv";

import * as wifiRepository from "../repositories/wifiRepository.js";
import { wifiData } from "../types/wifiType.js";
import { verifyTitle, verifyList } from "./utils.js";

dotenv.config();
const cryptr = new Cryptr(process.env.SECRET || 'secret');

export async function registerWifi(wifi: wifiData) {
    const userWifiList = await
        wifiRepository.findWifeByUserId(wifi.userId);
    verifyTitle(userWifiList, wifi.title);

    const hashWifiPass = cryptr.encrypt(wifi.password);

    await wifiRepository.insertWifi({
        ...wifi,
        password: hashWifiPass
    });
}

export async function showUserWifis(userId: number) {
    const wifiList =  await
        wifiRepository.findWifeByUserId(userId);
    verifyList(wifiList, "wifis");

    const userWifiList = wifiList.map((wifi) => ({
        ...wifi, password: cryptr.decrypt(wifi.password)
    }));

    return userWifiList;
}

export async function showWifiById(wifiId: number, userId: number) {
    const wifi = await verifyWifiOwner(wifiId, userId);

    return {
        ...wifi, password: cryptr.decrypt(wifi.password)
    }
}

export async function removeWifi(wifiId: number, userId: number) {
    await verifyWifiOwner(wifiId, userId);

    const result = await wifiRepository.removeWifi(wifiId);

    return result;
}

async function verifyWifiOwner(wifiId: number, userId: number) {
    const wifi = await wifiRepository.findWifiById(wifiId);

    if(!wifi)
        throw { code: 'NotFound', message: 'Wifi not found' };
    if(wifi.userId !== userId)
        throw { code: 'Unauthorized', message: 'User not allowed' };
    
    return wifi;
}