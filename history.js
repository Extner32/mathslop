const history_body_elem = document.getElementById("history_table");
const delete_history_btn = document.getElementById("delete_history_btn");

delete_history_btn.addEventListener("click", function () {
  localStorage.removeItem("attempt_history");
  updateVisualizers();
});

let attempt_history = JSON.parse(localStorage.getItem("attempt_history")) || [];
let chart_instance;

function updateVisualizers() {
  attempt_history = JSON.parse(localStorage.getItem("attempt_history")) || [];
  updateResponseTimeGraph();
  updateTable();
}

function updateResponseTimeGraph() {
  const ctx = document.getElementById("response_time_graph");

  const labels = attempt_history.map((_, i) => `#${i + 1}`);
  const data = attempt_history.map(a => a.response_time);
  const colors = attempt_history.map(a =>
    a.correct ? "green" : "red"
  );

  if (chart_instance) {
    chart_instance.destroy();
  }

  chart_instance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Response Time (ms)",
          data: data,
          backgroundColor: colors
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {display: false},
          grid: {display: false}
        },
        y: {
          ticks: { color: "white" },
          grid: { color: "#333" }
        }
      },
      plugins: {
          legend: {
            labels: {
              color: "white",
              generateLabels: () => [
                {
                  text: "Correct",
                  fillStyle: "green",
                  fontColor: "white",
                },
                {
                  text: "Wrong",
                  fillStyle: "red",
                  fontColor: "white",
                }
              ]

            }
          }
        }
      }
  });
}

function updateTable() {
  history_body_elem.innerHTML = "";
  attempt_history.forEach(attempt => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${attempt.a}</td>
      <td>${attempt.b}</td>
      <td>${attempt.answer}</td>
      <td>${attempt.response_time}</td>
    `;

    history_body_elem.appendChild(row);
  });

}

updateVisualizers();
