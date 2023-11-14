const machines = {
    MSA330: {
        material: ["PP-H", "PE", "PRR"],
        size: ["20", "25", "32"],
    },
    IR63: {
        material: ["PVDF", "PP-H", "PE"],
        size: ["20", "25", "32", "40", "50", "63"],
    }
};

// Function to filter machines based on material and size
function filterMachines(material, size) {
    return Object.keys(machines).filter(machine => {
        const machineData = machines[machine];
        return (
            machineData.material.includes(material) &&
            machineData.size.includes(size)
        );
    });
}

function getMachines() {
    preventDefault();
    material = $("#exampleDataList").value;
    console.log(material + " Selected")
}

// Example usage
const selectedMachines = filterMachines("PP-H", "20");
console.log("Selected Machines:", selectedMachines);

for (let i = 0; i < selectedMachines.length; i++) {
    $("#machine").append(
        selectedMachines[i] + "<br>",
        machines[selectedMachines[i]].material + "<br>",
        machines[selectedMachines[i]].size + "<br>",
        console.log(selectedMachines[i]));
}