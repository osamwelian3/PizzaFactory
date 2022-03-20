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

// Crusts
crispy = new Crust()
crispy.crustName = "Crispy";
crispy.crustPrice = 100;

staffed = new Crust()
staffed.crustName = "Staffed";
staffed.crustPrice = 200;

glutenFree = new Crust()
glutenFree.crustName = "Gluten Free";
glutenFree.crustPrice = 300;

// Toppings
pepperoni = new Topping()
pepperoni.tName = "Pepperoni"
pepperoni.basePrice = 150;

chicken = new Topping()
chicken.tName = "Chicken";
chicken.basePrice = 350;

vegetable = new Topping()
vegetable.tName = "Vegetable";
vegetable.basePrice = 100;

// Pizza Sizes
small = new Pizza()
small.size = "Small";
small.price = 550;

medium = new Pizza()
medium.size = "Medium";
medium.price = 800;

large = new Pizza()
large.size = "Large";
large.price = 1000;

function validateForm(){
    if (crust == "" || size == "" || topping == "" || quantity == ""){
        if (crust == ""){
            alert(`You didn't choose a crust. Please select desired crust and checkout again.`)
        }
        if (size == ""){
            alert(`You didn't choose a Pizza size. Please select desired size and checkout again.`)
        }
        if (topping == ""){
            alert(`You didn't choose any topping. Please select desired topping and checkout again.`)
        }
        if (quantity == ""){
            alert(`You didn't indicate the quantity. Kindly let us know how many you need and checkout again.`)
        }
        return false
    } else {
        return true
    }
}

$(document).ready(function(){

    $("#orderForm").submit(function(evt){
        evt.preventDefault();
        customerName = this.name.value;
        size = this.size.value;
        crust = this.crust.value
        pepp = $("[name='pepperoni']").is(":checked") ? $("[name='pepperoni']:checked").val() : "";
        chick = $("[name='chicken']").is(":checked") ? $("[name='chicken']:checked").val() : "";
        veg = $("[name='vegetable']").is(":checked") ? $("[name='vegetable']:checked").val() : "";
        topping = pepp + chick + veg
        quantity = this.quantity.value
        delivery = this.delivery.value
        dlocation = this.dlocation.value
        // alert("Size: " + size + "Crust: " + crust + "Topping: " + topping + "Quantity: " + quantity + "Delivery: " + delivery + "Location: " + dlocation);
        var toppings = []
        if (pepp != "" && pepp == "Pepperoni"){
            toppings.push(pepperoni)
        }
        if (chick != "" && chick == "Chicken"){
            toppings.push(chicken)
        }
        if (veg != "" && veg == "Vegetable"){
            toppings.push(vegetable)
        }
        var userPizza = {}

        if (validateForm()) {
            if (size == "Small") {
                userPizza = small
            } else if (size == "Medium") {
                userPizza = medium
            } else if (size == "Large") {
                userPizza = large
            } else {
                alert("We received an invalid size: " + size + ". Please Contact system admin if the error persists")
            }

            if (crust == "Crispy") {
                userPizza.crust = crispy
            } else if (crust == "Stuffed") {
                userPizza.crust = staffed
            } else if (crust == "Gluten Free") {
                userPizza.crust = glutenFree
            } else {
                alert("We received an invalid crust: " + crust + ". Please Contact system admin if the error persists")
            }

            if (toppings.length >= 1) {
                userPizza.topping = toppings
                for (topp in userPizza.topping) {
                    if (userPizza.size == "Small") {
                        increamentToppingBy = 1
                        userPizza.topping[topp].tPrice = userPizza.topping[topp].basePrice * increamentToppingBy
                    } else if (userPizza.size == "Medium") {
                        increamentToppingBy = 1.5
                        userPizza.topping[topp].tPrice = userPizza.topping[topp].basePrice * increamentToppingBy
                    } else if (userPizza.size == "Large") {
                        increamentToppingBy = 2
                        userPizza.topping[topp].tPrice = userPizza.topping[topp].basePrice * increamentToppingBy
                    }
                }
            } else {
                alert("We received an invalid topping: " + topping + ". Please Contact system admin if the error persists")
            }
        }
        userPizza.customer = new customer()
        userPizza.customer.name = customerName
        if (dlocation != ""){
            userPizza.customer.customerLocation = dlocation
        }
        userPizza.quantity = parseInt(quantity)

        console.log(userPizza.getTotal())
        appendToOutput(userPizza)

    });

    $(".changeBtn").click(function(){
        $("#orderForm").show()
        $(".orderDetails").hide()
    });

    $(".backBtn").click(function(){
        $(".confirmed").hide()
        $("#orderForm")[0].reset()
        $("#orderForm").show()
        $(".orderDetails").hide()
    });

    $(".confirmBtn").click(function(){
        $("#orderForm").hide()
        $(".orderDetails").hide()
        $(".confirmed").show()
    });

});