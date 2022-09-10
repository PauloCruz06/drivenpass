import { Credentials } from "@prisma/client";

export type credentialData = Omit<Credentials, "id">;