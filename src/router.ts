import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import { Router } from 'express';

const configPath = path.resolve('./deployment.yml');
const configFile = fs.readFileSync(configPath, 'utf8');
const config = yaml.parse(configFile);

console.log('configuration loaded successfully', config);

const router = Router();
router.get('/test', (_req, res) => {
    res.sendStatus(200);
});

export default router;
