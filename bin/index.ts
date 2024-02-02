#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import { BankAccount } from './bank.js';
import { generateRandomData } from './random_data.js';


const welcomeMessage = chalkAnimation.rainbow('Welcome to Atm Machine! by Sherazi');

async function welcome() {
    welcomeMessage.start();
    setTimeout(() => {
        welcomeMessage.stop();
        startAtm();
    }, 1000);
}
let randomData = generateRandomData();
let bankAccount: BankAccount = new BankAccount(randomData.randomAmount, randomData.randomName, randomData.randomNumber);

async function startAtm() {
    let anim = chalkAnimation.neon(content());
    anim.start();
    setTimeout(() => {
        anim.stop();
    }, 1000);
    let pin = await inquirer.prompt([
        {
            type: 'input',
            name: 'pin',
            message: 'Please enter your 4 digit pin number:'
        }
    ]);
    //if pin is in 4 digit and is a number
    if (pin.pin.length === 4 && !isNaN(parseInt(pin.pin))) {
        console.log(chalk.green(`Welcome ${bankAccount.accountName}!`));
        atmMenu();
    } else {
        console.log(chalk.red('Invalid pin number. Please try again.'));
        startAtm();
    }


}
function atmMenu() {
    // fancy menu log with chalk with some comments and emoji and colors
    console.log(chalk.bgCyan('Atm Menu'));
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'Please select an option:',
            choices: ['Deposit', 'Withdraw', 'Transfer', 'Check Balance', 'Exit']
        }
    ]).then((answers) => {
        switch (answers.menu) {
            case 'Deposit':
                deposit();
                break;
            case 'Withdraw':
                withdraw();
                break;
            case 'Transfer':
                transfer();
                break;
            case 'Check Balance':
                checkBalance();
                break;
            case 'Exit':
                exitConfirmation();
                break;
        }
    });
}
async function deposit() {
    let result = await inquirer.prompt([
        {
            type: 'input',
            name: 'deposit',
            message: 'Please enter the amount you would like to deposit:'
        }
    ]);
    if (!isNaN(parseInt(result.deposit))) {
        bankAccount.deposit(parseInt(result.deposit));
        console.log(chalk.yellow(`$${result.deposit} has been deposited into your account.`));
        await printReceipt(`$${result.deposit} has been deposited into your account.`);
        exitConfirmation();
    } else {
        console.log(chalk.red('Invalid amount. Please try again.'));
        deposit();
    }
}
async function withdraw() {
    let result = await inquirer.prompt([
        {
            type: 'input',
            name: 'withdraw',
            message: 'Please enter the amount you would like to withdraw:'
        }
    ]);
    if (!isNaN(parseInt(result.withdraw))) {
        if (parseInt(result.withdraw) > bankAccount.getBalance()) {
            console.log(chalk.red('Insufficient funds'));

        }
        else {
            bankAccount.withdraw(parseInt(result.withdraw));
            console.log(chalk.green(`$${result.withdraw} has been withdrawn from your account.`));
            await printReceipt(`$${result.withdraw} has been withdrawn from your account.`);
        }
        exitConfirmation();
    }
    else {
        console.log(chalk.red('Invalid amount. Please try again.'));
        withdraw();
    }
}

function checkBalance() {
    console.log(chalk.greenBright(`Your current balance is $${bankAccount.getBalance()}`));
    exitConfirmation();
}

async function printReceipt(otherInfo: string) {
    //ask user if they want to print receipt
    let receipt = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'print',
            message: 'Would you like to print a receipt?'
        }
    ]);
    if (receipt.print) {
        let rec = chalkAnimation.rainbow(`Account Name: ${bankAccount.accountName}\nAccount Number: ${bankAccount.accountNumber}\nCurrent Balance: $${bankAccount.getBalance()}\n${otherInfo}`);
        rec.start();
        setTimeout(() => {
            rec.stop();
        }, 1000);
    }
}

async function transfer() {
    let result = await inquirer.prompt([
        {
            type: 'input',
            name: 'transfer',
            message: 'Please enter the amount you would like to transfer: '
        },
        {
            type: 'input',
            name: 'account',
            message: 'Please enter the account number you would like to transfer to:'
        }
    ]);
    if (!isNaN(parseInt(result.transfer))) {
        if (parseInt(result.transfer) > bankAccount.getBalance()) {
            console.log(chalk.red('Insufficient funds'));

        } else {
            bankAccount.transfer(parseInt(result.transfer), result.account);
            console.log(chalk.green(`$${result.transfer} has been transferred to account number ${result.account}.`));
            await printReceipt(`$${result.transfer} has been transferred to account number ${result.account}.`);
        }
        exitConfirmation();
    }
    else {
        console.log(chalk.red('Invalid amount or account number. Please try again.'));
        transfer();
    }
}






function exitConfirmation() {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'repeat',
            message: 'Would you like to perform another transaction'
        }
    ]).then((answers) => {
        if (answers.repeat) {
            atmMenu();
        } else {
            console.log('Thanks for using Atm Machine!');
            process.exit();
        }
    });
}
welcome();


const drawBox = (content: string): string => {
    const boxTop = '──────────────────────────';
    const boxMiddle = `${content}`;
    const boxBottom = '──────────────────────────';

    return `${boxTop}\n${boxMiddle}\n${boxBottom}`;
};



const drawNumbers = (): string => {
    const numbersContent = `
    ${chalk('1      2        3')}
    ${chalk('4      5        6')}
    ${chalk('7      8        9')}
    `;

    return drawBox(numbersContent);
};
function content() { return `${drawNumbers()}\n` };

