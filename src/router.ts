import fs from 'fs';
import yaml from 'yaml';
import { Router } from 'express';

const deploymentFile = fs.readFileSync('./deployment.yml', 'utf8');
const deployment = yaml.parse(deploymentFile);
console.log(deployment);

const router = Router();
router.get('/test', (_req, res) => {
    res.send(200);
});

export default router;
