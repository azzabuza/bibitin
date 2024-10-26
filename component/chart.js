// Fungsi umum untuk menggambar grafik
function drawChart(canvasId, jsonFile) {
fetch(jsonFile)
.then(response => response.json())
.then(data => {
const canvas = document.getElementById(canvasId);
const ctx = canvas.getContext('2d');

const incomes = data.map(d => parseInt(d.income.replace(/\./g, '')));
const months = data.map(d => d.month);

const chartWidth = incomes.length * 150;
const chartHeight = 500;
canvas.style.width = chartWidth + 'px';
canvas.style.height = chartHeight + 'px';

const dpr = window.devicePixelRatio || 1;
canvas.width = chartWidth * dpr;
canvas.height = chartHeight * dpr;
ctx.scale(dpr, dpr);

const padding = 50;
const leftPadding = 100;
const maxIncome = Math.max(...incomes);
const minIncome = Math.min(...incomes);

const yScale = (chartHeight - 2 * padding) / (maxIncome - minIncome);
const xScale = (chartWidth - leftPadding - padding) / (incomes.length - 1);

const points = incomes.map((income, index) => {
const x = leftPadding + index * xScale;
const y = chartHeight - padding - (income - minIncome) * yScale;
return { x, y, income, month: months[index] };
});

function drawGrid() {
ctx.strokeStyle = '#dcdcdc';
ctx.lineWidth = 1;
ctx.beginPath();
for (let i = 0; i <= 5; i++) {
const y = padding + (chartHeight - 2 * padding) * i / 5;
ctx.moveTo(leftPadding, y);
ctx.lineTo(chartWidth - padding, y);
ctx.stroke();
}
}

function drawYAxisLabels() {
ctx.fillStyle = '#333333';
ctx.font = '500 12px "Poppins", sans-serif';
for (let i = 0; i <= 5; i++) {
const y = padding + (chartHeight - 2 * padding) * i / 5;
const incomeLabel = minIncome + (maxIncome - minIncome) * (5 - i) / 5;
ctx.fillText('Rp ' + incomeLabel.toLocaleString('id-ID'), 10, y + 5);
}
}

function drawLine() {
ctx.beginPath();
ctx.lineWidth = 1;
ctx.strokeStyle = '#228b22';
ctx.fillStyle = 'rgb(34,139,34,.2)';

points.forEach((point, index) => {
if (index === 0) {
ctx.moveTo(point.x, point.y);
} else {
const prevPoint = points[index - 1];
const cpX = (prevPoint.x + point.x) / 2;
const cpY = (prevPoint.y + point.y) / 2;
ctx.quadraticCurveTo(cpX, cpY, point.x, point.y);
}
});

ctx.lineTo(chartWidth - padding, chartHeight - padding);
ctx.lineTo(leftPadding, chartHeight - padding);
ctx.closePath();
ctx.fill();
ctx.stroke();
}

function drawPoints() {
points.forEach(point => {
ctx.beginPath();
ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
ctx.fillStyle = '#228b22';
ctx.fill();

ctx.fillStyle = '#333333';
ctx.font = '500 12px "Poppins", sans-serif';
ctx.fillText(point.month, point.x - 20, chartHeight - 20);
});
}

function drawCompleteChart() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
drawGrid();
drawYAxisLabels();
drawLine();
drawPoints();

const highestPoint = points.reduce((prev, curr) => curr.income > prev.income ? curr : prev);
const lowestPoint = points.reduce((prev, curr) => curr.income < prev.income ? curr : prev);

const chartContainer = canvas.parentElement;
let infoDiv = chartContainer.querySelector('.info');
if (!infoDiv) {
infoDiv = document.createElement('div');
infoDiv.className = 'info';
chartContainer.appendChild(infoDiv);
}
infoDiv.innerHTML = `
<div class="profit">
<p>TERTINGGI: ${highestPoint.month} <b>Rp ${highestPoint.income.toLocaleString('id-ID')}</b></p>
<p>TERENDAH: ${lowestPoint.month} <b>Rp ${lowestPoint.income.toLocaleString('id-ID')}</b></p>
</div>
`;
}

drawCompleteChart();
})
.catch(error => {
console.error("Gagal memuat data: ", error);
});
}

drawChart('incomeChart', '../data/income/sales.json');

drawChart('incomeChart2', '../data/income/donate.json');
