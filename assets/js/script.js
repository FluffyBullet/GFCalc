charge = document.getElementById("calculate");
charge.addEventListener("click", getValue);

let options = "";
let premium = ""
let carriage = 0;
let multiplier = 0;

$(".tile").click(function(){
    $(this).fadeTo(1000,1);
    $(this).siblings().fadeTo(1000,0.2);
    options = $(this).children("h3").attr("id");
});

$(".premium").children("p").click(function(){
    $(this).fadeTo(1000,1);
    $(this).siblings().fadeTo(1000,0.2);
    $(this).siblings().css("background-color","white").css("color","black");
    $(this).css("background-color","teal").css("color","white");
    premium = $(this).attr("id");
});

function getValue() {
    let weight = document.getElementById("weight").value;

    if (premium === "time_a") {
        carriage = options === "fitting" ? 20.75 : 30.25;
        multiplier = options === "fitting" ? 0.38 : 0.53;
    } else if (premium === "time_b") {
        carriage = options === "fitting" ? 27.00: 54.00;
        multiplier = options === "fitting" ? 0.62 : 0.64;
    } else if (premium === "time_c") {
        carriage = options === "fitting" ? 43.00 : 100;
        multiplier = 0.82
    } else if (premium === "time_d") {
        carriage = options === "fitting" ? 60.50 : 104.50
        multiplier = 0.85;
    };
    console.log("halfway through getValue");

    if (weight > 20) {
        getMultiplier();
        getCharge(weight);
    };
    updatePage();
}

function getCharge(weight){
    console.log("getWeight starts");
    let baseCharge = carriage;
    let totalWeight = parseFloat(weight) + parseFloat(addPackaging(weight));
    console.log("total Weight = " + totalWeight);
    carriage = ((totalWeight - 20) * parseFloat(multiplier)) + parseFloat(baseCharge);
    console.log(baseCharge);
}

function getMultiplier(){
    console.log("getMultiplier starts");
    if (premium === "time_a") {
        multiplier = options === "fitting" ? "0.38":"0.53";
    } else if ( premium === "time_b") {
        multiplier = options === "fitting" ? "0.62":"0.64";
    } else if ( premium === "time_c") {
        multiplier = "0.82";
    } else if ( premium === "time_d") {
        multiplier = "0.85";
    }
};

function addPackaging(weight){
    let addOnWeight = 0;
    if (parseFloat(weight) <= 30) {
        addOnWeight = 5;
    } else if ( parseFloat(weight) <= 40) {
        addOnWeight = 8;
    } else if ( parseFloat(weight) <= 80) {
        addOnWeight = 15;
    } else if ( parseFloat(weight) <= 120) {
        addOnWeight = 26;
    } else if ( parseFloat(weight) <= 160) {
        addOnWeight = 39;
    } else if ( parseFloat(weight) <= 200) {
        addOnWeight = 78;
    } else {
        addOnWeight = 200;
    }
    getMultiplier();
    return addOnWeight;
}

function updatePage() {
    $('#deltype').text(options);
    $('#entry').text(weight.value);
    $('#calculated').text(carriage.toFixed(2));
}

$('input').mouseover(function(){
    $('#deltype').text("");
    $('#entry').text("");
    $('#calculated').text("");
})


// function getValue() {
//     let weight = document.getElementById("weight").value;
//     if (options === "fitting"){
//         if (parseFloat(weight) <= 20 && premium === "time_a") {
//             carriage = 20.75;
//             alert("Carriage charge is £" + carriage);
//         } else if (parseFloat(weight) <= 20 && premium === "time_b") {
//             carriage = 27.00;
//             alert("Carriage charge is £" + carriage);
//         } else if (parseFloat(weight) <= 20 && premium === "time_c") {
//             carriage = 43.00;
//             alert("Carriage charge is £" + carriage);
//         } else if (parseFloat(weight) <= 20 && premium === "price_c") {
//             carriage = 43.00;
//             alert("Carriage charge is £" + carriage);
//         } else {
//             fittingValue();
//         }
//     } else if (options === "pipe"){
//         if (parseFloat(weight) <= 20 && premium === "time_a") {
//             carriage = 30.25;
//             alert("Carriage charge is £" + carriage);
//         } else if (parseFloat(weight) <= 20 && premium === "time_b") {
//             carriage = 54.00;
//             alert("Carriage charge is £" + carriage);
//         } else if (parseFloat(weight) <= 20 && premium === "time_c") {
//             carriage = 100.00;
//             alert("Carriage charge is £" + carriage);
//         } else if (parseFloat(weight) <= 20 && premium === "price_c") {
//             carriage = 104.50;
//             alert("Carriage charge is £" + carriage);
//         } else {
//             pipeValue();
//     }
//     return carriage;
// }};
// function fittingValue(){
//     let packaging = addPackaging(weight.value);
//     console.log("packaging weight = " + packaging);
//     totalWeight = (parseFloat(weight.value) + parseFloat(packaging)) - 20;
//     console.log("total weight = " + totalWeight);

// }

// function pipeValue(){
//     let packaging = addPackaging(weight.value);
//     console.log("packaging weight = " + packaging);
//     totalWeight = (parseFloat(weight.value) + parseFloat(packaging)) - 20;
//     console.log("total weight = " + totalWeight);
// }

/** 
 * next day, fittings - £20.75
 * + 38p per kg
 * AM, fittings - £27.00
 * + 62p per kg
 * Pre9:30 fittings - £43.00
 * + 82p per kg
 * Sat, fittings - £60.50
 * + 85p per kg
 * *******************
 * next day, pipe - £30.25
 * + 53p per kg
 * AM, pipe - £54.00 
 * +64p per kg
 * Pre9:30 pipe - £100
 * + 82p per kg
 * Sat, pipe - £104.50
 * +85p per kg
 */