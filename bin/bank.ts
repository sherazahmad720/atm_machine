// export interface BankAccount{
//     money: number;
//     accountName: string;
//     accountNumber: number;



// }
 export class BankAccount {
    private money: number;
    accountName: string;
    accountNumber: string;
    constructor(money: number, accountName: string, accountNumber: string) {
        this.money = money;
        this.accountName = accountName;
        this.accountNumber = accountNumber;
    }
    deposit(value: number) {
        this.money += value;
    }
    withdraw(value: number) {
        this.money -= value;
    }
    getBalance() {
        return this.money;
    }
    transfer(amount: number, anotherAccount: string) {
        this.money -= amount;
        
    }

}