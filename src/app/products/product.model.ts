export class Product {
    public id: String;
    public name: String;
    public price: Number;
    public description: String;
    public productImg: String;

    constructor(id: String, name: String, price: Number, description: String, productImg: String) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.productImg = productImg;
    }
}
