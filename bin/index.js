#! /usr/bin/env node
import { program } from 'commander';
import { createDir } from '../commands/createDir.js';
import { setExpress } from '../commands/setExpress.js'

program
    .name("dev-tools")
    .description("Provides support for tasks like creating directory structure, API testing etc.")
    .version("1.0.0");

program
    .command("create-dir [projectType]")
    .description("Automatically creates directory structure for your project. Run command from root directory of project")
    .option("-d, --dir", "Supported project types")
    .action(createDir);

program
    .command("set-express")
    .description("Sets up a basic out of the box express project.")
    .action(setExpress);

program.parse();