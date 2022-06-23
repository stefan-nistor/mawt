let canvasElement = document.getElementById("barChart");

let config = {
    type:"bar",
    data:{ 
        labels: ["first","second","third","forth"],
        datasets: [{ 
            label: "Electric capacity", 
            data: [ 5 , 2 , 12 , 19 , 3 , 23 , 4 , 24 , 6 , 10],
            backgroundColor:["#c5ce62","#c5ce62","#c5ce62","#c5ce62"],
            borderColor: ["#f5edf0"],
            borderWidth: 1,
        }]
    },

};

let barChart = new Chart(canvasElement, config);

let canvasElement2 = document.getElementById("pieChart");

let config2 = {
    type:"pie",
    data:{ 
        labels: ["first","second","third","forth"],
        datasets: [{ 
            label: "Electric capacity", 
            data: [ 5 , 2 , 12 , 19 , 3 , 23 , 4 , 24 , 6 , 10],
            backgroundColor:["#c5ce62","#c5ce62","#c5ce62","#c5ce62"],
            borderColor: ["#f5edf0"],
            borderWidth: 1,
        }]
    },

};

let pieChart = new Chart(canvasElement2, config2);

const changeView = () => {
 
    if(document.getElementById("barChart").style.display==="block")
    {
        document.getElementById("barChart").style.display="none";
        document.getElementById("pieChart").style.display="block";
    }
    else{
        document.getElementById("barChart").style.display="block";
        document.getElementById("pieChart").style.display="none";
    }
}