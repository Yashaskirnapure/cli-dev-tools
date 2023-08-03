import chalk from 'chalk';
import { rollback } from '../rollback.js';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const currentModuleUrl = new URL(import.meta.url);
const currentModulePath = fileURLToPath(currentModuleUrl);
const root = dirname(currentModulePath);

const expressDir = async () => {
    let currentPath = process.cwd();

    let targetDir = [
        `${currentPath}/middlewares`,
        `${currentPath}/router`,
        `${currentPath}/controller`,
        `${currentPath}/model`
    ]

    let createdDir = [];
    try{
        for (const dir of targetDir) {
            await fs.mkdir(dir, {recursive : true}, (err) => {if(err) throw err;});
            createdDir.push(dir);
        }
        console.log(chalk.green.bold("Project directories created succesfully"));
        try{
            const data = fs.readFileSync(`${root}/raws/index.txt`).toString();
            await fs.writeFile(`${currentPath}/index.js`, data, (err, buff) => {
                if(err) console.log(chalk.red.bold("error creating index.js"));
                else console.log(chalk.green.bold("run 'node index.js' command to start the server"))
            });
        }catch(err){
            console.log(chalk.red.bold(err));
        }
    }catch(err){
        console.log(`Error in creating directory`);
        rollback(createdDir);
    }
}

export { expressDir };