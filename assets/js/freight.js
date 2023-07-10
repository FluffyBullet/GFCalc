dxpanel = document.getElementById('dxpanel');
tntpanel = document.getElementById('tntpanel');

$("#dxdel").click(function() {
    dxpanel.style.display = "block";
    tntpanel.style.display = "none";
    this.style.class = "primary";
});
$("#tntdel").click(function() {
    dxpanel.style.display = "none";
    tntpanel.style.display = "block";

});

function dxCharge() {
    console.log("dxCharge starts")
    let weight = document.getElementById('weight').value;
    console.log(weight);   
}