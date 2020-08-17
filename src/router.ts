import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import { Router } from 'express';
import execa from 'execa';

const configPath = path.resolve('./deployment.yml');
const configFile = fs.readFileSync(configPath, 'utf8');
const config = yaml.parse(configFile);

console.log('configuration loaded successfully', config);
console.log(Date.now());

const router = Router();
router.get('/test', (_req, res) => {
    const result = 'start' + JSON.stringify(execa.sync('docker-compose', ['help'])) + 'end';
    console.log(result);
    res.send(result);
});

export default router;
