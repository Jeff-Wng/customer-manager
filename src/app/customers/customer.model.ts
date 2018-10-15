export class Customer {
    public id: String;
    public firstName: String;
    public lastName: String;
    public email: String;
    public imagePath: String;
    public city: String;
    public state: String;

    constructor(id: String, firstName: string, lastName: String, email: String, imagePath: string, city: String, state: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.imagePath = imagePath;
        this.city = city;
        this.state = state;
    }
}
