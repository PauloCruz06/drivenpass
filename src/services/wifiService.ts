import Cryptr from "cryptr";
import dotenv from "dotenv";

import * as wifiRepository from "../repositories/wifiRepository.js";
import { wifiData } from "../types/wifiType.js";
import { verifyTitle } from "./utils.js";

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