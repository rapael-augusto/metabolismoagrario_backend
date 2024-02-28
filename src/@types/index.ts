import { User as RawUser } from "@prisma/client";

export type User = Omit<RawUser, 'password'>