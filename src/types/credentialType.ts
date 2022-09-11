import { Sites, Credentials } from "@prisma/client";

export type credentialData = Omit<Credentials, "id">;
export type credentialUrlData = Partial<Sites> & Partial<Credentials>;