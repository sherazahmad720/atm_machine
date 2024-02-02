// export interface BankAccount{
//     money: number;
//     accountName: string;
//     accountNumber: number;
// }
export class BankAccount {
    money;
    accountName;
    accountNumber;
    constructor(money, accountName, accountNumber) {
        this.money = money;
        this.accountName = accountName;
        this.accountNumber = accountNumber;
    }
    deposit(value) {
        this.money += value;
    }
    withdraw(value) {
        this.money -= value;
    }
    getBalance() {
        return this.money;
    }
    transfer(amount, anotherAccount) {
        this.money -= amount;
    }
}
