export default abstract class tsTPS_Transaction {
    public abstract doTransaction():void;
    public abstract undoTransaction():void;
    public abstract toString():string;
}