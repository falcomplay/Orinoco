class Teddy {
    constructor({
        name,
        imageUrl,
        price,
        _id,
        description,
        colors,
        quantity
    }) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.price = price;
        this.id = _id;
        this.description = description;
        this.colors = colors;
        this.quantity = parseInt(quantity, 10); 
    }
};