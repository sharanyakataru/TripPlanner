export default class WeightedEdge {
    private node1: string;
    private node2: string;
    private weight: number;

    constructor(node1: string, node2: string, weight: number) {
        this.node1 = node1;
        this.node2 = node2;
        this.weight = weight;
    }

    public getNode1(): string {
        return this.node1;
    }

    public getNode2(): string {
        return this.node2;
    }

    public getWeight(): number {
        return this.weight;
    }
}