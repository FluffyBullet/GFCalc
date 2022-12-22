charge = document.getElementById("calculate");
charge.addEventListener("click", getValue);
tnt_weight = document.getElementById("tnt_get_value");
tnt_weight.addEventListener("click", tnt_charge);

let options = "";
let premium = ""
let carriage = 0;
let multiplier = 0;
let time = "";
let tnt_value = {
    5:50,10:50,15:60,20:60,25:65,30:70,35:70,40:75,45:80,50:80,55:85,60:85,65:90,70:90,75:95,80:95,85:100,90:100,95:100,100:100,100.1:105,110:105,
    110.1:110,120:110,130:110,140:110,150:120,160:120,170:120,170.1:130,180:130,190:130,190.1:185,200:185,210:185,210.1:190,220:190,230:190,230.1:195,
    240:195,250:195,250.1:200,260:200,270:200,280:200,280.1:205,290:205,300:205,310:205,310.1:210,320:210,330:210,340:210,340.1:215,350:215,360:215,
    370:215,370.1:240,380:240,390:240,390.1:245,400:245,410:245,410.1:250,420:250,430:250,440:250,440.1:255,450:255,460:255,470:255,470.1:260,480:260,
    490:260,500:260,500.1:280,600:280,600.1:305,700:305,700.1:410,800:410,900:440,900.1:555,1000:555,1000.1:735,2000:735,2000.1:930,2500:930,2500.1:1840,
    5000:1840,5000.1:3350,10000:3350
}

$(".tile").click(function(){
    $(this).fadeTo(500,1);
    $(this).siblings().fadeTo(500,0.2);
    options = $(this).children("h3").attr("id");
});

$(".premium").children("p").click(function(){
    $(this).fadeTo(500,1);
    $(this).siblings().fadeTo(500,.2);
    $(this).siblings().css("background-color","white").css("color","black");
    $(this).css("background-color","teal").css("color","white");
    premium = $(this).attr("id");
});

function getValue() {
    let weight = document.getElementById("weight").value;

    if (premium === "time_a") {
        carriage = options === "fitting" ? 20.75 : 30.25;
        multiplier = options === "fitting" ? 0.38 : 0.53;
        time = "Next Day"
    } else if (premium === "time_b") {
        carriage = options === "fitting" ? 27.00: 54.00;
        multiplier = options === "fitting" ? 0.62 : 0.64;
        time = "Pre 12"
    } else if (premium === "time_c") {
        carriage = options === "fitting" ? 43.00 : 100;
        multiplier = 0.82
        time = "Pre 9:30"
    } else if (premium === "time_d") {
        carriage = options === "fitting" ? 60.50 : 104.50
        multiplier = 0.85;
        time = "Saturday"
    };
    console.log("halfway through getValue");

    if (weight > 20) {
        getMultiplier();
        getCharge(weight);
    };
    updatePage();
}

function tnt_charge(){
    let input_weight = document.getElementById('tnt_weight_entry');
    console.log(input_weight);
    let calculated_weight = (Math.ceil((input_weight.value) * 1.5) * 10);
    console.log(parseInt(calculated_weight));
    for (target in tnt_value) {
        if (parseInt(input_weight) == parseInt(tnt_value[target])){
            console.log(`freight charge is ${tnt_value[target]}`);
        }
        else {
            console.log(`${calculated_weight} does not match ${tnt_value[target]}`);
        };
    }
    // 50 does not match 50, data types ? matching parameters ?
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

function tnt_freight(weight){
    air_weight = weight * int(1.5)
    console.log(air_weight.value)
    if (options === "pipe" && premium === "time_e") {
        alert("We are unable to send pipe from Switzerland via TNT")
        return false
    }
    
    // tnt_value['key'] will return value of the key. For loop required to iterate through
}

function updatePage() {
    $('#deltype').text(options);
    $('#entry').text(weight.value);
    $('#calculated').text(carriage.toFixed(2));
    $('#time').text(time);
}

$('#weight').keypress(function(event){
    if (event.which == 13){
        getValue()
    }
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