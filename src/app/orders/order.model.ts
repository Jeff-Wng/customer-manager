export class Order {
    public id: String;
    public name: String;
    public price: Number;
    public quantity: Number;
    public productImg: String;

    constructor(id: String, name: String, price: Number, quantity: Number, productImg: String) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.productImg = productImg;
    }
}