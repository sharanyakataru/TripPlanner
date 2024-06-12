export default class tsTPS {
    transactions;
    numTransactions;
    mostRecentTransaction;
    performingDo;
    performingUndo;
    constructor() {
        this.transactions = [];
        this.numTransactions = 0;
        this.mostRecentTransaction = -1; // No transactions yet
        this.performingDo = false;
        this.performingUndo = false;
    }
    popTopTransaction() {
        if (this.numTransactions > 0) {
            this.transactions.pop();
            this.numTransactions--;
        }
    }
    isPerformingDo() {
        return this.performingDo;
    }
    isPerformingUndo() {
        return this.performingUndo;
    }
    hasTransactionToRedo() {
        return (this.mostRecentTransaction + 1) < this.numTransactions;
    }
    hasTransactionToUndo() {
        return this.mostRecentTransaction >= 0;
    }
    getSize() {
        return this.transactions.length;
    }
    getRedoSize() {
        return this.getSize() - this.mostRecentTransaction - 1;
    }
    getUndoSize() {
        return this.mostRecentTransaction + 1;
    }
    addTransaction(transaction) {
        if (this.mostRecentTransaction < this.numTransactions - 1) {
            this.transactions = this.transactions.slice(0, this.mostRecentTransaction + 1);
            this.numTransactions = this.mostRecentTransaction + 1;
        }
        this.transactions.push(transaction);
        this.numTransactions++;
        this.doTransaction();
    }
    doTransaction() {
        if (this.hasTransactionToRedo()) {
            this.performingDo = true;
            const transaction = this.transactions[this.mostRecentTransaction + 1];
            transaction.doTransaction();
            this.mostRecentTransaction++;
            this.performingDo = false;
        }
    }
    undoTransaction() {
        if (this.hasTransactionToUndo()) {
            this.performingUndo = true;
            const transaction = this.transactions[this.mostRecentTransaction];
            transaction.undoTransaction();
            this.mostRecentTransaction--;
            this.performingUndo = false;
        }
    }
    clearAllTransactions() {
        for (let i = this.mostRecentTransaction; i >= 0; i--) {
            this.transactions[i].undoTransaction();
        }
        this.transactions.length = 0;
        this.numTransactions = 0;
        this.mostRecentTransaction = -1;
    }
    toString() {
        return "TPS Description";
    }
}
//# sourceMappingURL=tsTPS.js.map