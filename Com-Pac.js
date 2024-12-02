const hamburger = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('hide');
});
const slidesContainer = document.getElementById("slides-container");
const slides = document.querySelectorAll(".slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");

let currentIndex = slides.length; // Start at the first real slide
const slideWidth = slides[0].clientWidth; // Width of a single slide
let autoScrollInterval; // To store the auto-scroll interval
let autoScrollPaused = false; // Tracks if auto-scroll is paused

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

// Function to move to the next slide
const moveToNextSlide = () => {
    currentIndex++;
    slidesContainer.scrollLeft += slideWidth;

    if (currentIndex >= slides.length * 2) {
        // Seamlessly reset to the first real slide
        slidesContainer.scrollLeft = slideWidth * slides.length;
        currentIndex = slides.length;
    }
};

// Function to move to the previous slide
const moveToPrevSlide = () => {
    currentIndex--;
    slidesContainer.scrollLeft -= slideWidth;

    if (currentIndex < slides.length) {
        // Seamlessly reset to the last real slide
        slidesContainer.scrollLeft = slideWidth * (slides.length * 2 - 1);
        currentIndex = slides.length * 2 - 1;
    }
};

// Event listeners for buttons
nextButton.addEventListener("click", () => {
    stopAutoScroll(); // Stop auto-scroll when user interacts
    moveToNextSlide();
    startAutoScroll(); // Restart auto-scroll
});

prevButton.addEventListener("click", () => {
    stopAutoScroll(); // Stop auto-scroll when user interacts
    moveToPrevSlide();
    startAutoScroll(); // Restart auto-scroll
});

// Pause or resume auto-scroll on tap
slidesContainer.addEventListener("click", () => {
    if (autoScrollPaused) {
        startAutoScroll(); // Resume auto-scroll
    } else {
        stopAutoScroll(); // Pause auto-scroll
    }
    autoScrollPaused = !autoScrollPaused; // Toggle the pause state
});

// Auto-scroll for infinite loop
const startAutoScroll = () => {
    stopAutoScroll(); // Clear any existing interval
    autoScrollInterval = setInterval(() => {
        moveToNextSlide();
    }, 3500); // Change slides every 3 seconds
};

// Stop auto-scroll
const stopAutoScroll = () => {
    clearInterval(autoScrollInterval);
};

// Start auto-scroll on page load
startAutoScroll();
