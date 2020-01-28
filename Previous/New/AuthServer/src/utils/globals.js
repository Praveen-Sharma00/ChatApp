
import chalk from 'chalk';

global.log= console.log
global.red = chalk.red
global.green = chalk.green
global.yellow=chalk.yellow

global.success = green.bold
global.warning = yellow.bold
global.error = red.bold