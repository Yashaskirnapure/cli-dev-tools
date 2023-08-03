import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import chalk from 'chalk';

const currentModuleUrl = new URL(import.meta.url);
const currentModulePath = fileURLToPath(currentModuleUrl);
const currentModuleDir = dirname(currentModulePath);
const projectRootPath = dirname(dirname(currentModuleDir));

const expressInstall = () => {
    return new Promise((resolve, reject) => {    
        const batchFilePath = join(projectRootPath, 'scripts', 'setExpress.bat');
    
        const childProcess = spawn('cmd', ['/c', batchFilePath]);
        childProcess.stdout.on('data', (data) => { console.log(data.toString()); });
        childProcess.stderr.on('data', (data) => { console.error(data.toString());});
    
        childProcess.on('close', (code) => {
            if (code === 0) {
                console.log(chalk.green.bold("Installed dependencies successfully"));
                resolve();
            } else {
                console.log(chalk.red.bold("Could not install express dependencies"));
                reject();
            }
        });

        childProcess.on('err', (err) => {
            console.log(chalk.red.bold(err.message));
            reject();
        })
    });
};

export { expressInstall };