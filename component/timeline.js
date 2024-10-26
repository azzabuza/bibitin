function fetchAndDisplayTimeline() {
fetch('../data/timeline.json')
.then(response => response.json())
.then(data => {
const timelineBox = document.getElementById('timeline-box');
let timelineHTML = '';

data.forEach(item => {
timelineHTML += `
<div class="timeline-tile">
<h3>${item.title}</h3>
<p>${item.description}</p>
<span>${item.date}</span>
</div>
`;
});

timelineBox.innerHTML = timelineHTML;
})
.catch(error => console.error('Error fetching timeline data:', error));
}

fetchAndDisplayTimeline();
