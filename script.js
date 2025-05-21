let chart;

function calculate() {
  const start = parseFloat(document.getElementById("start").value);
  const contrib = parseFloat(document.getElementById("contrib").value);
  const rate = parseFloat(document.getElementById("return").value) / 100;
  const years = parseInt(document.getElementById("years").value);

  const capitalByYear = [start];
  const investedByYear = [start];

  for (let i = 1; i <= years; i++) {
    investedByYear.push(start + contrib * i);
    const previous = capitalByYear[i - 1];
    const updated = (previous + contrib) * (1 + rate);
    capitalByYear.push(parseFloat(updated.toFixed(2)));
  }

  const labels = Array.from({ length: years + 1 }, (_, i) => `Year ${i}`);
  const finalValue = capitalByYear[capitalByYear.length - 1];
  const totalInvested = investedByYear[investedByYear.length - 1];
  const totalProfit = finalValue - totalInvested;
  const totalProfitPercent = totalProfit/totalInvested*100;


  document.getElementById("final").innerText = `Final Capital: €${finalValue.toLocaleString("en-US")}`;
  document.getElementById("invested").innerText = `Total Invested: €${totalInvested.toLocaleString("en-US")}`;
  document.getElementById("profit").innerText = `Profit: €${totalProfit.toLocaleString("en-US")}`;
  document.getElementById("profitPercent").innerText = `Profit: %${totalProfitPercent.toLocaleString("en-US")}`;

  if (chart) chart.destroy();

  const ctx = document.getElementById("chart").getContext("2d");
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Capital (€)",
          data: capitalByYear,
          borderColor: "green",
          backgroundColor: "rgba(0,128,0,0.1)",
          fill: true,
          tension: 0.2,
          pointRadius: 4
        },
        {
          label: "Invested (€)",
          data: investedByYear,
          borderColor: "gray",
          backgroundColor: "rgba(128,128,128,0.1)",
          fill: false,
          borderDash: [5, 5],
          tension: 0.2,
          pointRadius: 3
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.dataset.label}: €${ctx.raw.toLocaleString("en-US")}`
          }
        }
      },
      scales: {
        y: {
          ticks: {
            callback: v => `€${v.toLocaleString("en-US")}`
          }
        }
      }
    }
  });
}

window.onload = calculate;
