import  WeightedEdge  from './WeightedEdge.js';

export default class WeightedGraph<T> {
    private nodes: Map<string, T>;
    private edges: Map<string, WeightedEdge>;

    public constructor() {
        this.nodes = new Map();
        this.edges = new Map();
    }

    public addNode(nodeId: string, data: T): void {
        this.nodes.set(nodeId, data);
    }

    public getNodeData(nodeId: string): T {
        return this.nodes.get(nodeId);
    }

    public getKeys(): string[] {
        return Array.from(this.nodes.keys());
    }

    public nodeExists(nodeId: string): boolean {
        return this.nodes.has(nodeId);
    }

    private getEdgeId(node1: string, node2: string): string {
        return `${node1}-${node2}`;
    }

    public addEdge(node1: string, node2: string, weight: number): void {
        const edgeId = this.getEdgeId(node1, node2);
        this.edges.set(edgeId, new WeightedEdge(node1, node2, weight));
    }

    public removeEdge(node1: string, node2: string): void {
        const edgeId = this.getEdgeId(node1, node2);
        this.edges.delete(edgeId);
    }

    public getNeighbors(node: string): string[] {
        const neighbors: string[] = [];
        this.edges.forEach((edge, key) => {
            if (edge.getNode1() === node) {
                neighbors.push(edge.getNode2());
            }
        });
        return neighbors;
    }

    public areNeighbors(node1: string, node2: string): boolean {
        return this.edges.has(this.getEdgeId(node1, node2));
    }

    public findPath(node1: string, node2: string): string[] {
        const path: string[] = [];
        if (!this.nodeExists(node1) || !this.nodeExists(node2)) {
            return path;
        }

        path.push(node1);
        const visited = new Map<string, string>();
        visited.set(node1, node1);

        while (path.length > 0) {
            const last = path[path.length - 1];
            const neighbors = this.getNeighbors(last);

            let closestIndex = -1;
            let closestDistance = Number.MAX_VALUE;

            for (let i = 0; i < neighbors.length; i++) {
                const testNeighbor = neighbors[i];
                if (testNeighbor === node2) {
                    path.push(testNeighbor);
                    return path;
                }
                if (!visited.has(testNeighbor)) {
                    const edgeId = this.getEdgeId(last, testNeighbor);
                    const edge = this.edges.get(edgeId);
                    if (edge && edge.getWeight() < closestDistance) {
                        closestIndex = i;
                        closestDistance = edge.getWeight();
                    }
                }
            }

            if (closestIndex >= 0) {
                const closestNode = neighbors[closestIndex];
                visited.set(closestNode, closestNode);
                path.push(closestNode);
            } else if (path.length > 0) {
                path.pop();
            }
        }

        return path;
    }
    public printEdges(){
        this.edges.forEach((edge, key) => {
            console.log (edge.getNode1() + " " + edge.getNode2());
        });

    }

}
