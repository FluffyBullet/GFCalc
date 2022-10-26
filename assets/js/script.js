charge = document.getElementById("calculate");
charge.addEventListener("click", getValue);

let options = "";
let premium = ""
let weight = document.getElementById("weight").value;
let carriage = 0;

$(".tile").click(function(){
    $(this).fadeTo(1000,1);
    $(this).siblings().fadeTo(1000,0.2);
    options = $(this).children("h3").attr("id");
})

$(".premium").children("p").click(function(){
    $(this).fadeTo(1000,1);
    $(this).siblings().fadeTo(1000,0.2);
    $(this).siblings().css("background-color","white").css("color","black");
    $(this).css("background-color","teal").css("color","white");
    premium = $(this).attr("id");
})

function getValue() {
    if (options === "fitting"){
        if (parseFloat(weight) <= 20 && premium === "time_a") {
            carriage = 20.75;
            alert("Carriage charge is £" + carriage);
        } else if (parseFloat(weight) <= 20 && premium === "time_b") {
            carriage = 27.00;
            alert("Carriage charge is £" + carriage);
        } else if (parseFloat(weight) <= 20 && premium === "time_c") {
            carriage = 43.00;
            alert("Carriage charge is £" + carriage);
        } else if (parseFloat(weight) <= 20 && premium === "price_c") {
            carriage = 43.00;
            alert("Carriage charge is £" + carriage);
        } else {
            fittingValue();
        }
    } else if (options === "pipe") {
        if(parseFloat(weight) <= 20) {
            carriage = 30.25;
            alert("Freight charge is £" + carriage);
        } else {
            pipeValue();
        }
    }
    return carriage;
}

function addPackaging(weight){
    let addOnWeight = 0;
    if (parseFloat(weight) <= 30) {
        addOnWeight = 5;
    } else if ( parseFloat(weight) <= 40) {
        addOnWeight = 10;
    }
    return addOnWeight;
}

function fittingValue(){
    let packaging = addPackaging(weight);
    console.log("packaging weight = " + packaging);
    totalWeight = (weight + packaging) - 20;
    console.log("total weight = " + totalWeight);

}

function pipeValue(){
    pass
}



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