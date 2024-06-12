import tsTPS_Transaction from "../tps/tsTPS_Transaction.js";

export class AppendStop_Transaction extends tsTPS_Transaction{
    code : string;
    tripStops : string[];

    constructor (tripStops: string[], code: string){
        super();
        this.code = code;
        this.tripStops = tripStops;
    }

    doTransaction(){
        this.tripStops.push(this.code);
    }
    undoTransaction(){
        this.tripStops.pop();
    }
    toString(){
        return "Appending Stop";
    }
}