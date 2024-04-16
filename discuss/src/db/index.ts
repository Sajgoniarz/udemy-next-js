import { PrismaClient } from "@prisma/client";

declare global {
    var dbClient: PrismaClient
}

if (!global.dbClient) {
    global.dbClient = new PrismaClient();
}

export default global.dbClient;