import WeightedEdge from './WeightedEdge.js';
export default class WeightedGraph {
    nodes;
    edges;
    constructor() {
        this.nodes = new Map();
        this.edges = new Map();
    }
    addNode(nodeId, data) {
        this.nodes.set(nodeId, data);
    }
    getNodeData(nodeId) {
        return this.nodes.get(nodeId);
    }
    getKeys() {
        return Array.from(this.nodes.keys());
    }
    nodeExists(nodeId) {
        return this.nodes.has(nodeId);
    }
    getEdgeId(node1, node2) {
        return `${node1}-${node2}`;
    }
    addEdge(node1, node2, weight) {
        const edgeId = this.getEdgeId(node1, node2);
        this.edges.set(edgeId, new WeightedEdge(node1, node2, weight));
    }
    removeEdge(node1, node2) {
        const edgeId = this.getEdgeId(node1, node2);
        this.edges.delete(edgeId);
    }
    getNeighbors(node) {
        const neighbors = [];
        this.edges.forEach((edge, key) => {
            if (edge.getNode1() === node) {
                neighbors.push(edge.getNode2());
            }
        });
        return neighbors;
    }
    areNeighbors(node1, node2) {
        return this.edges.has(this.getEdgeId(node1, node2));
    }
    findPath(node1, node2) {
        const path = [];
        if (!this.nodeExists(node1) || !this.nodeExists(node2)) {
            return path;
        }
        path.push(node1);
        const visited = new Map();
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
            }
            else if (path.length > 0) {
                path.pop();
            }
        }
        return path;
    }
    printEdges() {
        this.edges.forEach((edge, key) => {
            console.log(edge.getNode1() + " " + edge.getNode2());
        });
    }
}
//# sourceMappingURL=WeightedGraph.js.map