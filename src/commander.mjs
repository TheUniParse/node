import { program } from 'commander'
import inquirer from 'inquirer'

program
  .version('1.0.0')
  // node commander.mjs --version | -V
  .description('A simple cli tool to greets the user')
  // node commander.mjs --help | -h

program
  .command('greet')
  .description('prompt the user for their name and greet them')
  // node commander.mjs greet --help | -h
  .action(async () => {
    const { name } = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'waht your name'
    })

    console.log(`hello ${name} !!`)
  })

program.parse(process.argv)

// node commander.mjs greet