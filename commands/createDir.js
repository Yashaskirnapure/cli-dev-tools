import chalk from 'chalk';
import { springDir } from '../utility/spring-utility/springDir.js';

const createDir = (projectType, cmd) => {
    if(projectType){
        if(projectType === "spring-boot")
                springDir();
    }
    if(cmd.dir)
        console.log(chalk.green.bold("Supported project types:"));
};

export { createDir };