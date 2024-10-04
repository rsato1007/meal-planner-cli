/*
    FILE DYNAMICALLY LOADS SETTINGS.JSON INTO CODE.
    SEE SETTINGS.JSON FOR SETTING CONFIGURATION
*/
import dotenv from 'dotenv';

dotenv.config();
import fs from 'fs';

const rawData = fs.readFileSync('settings.json', 'utf8');

let settings = JSON.parse(rawData);

const replacePlaceholders = (obj: any) => {
    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            replacePlaceholders(obj[key]);
        } else if (typeof obj[key] === 'string') {
            obj[key] = obj[key].replace(/\{\{(.*?)\}\}/g, (_, envVar) => {
                return process.env[envVar] || obj[key];
            });
        }
    });
}

replacePlaceholders(settings);

export default settings;