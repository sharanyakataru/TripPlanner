Project Structure
The project consists of a flight planning application that allows users to manage and plan trips between airports. It leverages a transaction processing system and a graph data structure to provide functionality for adding stops, undoing actions, and displaying trip summaries. The application dynamically loads airport data from a JSON file, ensuring flexibility and ease of updates.

Key Features
Trip Management: Users can plan trips by adding stops (airports) to their itinerary.
Transaction Processing System: The application uses a transaction processing system to manage actions, allowing users to undo and redo operations.
Graph Data Structure: Airports and the routes between them are represented as nodes and edges in a weighted graph, enabling efficient pathfinding.
Dynamic Data Loading: Airport data and connections are loaded from a JSON file (Flights.json), allowing for easy updates and modifications to the dataset.
User Interaction: The application prompts users for input, offering options to add stops, view trip summaries, and undo/redo actions.
Trip Summary Display: The application provides a summary of the planned trip, including all stops, legs between stops, and the total mileage of the trip.

The project consists of several key components:

tsTPS - The TypeScript implementation of the Transaction Processing System.
Airport - Represents an airport, including a method to calculate the distance between airports.
WeightedEdge - Represents a weighted edge in the graph.
WeightedGraph - A generic graph data structure used to manage airports and connections between them.
TripPlanner - The main application allowing users to plan trips, add stops, and view summaries.

Detailed Instructions
Install Dependencies: Run npm install to install all necessary dependencies.
tsTPS: Transaction Processing System
Objective: Implement the transaction processing system in TypeScript.

Objective: Airport class to manage airport data and calculate distances.
Details:
Implement the calculateDistance method. 
Ensure the class can handle airport data properly.
WeightedEdge Class
Objective: Create a class to represent a weighted edge in the graph.
Details:
Define the class with properties for source, destination, and weight (distance).
WeightedGraph Class
Objective: implementation of the graph data structure.
Details:
Define methods for adding nodes and edges.
Implement the findPath method using an algorithm (e.g., Dijkstra's, DFS, BFS).
TripPlanner
Objective: Implement the trip planning functionality.
Details:
Manage trip stops using the tsTPS for adding and undoing stops.
Prompt the user for input and provide options for trip management.
Display a summary of the trip including stops, legs, and total mileage.
JSON File Handling
Objective: Load airport data dynamically from a JSON file.
Details:
Load Flights.json which contains airport codes and edges.
Parse the JSON file and initialize the graph with nodes and edges from the file.

