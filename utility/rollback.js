import fs from 'fs';
import chalk from 'chalk';

const rollback = async(createdDir) => {
    try {
        for(let dir of createdDir){
            await fs.rmdir(dir);
            console.log(chalk.yellow.bold(`${dir} rolled back successfully`));
        }
    } catch (err) {
        console.error(chalk.red.bold("Error rolling back"));
        console.error(chalk.red.bold("Your filesystem may have been left in an unchecked state"));
    }
}

export { rollback };