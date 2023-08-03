import chalk from 'chalk';
import { rollback } from '../rollback.js';
import fs from 'fs';
import path from 'path';

const springDir = async () => {
    let currentPath = "./src/main/java";
    let isDirectory = true;

    while (isDirectory) {
        const files = fs.readdirSync(currentPath);
        if (files.length === 1 && fs.statSync(path.join(currentPath, files[0])).isDirectory()){
            currentPath = path.join(currentPath, files[0]);
        } else {
            isDirectory = false;
        }
    }

    let targetDir = [
        `${currentPath}/service`,
        `${currentPath}/config`,
        `${currentPath}/controller`,
        `${currentPath}/repository`,
        `${currentPath}/model`
    ]

    let createdDir = [];
    try{
        for (const dir of targetDir) {
            await fs.mkdir(dir, {recursive : true}, (err) => {if(err) throw err;});
            createdDir.push(dir);
            console.log(chalk.green.bold(`${dir} created succesfully`));
        }
        console.log(chalk.green.bold("Task completed succesfully"));
    }catch(err){
        console.log(`Error in creating directory`);
        rollback(createdDir);
    }
}

export { springDir };