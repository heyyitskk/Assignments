interface CartItem {
    name: string;
    price: number;
    quantity: number;
}

class ShoppingCart {
    private items: CartItem[]; 

    constructor() {
        this.items = []; 
    }

    addItem(item: CartItem): void {
        const existingItem = this.items.filter(i => i.name === item.name)[0];
        if (existingItem) {
            existingItem.quantity += item.quantity; 
        } else {
            this.items.push(item); 
        }
    }

    removeItem(itemName: string): void {
        this.items = this.items.filter(item => item.name !== itemName);
    }

    calculateTotalPrice(): number {
        let price = 0;
        for(let item of this.items){
            price = price + item.price * item.quantity;
        }
        return price;
    }
    displayCart(): void {
        console.log("Cart Items:");
        this.items.forEach(item => {
            console.log(`${item.name} | ₹${item.price} x ${item.quantity}`);
        });
        console.log(`Total Price: ₹${this.calculateTotalPrice()}\n`);
    }
}

const Cart = new ShoppingCart();

Cart.displayCart();
Cart.addItem({ name: "Laptop", price: 50000, quantity: 1 });
Cart.addItem({ name: "Mouse", price: 500, quantity: 2 });
Cart.addItem({ name: "Keyboard", price: 1200, quantity: 1 });
Cart.displayCart();


Cart.removeItem("Mouse"); 
Cart.displayCart();

