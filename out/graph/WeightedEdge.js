export default class WeightedEdge {
    node1;
    node2;
    weight;
    constructor(node1, node2, weight) {
        this.node1 = node1;
        this.node2 = node2;
        this.weight = weight;
    }
    getNode1() {
        return this.node1;
    }
    getNode2() {
        return this.node2;
    }
    getWeight() {
        return this.weight;
    }
}
//# sourceMappingURL=WeightedEdge.js.map