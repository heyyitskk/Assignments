
const cart = {
    items: [],
    addItem(item) {
        this.items.push(item);
    },
    removeItem(itemName) {
        this.items = this.items.filter((item) => item.name !== itemName);
    },
    calculatePrice() {
        let price = 0;
        for(let item of this.items){
            price = price + item.price;
        }
        return price;
    }
};
cart.addItem({ name: "Laptop", price: 50000, quantity: 1 });
cart.addItem({ name: "Mouse", price: 500, quantity: 2 });
cart.addItem({ name: "Keyboard", price: 1000, quantity: 1 });

console.log(cart.items);
console.log("Total price: "+cart.calculatePrice());
cart.removeItem("Mouse");
console.log(cart.items);
console.log("Total price: "+cart.calculatePrice());


