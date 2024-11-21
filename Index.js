const hamburger = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('hide');
});
const slidesContainer = document.getElementById("slides-container");
const slides = document.querySelectorAll(".slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");

let currentIndex = 0;
const slideWidth = slides[0].clientWidth; // Width of a single slide

// Clone slides for infinite scrolling
slides.forEach((slide) => {
    const clone = slide.cloneNode(true);
    slidesContainer.appendChild(clone); // Add to the end
});

slides.forEach((slide) => {
    const clone = slide.cloneNode(true);
    slidesContainer.prepend(clone); // Add to the beginning
});

// Ensure the initial position is at the first real slide
slidesContainer.scrollLeft = slideWidth * slides.length;

nextButton.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= slides.length) {
        currentIndex = 0; // Reset index
        slidesContainer.scrollLeft = slideWidth * slides.length; // Jump to the first real slide
    }
    slidesContainer.scrollLeft += slideWidth;
});

prevButton.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = slides.length - 1; // Reset index
        slidesContainer.scrollLeft = slideWidth * slides.length; // Jump to the last real slide
    }
    slidesContainer.scrollLeft -= slideWidth;
});

// Auto-scroll for infinite loop
setInterval(() => {
    nextButton.click();
}, 3500); // Change slides every 3 seconds
