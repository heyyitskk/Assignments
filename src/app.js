var ShoppingCart = /** @class */ (function () {
    function ShoppingCart() {
        this.items = [];
    }
    ShoppingCart.prototype.addItem = function (item) {
        var existingItem = this.items.filter(function (i) { return i.name === item.name; })[0];
        if (existingItem) {
            existingItem.quantity += item.quantity;
        }
        else {
            this.items.push(item);
        }
    };
    ShoppingCart.prototype.removeItem = function (itemName) {
        this.items = this.items.filter(function (item) { return item.name !== itemName; });
    };
    ShoppingCart.prototype.calculateTotalPrice = function () {
        var price = 0;
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            price = price + item.price * item.quantity;
        }
        return price;
    };
    ShoppingCart.prototype.displayCart = function () {
        console.log("Cart Items:");
        this.items.forEach(function (item) {
            console.log("".concat(item.name, " | \u20B9").concat(item.price, " x ").concat(item.quantity));
        });
        console.log("Total Price: \u20B9".concat(this.calculateTotalPrice(), "\n"));
    };
    return ShoppingCart;
}());
var Cart = new ShoppingCart();
Cart.displayCart();
Cart.addItem({ name: "Laptop", price: 50000, quantity: 1 });
Cart.addItem({ name: "Mouse", price: 500, quantity: 2 });
Cart.addItem({ name: "Keyboard", price: 1200, quantity: 1 });
Cart.displayCart();
Cart.removeItem("Mouse");
Cart.displayCart();
