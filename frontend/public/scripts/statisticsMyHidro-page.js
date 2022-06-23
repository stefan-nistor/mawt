function getData() {
  return Math.random();
}

Plotly.newPlot("chart", [
  {
    y: [getData()],
    type: "line",
  },
]);

let counter = 0;
setInterval(function () {
  Plotly.extendTraces("chart", { y: [[getData()]] }, [0]);
  counter++;

  if (counter > 40) {
    Plotly.relayout("chart", {
      xaxis: {
        range: [counter - 50, counter],
      },
    });
  }
}, 1000);
