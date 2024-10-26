// Fetch the JSON data
fetch('../data/slide.json')
.then(response => response.json())
.then(contentSlides => {

// NEXT PREV BUTTON
const prevButton = document.getElementById('prev-slide');
const nextButton = document.getElementById('next-slide');

// SHOW BUTTON AFTER SLIDE DATA IS SUCCESSFULLY LOADED
prevButton.style.display = 'inline-block';
nextButton.style.display = 'inline-block';

prevButton.addEventListener('click', () => {
showSlide(currentSlideIndex - 1);
});
nextButton.addEventListener('click', () => {
showSlide(currentSlideIndex + 1);
});

const sliderContainer = document.getElementById('slider');
const dotsContainer = document.querySelector('.dots-container');
let currentSlideIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
let autoSlideInterval;

// SLIDE GENERATOR
function createSlide(slideData) {
const slideItem = document.createElement('a');
slideItem.href = `${slideData.link}`;
slideItem.className = 'slider';
slideItem.title = `${slideData.title}`;
slideItem.innerHTML = `
<div class="slide-grid">
<div class="slide-image">
<img src="${slideData.imageUrl}" alt="${slideData.title}" loading="lazy">
<div class="slide-title">
<h3>${slideData.title}</h3>
<p>${slideData.description}</p>
</div>
</div>
</div>
`;
return slideItem;
}

function createDot(index) {
const dot = document.createElement('span');
dot.className = 'dot';
dot.addEventListener('click', () => {
showSlide(index);
});
return dot;
}

function showSlide(slideIndex) {
const totalSlides = contentSlides.length;
slideIndex = (slideIndex + totalSlides) % totalSlides;

const slides = document.querySelectorAll('.slide-grid');
const dots = document.querySelectorAll('.dot');

slides.forEach((slideItem, index) => {
slideItem.style.display = index === slideIndex ? 'block' : 'none';
});

dots.forEach((dot, index) => {
dot.classList.toggle('active', index === slideIndex);
});

currentSlideIndex = slideIndex;
}

contentSlides.forEach((slideData, index) => {
const slide = createSlide(slideData);
sliderContainer.appendChild(slide);

const dot = createDot(index);
dotsContainer.appendChild(dot);
});

function autoSlide() {
currentSlideIndex = (currentSlideIndex + 1) % contentSlides.length;
showSlide(currentSlideIndex);
}

autoSlideInterval = setInterval(autoSlide, 5000);

sliderContainer.addEventListener('touchstart', (event) => {
touchStartX = event.touches[0].clientX;
clearInterval(autoSlideInterval);
});

sliderContainer.addEventListener('touchend', (event) => {
touchEndX = event.changedTouches[0].clientX;
handleSwipe();
autoSlideInterval = setInterval(autoSlide, 5000);
});

function handleSwipe() {
if (touchStartX - touchEndX > 50) {
showSlide(currentSlideIndex + 1);
} else if (touchEndX - touchStartX > 50) {
showSlide(currentSlideIndex - 1);
}
}

sliderContainer.addEventListener('mousedown', (event) => {
touchStartX = event.clientX;
clearInterval(autoSlideInterval);
});

sliderContainer.addEventListener('mouseup', (event) => {
touchEndX = event.clientX;
handleSwipe();
autoSlideInterval = setInterval(autoSlide, 3000);
});

showSlide(0);
})
.catch(error => console.error('Error fetching the slides data:', error));
