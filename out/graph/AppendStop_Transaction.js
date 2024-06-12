import tsTPS_Transaction from "../tps/tsTPS_Transaction.js";
export class AppendStop_Transaction extends tsTPS_Transaction {
    code;
    tripStops;
    constructor(tripStops, code) {
        super();
        this.code = code;
        this.tripStops = tripStops;
    }
    doTransaction() {
        this.tripStops.push(this.code);
    }
    undoTransaction() {
        this.tripStops.pop();
    }
    toString() {
        return "Appending Stop";
    }
}
//# sourceMappingURL=AppendStop_Transaction.js.map