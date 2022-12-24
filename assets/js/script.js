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
    5:50,10:50,15:60,20:60,25:65,30:70,35:70,40:75,45:80,50:80,55:85,60:85,65:90,70:90,75:95,80:95,85:100,90:100,95:100,100:100,110:105,
    120:110,130:110,140:110,150:120,160:120,170:120,180:130,190:130,200:185,210:185,210.1:190,220:190,230:190,
    240:195,250:195,260:200,270:200,280:200,290:205,300:205,310:205,320:210,330:210,340:210,350:215,360:215,
    370:215,380:240,390:240,400:245,410:245,420:250,430:250,440:250,450:255,460:255,470:255,480:260,
    490:260,500:260,600:280,700:305,800:410,900:440,1000:555,2000:735,2500:930,
    5000:1840,10000:3350
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
    let input_weight = document.getElementById('tnt_weight_entry').value;
    console.log(input_weight);
    let calculated_weight = Math.ceil(input_weight * 15);
    console.log(calculated_weight);
    let updated = false;
    
    function updateFreight(){
        if (tnt_value[calculated_weight] === undefined){
            console.log(`'match not found, ${tnt_value[calculated_weight]} is not on the list'`);
            console.log(calculated_weight);
            calculated_weight ++;
            updateFreight(calculated_weight);
        } else {
            console.log(`${tnt_value[calculated_weight]} is the freight value!`)
            updated = true;
           $('#charge_tnt').text('£' + tnt_value[calculated_weight]);
        }
    }
    if (updated === false){
        updateFreight(calculated_weight);
    } else {
        updated = false;
    }
}


    //         if (tnt_value[Math.ceil(calculated_weight) !== undefined]){
    //         console.log("this worked\n");
    //         console.log(`${calculated_weight} has been entered`);
    //         console.log(`£ ${tnt_value[calculated_weight]}`);
    //         updated = True
    //     }
    // } else {
    //         console.log("failed");
    //         console.log(calculated_weight);
    //         console.log(tnt_value[calculated_weight]);
    //         calculated_weight ++;
    //     }

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