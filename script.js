const placeholders = new Array(5).fill({}); // Create 5 placeholder items

const carousel = document.getElementById("carousel");

// Render carousel items
placeholders.forEach(() => {
  const carouselItem = document.createElement("div");
  carouselItem.classList.add("item");
  carouselItem.innerHTML = `
    <div class="rectangle"></div>
    <div class="bottom-section">
      <div class="circle"></div>
      <div class="lines">
        <div class="line long"></div>
        <div class="line short"></div>
      </div>
    </div>`;
  carousel.appendChild(carouselItem);
});

// Initialize state
const itemsArray = Array.from(document.querySelectorAll(".item"));
let activeIndex = Math.floor(placeholders.length / 2);
let isDragging = false;
let startY = 0;
let dragThreshold = 50; // Threshold for smoother transitions

function updateCarousel() {
  itemsArray.forEach((item, index) => {
    item.classList.remove("active", "previous", "next");
    if (index === activeIndex) {
      item.classList.add("active");
    } else if (index === activeIndex - 1 || (activeIndex === 0 && index === itemsArray.length - 1)) {
      item.classList.add("previous");
    } else if (index === activeIndex + 1 || (activeIndex === itemsArray.length - 1 && index === 0)) {
      item.classList.add("next");
    }
  });
}

updateCarousel();

// Mouse wheel scroll
carousel.addEventListener("wheel", (event) => {
  event.preventDefault();
  const direction = event.deltaY > 0 ? 1 : -1;
  activeIndex = (activeIndex + direction + itemsArray.length) % itemsArray.length;
  updateCarousel();
});

// Mouse drag functionality
carousel.addEventListener("mousedown", (event) => {
  isDragging = true;
  startY = event.clientY;
  event.preventDefault(); // Prevent text selection
});

carousel.addEventListener("mousemove", (event) => {
  if (!isDragging) return;

  const deltaY = event.clientY - startY;

  // Trigger carousel update only after surpassing the drag threshold
  if (Math.abs(deltaY) > dragThreshold) {
    activeIndex = (activeIndex + (deltaY > 0 ? -1 : 1) + itemsArray.length) % itemsArray.length;
    updateCarousel();
    startY = event.clientY; // Reset start point for smoother drag experience
  }
});

carousel.addEventListener("mouseup", () => {
  isDragging = false;
});

carousel.addEventListener("mouseleave", () => {
  isDragging = false;
});
