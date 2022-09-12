import { WiFis } from "@prisma/client";

export type wifiData = Omit<WiFis, "id">;