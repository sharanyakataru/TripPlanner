import tsTPS_Transaction from "./tsTPS_Transaction.js";

export default class tsTPS {
    private transactions: Array<tsTPS_Transaction>;
    private numTransactions: number;
    private mostRecentTransaction: number;
    private performingDo: boolean;
    private performingUndo: boolean;

    constructor() {
        this.transactions = [];
        this.numTransactions = 0;
        this.mostRecentTransaction = -1; // No transactions yet
        this.performingDo = false;
        this.performingUndo = false;
    }

    private popTopTransaction(): void {
        if (this.numTransactions > 0) {
            this.transactions.pop();
            this.numTransactions--;
        }
    }

    public isPerformingDo(): boolean {
        return this.performingDo;
    }

    public isPerformingUndo(): boolean {
        return this.performingUndo;
    }

    public hasTransactionToRedo(): boolean {
        return (this.mostRecentTransaction + 1) < this.numTransactions;
    }

    public hasTransactionToUndo(): boolean {
        return this.mostRecentTransaction >= 0;
    }

    public getSize(): number {
        return this.transactions.length;
    }

    public getRedoSize(): number {
        return this.getSize() - this.mostRecentTransaction - 1;
    }

    public getUndoSize(): number {
        return this.mostRecentTransaction + 1;
    }

    public addTransaction(transaction: tsTPS_Transaction): void {
        if (this.mostRecentTransaction < this.numTransactions - 1) {
            this.transactions = this.transactions.slice(0, this.mostRecentTransaction + 1);
            this.numTransactions = this.mostRecentTransaction + 1;
        }
        this.transactions.push(transaction);
        this.numTransactions++;
        this.doTransaction();
    }

    public doTransaction(): void {
        if (this.hasTransactionToRedo()) {
            this.performingDo = true;
            const transaction = this.transactions[this.mostRecentTransaction + 1];
            transaction.doTransaction();
            this.mostRecentTransaction++;
            this.performingDo = false;
        }
    }

    public undoTransaction(): void {
        if (this.hasTransactionToUndo()) {
            this.performingUndo = true;
            const transaction = this.transactions[this.mostRecentTransaction];
            transaction.undoTransaction();
            this.mostRecentTransaction--;
            this.performingUndo = false;
        }
    }

    public clearAllTransactions(): void {
        for(let i = this.mostRecentTransaction; i >=0; i--){
            this.transactions[i].undoTransaction();
        }
        this.transactions.length = 0;
        this.numTransactions = 0;
        this.mostRecentTransaction = -1;
    }

    public toString(): string {
        return "TPS Description";
    }
}
