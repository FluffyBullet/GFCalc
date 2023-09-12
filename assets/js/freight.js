dxpanel = document.getElementById('dxpanel');
tntpanel = document.getElementById('tntpanel');
pallets = document.getElementById('palletRate');

// page to load last entry from local storage
$(document).ready(function () {
    loadTable();
});

// switch of freight windows, DX or TNT
$("#dxdel").click(function () {
    dxpanel.style.display = "block";
    tntpanel.style.display = "none";
    pallets.style.display = "none";
    this.style.class = "primary";
});
$("#tntdel").click(function () {
    dxpanel.style.display = "none";
    tntpanel.style.display = "block";
    pallets.style.display = "none";

});
$('#pallets').click(function () {
    dxpanel.style.display = "none";
    tntpanel.style.display = "none";
    pallets.style.display = "block";
});

// activate function on hit of enter button
$('#weight').keypress(function (event) {
    if (event.which == 13) {
        dxCharge()
    }
})

$('#tntweight').keypress(function (event) {
    if (event.which == 13) {
        tntCharge()
    };
});

function dxCharge() {
    // gather variables from DX entry.
    console.log("dxCharge starts")
    let weight = document.getElementById('weight').value;
    console.log("weight = " + weight);
    let options = $("input[name='options']:checked").val();
    console.log("Options = " + options);
    let time = $("input[name='premium']:checked").val();
    console.log("Time = " + time);

    // log time of request
    let date = new Date();


    // Apply basic carriage charge and multiplier
    let carriage = 0;
    let multiplier = 0;

    if (time === "next_day") {
        carriage = options === "fittings" ? 20.75 : 30.25;
        multiplier = options === "fittings" ? 0.38 : 0.53;
    } else if (time === "pre_noon") {
        carriage = options === "fittings" ? 27 : 54;
        multiplier = options === "fittings" ? 0.62 : 0.64;
    } else if (time === "early_morning") {
        carriage = options === "fittings" ? 43 : 100;
        multiplier = 0.82;
    } else if (time === "sat") {
        carriage = options === "fittings" ? 60.50 : 104.50;
        multiplier = 0.85;
    } else {
        alert("Incorrect entry detected, please try again");
    }

    console.log("carriage = " + carriage);
    console.log("multiplier = " + multiplier);

    let additionalCharge = 0;

    //add packaging 
    let addOnWeight = 0;
    if (parseFloat(weight) <= 30) {
        addOnWeight = 5;
    } else if (parseFloat(weight) <= 40) {
        addOnWeight = 8;
    } else if (parseFloat(weight) <= 80) {
        addOnWeight = 15;
    } else if (parseFloat(weight) <= 120) {
        addOnWeight = 26;
    } else if (parseFloat(weight) <= 160) {
        addOnWeight = 39;
    } else if (parseFloat(weight) <= 200) {
        addOnWeight = 78;
    } else {
        addOnWeight = 200;
    }

    if (weight > 20) {
        newWeight = weight - 20 + addOnWeight;
        additionalCharge = newWeight * multiplier;
        updatedCarriage = (carriage + additionalCharge).toFixed(0);
    } else {
        updatedCarriage = carriage
    }

    console.log(" calculations = " + carriage + " additional " + additionalCharge);

    // update page with results

    $('#deltype').text(options);
    $('#time').text(time);
    $('#entry').text(weight + "kg");
    $('#calculated').text(("Estimated Carriage = £" + updatedCarriage));

    //calculate reference
    timeOfRequest = date.getDate().toString()
        + (date.getMonth() + 1).toString()
        + date.getFullYear().toString()
        + date.getHours().toString()
        + date.getMinutes().toString()
        + date.getSeconds().toString();

    // log time entry to console
    console.log(
        "Date =" + date.getDate()
        + " Month :" + (date.getMonth() + 1).toString()
        + " Year :" + date.getFullYear().toString()
        + " Hours :" + date.getHours()
        + "Minutes:" + date.getMinutes()
        + "Seconds:" + date.getSeconds()
    );


    //store values in local storage
    let lastEntry = JSON.parse(localStorage.getItem("LastEntry"));
    if (lastEntry === null) {
        lastEntry = {};
    }
    lastEntry[date] = {
        "timeOfRequest": date,
        "carrier": "DX",
        "options": options,
        "time": time,
        "weight": weight,
        "updatedCarriage": updatedCarriage,
    }
    localStorage.setItem("LastEntry", JSON.stringify(lastEntry));
    loadTable();
}

function tntCharge() {
    // tnt values as weight : charge
    let tnt_value = {
        5: 50, 10: 50, 15: 60, 20: 60, 25: 65, 30: 70, 35: 70, 40: 75, 45: 80, 50: 80, 55: 85, 60: 85, 65: 90, 70: 90, 75: 95, 80: 95, 85: 100, 90: 100, 95: 100, 100: 100, 110: 105,
        120: 110, 130: 110, 140: 110, 150: 120, 160: 120, 170: 120, 180: 130, 190: 130, 200: 185, 210: 185, 210.1: 190, 220: 190, 230: 190,
        240: 195, 250: 195, 260: 200, 270: 200, 280: 200, 290: 205, 300: 205, 310: 205, 320: 210, 330: 210, 340: 210, 350: 215, 360: 215,
        370: 215, 380: 240, 390: 240, 400: 245, 410: 245, 420: 250, 430: 250, 440: 250, 450: 255, 460: 255, 470: 255, 480: 260,
        490: 260, 500: 260, 600: 280, 700: 305, 800: 410, 900: 440, 1000: 555, 2000: 735, 2500: 930,
        5000: 1840, 10000: 3350
    }
    let weight = $('#tntweight').val();

    console.log("tntCharge starts")
    console.log("weight entered = " + weight);

    //packaged weight
    let packagedWeight = Math.ceil((weight * 15));
    console.log(packagedWeight);

    // to delay fields being updated early
    let updated = false;

    // test if weight is in the tnt_value array
    freight = 0;
    while (updated === false) {
        if (tnt_value[packagedWeight] === undefined) {
            packagedWeight = packagedWeight + 1;
        } else {
            updated = true;
            freight = tnt_value[packagedWeight];
        }
    }

    $('#tntentry').text("Entry of " + weight + "kg results in a freight charge of £" + freight);

}

function loadTable() {
    // Load table with the 5 most recent entries
    let storedData = JSON.parse(localStorage.getItem("LastEntry"));
    let dataArray = Object.values(storedData);
  
    // Sort the entries by timestamp in reverse order (most recent first)
    dataArray.sort((a, b) => new Date(b.timeOfRequest) - new Date(a.timeOfRequest));
  
    // Take only the first 5 entries (the most recent ones)
    dataArray = dataArray.slice(0, 5);
  
    let table = document.getElementById("tableBody");
    let tableHTML = '';
  
    for (const elog of dataArray) {
      const optionsValue = elog.options === "pipe" ? "Yes" : "No";
      let delivery = "";
  
      if (elog.time === "next_day") {
        delivery = "Next Day";
      } else if (elog.time === "pre_noon") {
        delivery = "AM Delivery";
      } else if (elog.time === "early_morning") {
        delivery = "Pre 9:30";
      } else if (elog.time === "sat") {
        delivery = "Saturday";
      }
  
      // Create a row for each entry
      tableHTML += `
        <tr>
          <td>${elog.timeOfRequest}</td>
          <td>${optionsValue}</td>
          <td>${delivery}</td>
          <td>${elog.weight}kg</td>
          <td>£${elog.updatedCarriage}</td>
        </tr>
      `;
    }
  
    // Set the table's innerHTML to the generated tableHTML
    table.innerHTML = tableHTML;
  }