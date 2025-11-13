import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
export const config = {
    DATABASE: process.env.DATABASE,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT,
    SERVER_PORT: process.env.SERVER_PORT || 3000,
    MODE: process.env.MODE
};
//# sourceMappingURL=config.js.map