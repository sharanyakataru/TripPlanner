import WeightedGraph from './WeightedGraph';
import Airport from '../app/Airport';
import tsTPS from '../tps/tsTPS';
import { AppendStop_Transaction } from './AppendStop_Transaction';
export class TripPlanner {
    stops = [];
    graph = new WeightedGraph();
    tps = new tsTPS();
    constructor() {
        this.loadFlightData();
    }
    async loadFlightData() {
        try {
            const response = await fetch('path/to/Flights.json');
            const data = await response.json();
            this.initAllAirports(data);
        }
        catch (error) {
            console.error('Error loading flight data:', error);
        }
    }
    initAllAirports(data) {
        data.airports.forEach(airport => {
            this.graph.addNode(airport.code, new Airport(airport.code, airport.latitude, airport.longitude, airport.altitude, airport.timezone));
        });
        data.edges.forEach(edge => {
            this.initEdge(edge.from, edge.to);
        });
    }
    initEdge(from, to) {
        this.graph.addEdge(from, to, 1); // Assuming a default weight of 1 for simplicity
    }
    appendStop(stop) {
        this.stops.push(stop);
        const transaction = new AppendStop_Transaction(this.stops, stop);
        this.tps.addTransaction(transaction);
    }
    displayAirports() {
        console.log("\n\nAIRPORTS YOU CAN TRAVEL TO AND FROM:");
        let codes = this.graph.getKeys();
        for (let i = 0; i < codes.length; i++) {
            if ((i % 10) === 0) {
                console.log("\t");
            }
            console.log(codes[i]);
            if (i < (codes.length - 1)) {
                console.log(", ");
            }
            if ((i % 10) === 9) {
                console.log("\n");
            }
        }
        console.log("\n\n");
    }
    displayCurrentTrip() {
        console.log("Current Trip Stops: \n");
        for (let i = 0; i < this.stops.length; i++) {
            console.log("\t" + (i + 1) + ". " + this.stops[i] + "\n");
        }
        console.log("\n");
        console.log("Current Trip Legs: \n");
        let legNum = 1;
        let tripDistance = 0.0;
        for (let i = 0; i < this.stops.length - 1; i++) {
            let lastStop = this.stops[i];
            let nextStop = this.stops[i + 1];
            let legDistance = 0.0;
            console.log("\t" + (i + 1) + ".");
            let route = this.graph.findPath(lastStop, nextStop);
            if (route.length < 2) {
                console.log("No Route Found from " + lastStop + " to " + nextStop + "\n");
            }
            else {
                for (let j = 0; j < route.length - 1; j++) {
                    let a1 = this.graph.getNodeData(route[j]);
                    let a2 = this.graph.getNodeData(route[j + 1]);
                    let distance = Airport.calculateDistance(a1, a2);
                    legDistance += distance;
                    if (j === 0) {
                        console.log(a1.getCode());
                    }
                    console.log("-" + a2.getCode());
                }
                console.log(" Leg Distance: " + legDistance + " miles \n");
            }
            tripDistance += legDistance;
            legNum++;
        }
        console.log("Total Trip Distance: " + tripDistance + " miles \n\n");
    }
    displayMenu() {
        console.log("ENTER A SELECTION");
        console.log("S) Add a Stop to your Trip");
        console.log("U) Undo");
        console.log("R) Redo");
        console.log("E) Empty Trip");
        console.log("Q) Quit");
        console.log("-");
    }
    processUserInput(input) {
        if (input === "S") {
            const entry = prompt("Enter the Airport Code: ");
            if (entry && this.graph.nodeExists(entry)) {
                const lastStop = this.stops.length > 0 ? this.stops[this.stops.length - 1] : null;
                if (lastStop && lastStop === entry) {
                    console.log("DUPLICATE STOP ERROR - NO STOP ADDED");
                }
                else {
                    const transaction = new AppendStop_Transaction(this.stops, entry);
                    this.tps.addTransaction(transaction);
                }
            }
            else {
                console.log("INVALID AIRPORT CODE ERROR - NO STOP ADDED");
            }
        }
        else if (input === "U") {
            this.tps.undoTransaction();
        }
        else if (input === "R") {
            this.tps.doTransaction();
        }
        else if (input === "E") {
            this.tps.clearAllTransactions();
        }
        else if (input === "Q") {
            return false;
        }
        return true;
    }
    async run() {
        await this.loadFlightData(); // Ensure data is loaded before running
        let keepGoing = true;
        while (keepGoing) {
            this.displayAirports();
            this.displayCurrentTrip();
            this.displayMenu();
            const input = prompt();
            keepGoing = this.processUserInput(input);
        }
        console.log("GOODBYE");
    }
}
let instance = new TripPlanner();
instance.run();
//# sourceMappingURL=TripPlanner.js.map