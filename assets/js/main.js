// declare variables
const deliveryFee = 200;
var size, crust, topping, quantity, delivery, dlocation;

// Constructors
function Pizza (size, price, crust, topping, quantity, customer) {
    this.size = size;
    this.price = price;
    this.crust = crust;
    this.topping = topping;
    this.quantity = quantity;
    this.customer = customer;
}

function customer(name, customerLocation) {
    this.name = name;
    this.customerLocation = customerLocation;
}

function Crust (crustName, crustPrice) {
    this.crustName = crustName;
    this.crustPrice = crustPrice;
}

function Topping (tName, tPrice, basePrice) {
    this.tName = tName;
    this.basePrice = basePrice;
    this.tPrice = tPrice;
}

// prototype method
Pizza.prototype.getTotal = function () {
    let toppingTotal = 0
    // Loop through selected toppings and get total price
    for (topp in this.topping) {
        toppingTotal += this.topping[topp].tPrice
    }
    return (this.price + this.crust.crustPrice + toppingTotal)*this.quantity
}
