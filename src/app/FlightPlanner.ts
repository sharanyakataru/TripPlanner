import Airport from "./Airport.js"
import tsTPS from '../tps/tsTPS.js';
import WeightedGraph from '../graph/WeightedGraph.js';
import * as readline from "readline"
import { AppendStop_Transaction } from '../graph/AppendStop_Transaction.js';
import * as fs from 'fs/promises';



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// WE WANT TO USE THE TRANSACTION PROCESSING SYSTEM
let tps : tsTPS;
tps = new tsTPS();
let tpsDescription = tps.toString();
console.log("\n" + tpsDescription + "\n");

// WE WANT TO USE THE GRAPH DATA STRUCTURE
let airportGraph : WeightedGraph<Airport>;
airportGraph = new WeightedGraph();

interface FlightData {
    airports: {
        code: string,
        latitudeDegrees: number,
        latitudeMinutes: number,
        longitudeDegrees: number,
        longitudeMinutes: number
        
    }[],
    edges: {
        from: string,
        to: string
    }[]
}

export class TripPlanner {
    private stops: string[] = [];
    private graph: WeightedGraph<Airport> = new WeightedGraph();
    private tps: tsTPS = new tsTPS();

    constructor() {
        this.loadFlightData();
    }

    

async loadFlightData(): Promise<void> {
    try {
        const data = await fs.readFile('/Users/sharanyakataru/cse216/HW2/src/app/Flights.json', 'utf-8');
        const flightData: FlightData = JSON.parse(data);
        this.initAllAirports(flightData);
    } catch (error) {
        console.error('Error loading flight data:', error);
    }
}


    askQuestion = (question: string): Promise<string> => {
        return new Promise((resolve) => {
          rl.question(question, (answer) => {
            resolve(answer);
          });
        });
      };

    initAllAirports(data: FlightData): void {
        data.airports.forEach(airport => {
            console.log(airport);
            console.log(airport.latitudeDegrees);
            this.graph.addNode(airport.code, new Airport(
                airport.code,
                airport.latitudeDegrees,
                airport.latitudeMinutes,
                airport.longitudeDegrees,
                airport.longitudeMinutes
            ));
        });

        data.edges.forEach(edge => {
            //console.log(edge);
            this.initEdge(edge[0], edge[1]);
        });
    }

    initEdge(from: string, to: string): void {
        console.log(from);
        console.log(to);
        let a1 = this.graph.getNodeData(from);
	    let a2 = this.graph.getNodeData(to);
        console.log (a1);
        console.log (a2);
        let distance = Airport.calculateDistance(a1,a2);
        this.graph.addEdge(from, to, 1);  
        this.graph.addEdge(to, from, 1);

    }

    appendStop(stop: string): void {
        this.stops.push(stop);
        const transaction = new AppendStop_Transaction(this.stops, stop);
        this.tps.addTransaction(transaction);
    }

    displayAirports(): void {
        console.log("\n\nAIRPORTS YOU CAN TRAVEL TO AND FROM:");
        let codes = this.graph.getKeys();
        for (let i = 0; i < codes.length; i++) {
            if ((i % 10) === 0) {
                //console.log("\t");
            }
            console.log(codes[i]);
            if (i < (codes.length - 1)) {
                //console.log(", ");
            }
            if ((i % 10) === 9) {
                //console.log("\n");
            }
        }
        console.log("\n\n");
    }

    displayCurrentTrip(): void {
        console.log("Current Trip Stops: \n");
        for (let i = 0; i < this.stops.length; i++) {
            console.log(`\t${i + 1}. ${this.stops[i]}\n`);
        }
        console.log("\n");
    
        console.log("Current Trip Legs: \n");
        let legNum = 1;
        let tripDistance = 0.0;
    
        for (let i = 0; i < this.stops.length - 1; i++) {
            let lastStop = this.stops[i];
            let nextStop = this.stops[i + 1];
            let legDistance = 0.0;
    
            console.log(`\t${i + 1}.`);
            let route = this.graph.findPath(lastStop, nextStop);
    
            if (route.length < 2) {
                console.log(`No Route Found from ${lastStop} to ${nextStop}\n`);
            } else {
                for (let j = 0; j < route.length - 1; j++) {
                    let a1 = this.graph.getNodeData(route[j]);
                    let a2 = this.graph.getNodeData(route[j + 1]);
                    let distance = Airport.calculateDistance(a1, a2);
                    legDistance += distance;
                    if (j === 0) {
                        console.log(a1.getCode());
                    }
                    console.log(`-${a2.getCode()}`);
                }
                console.log(` Leg Distance: ${legDistance} miles \n`);
            }
            tripDistance += legDistance;
            legNum++;
        }
        console.log(`Total Trip Distance: ${tripDistance} miles \n\n`);
    }
    

    displayMenu(): void {
        console.log("ENTER A SELECTION");
        console.log("S) Add a Stop to your Trip");
        console.log("U) Undo");
        console.log("R) Redo");
        console.log("E) Empty Trip");
        console.log("Q) Quit");
        console.log("-");
    }

    async processUserInput(input: string): Promise<boolean> {
        if (input === "S") {
            let entry = await this.askQuestion("Enter the Airport Code: "); 
            if (entry && this.graph.nodeExists(entry)) {
                const lastStop = this.stops.length > 0 ? this.stops[this.stops.length - 1] : null;
                if (lastStop && lastStop === entry) {
                    console.log("DUPLICATE STOP ERROR - NO STOP ADDED");
                } else {
                    const transaction = new AppendStop_Transaction(this.stops, entry);
                    this.tps.addTransaction(transaction);
                }
            } else {
                console.log("INVALID AIRPORT CODE ERROR - NO STOP ADDED");
            }
        } else if (input === "U") {
            this.tps.undoTransaction();
        } else if (input === "R") {
            this.tps.doTransaction();
        } else if (input === "E") {
            this.tps.clearAllTransactions();
        } else if (input === "Q") {
            return false;
        }
        return true;
    }

    async run(): Promise<void> {
        await this.loadFlightData(); // Ensure data is loaded before running
        this.graph.printEdges();
        let keepGoing = true;
        while (keepGoing) {
            this.displayAirports();
            this.displayCurrentTrip();
            this.displayMenu();
            let input = await this.askQuestion("");
            keepGoing =  await this.processUserInput(input);
        }
        console.log("GOODBYE");
    }
}

let instance = new TripPlanner();
instance.run();



