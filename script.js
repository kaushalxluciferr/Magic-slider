// Select buttons and elements
let nextbtn = document.querySelector(".next");
let prevbtn = document.querySelector(".prev");
let slider = document.querySelector(".slider");
let sliderlist = document.querySelector(".slider .list");
let thumbnail = document.querySelector(".thumbnail");

// Function to get slider and thumbnail items
function getItems() {
    return {
        sliderItems: Array.from(document.querySelectorAll(".slider .list .item")),
        thumbnailItems: Array.from(document.querySelectorAll(".thumbnail .item"))
    };
}

// Function to handle moving the slider
function moveSlider(direction) {
    const { sliderItems, thumbnailItems } = getItems();

    if (direction === 'next') {
        sliderlist.appendChild(sliderItems[0]); // Move the first slider item to the end
        thumbnail.appendChild(thumbnailItems[0]); // Move the first thumbnail item to the end
    } else if (direction === 'prev') {
        sliderlist.insertBefore(sliderItems[sliderItems.length - 1], sliderItems[0]); // Move the last slider item to the start
        thumbnail.insertBefore(thumbnailItems[thumbnailItems.length - 1], thumbnailItems[0]); // Move the last thumbnail item to the start
    }

    // Update slider class to trigger animations
    slider.classList.add(direction);
    slider.classList.remove(direction === 'next' ? 'prev' : 'next');
}

// Event listeners for buttons
nextbtn.onclick = function() {
    moveSlider('next');
}

prevbtn.onclick = function() {
    moveSlider('prev');
}

// Add click event listeners to thumbnails
function addThumbnailListeners() {
    const { sliderItems, thumbnailItems } = getItems();

    thumbnailItems.forEach((thumbnailItem, index) => {
        thumbnailItem.addEventListener('click', function() {
            const sliderIndex = sliderItems.findIndex(item => item.querySelector('img').src === thumbnailItem.querySelector('img').src);

            if (sliderIndex !== -1) {
                // Remove the current first item in slider and thumbnail
                const currentSliderItem = sliderItems[0];
                const currentThumbnailItem = thumbnailItems[0];

                // Append clicked thumbnail item to the end
                sliderlist.appendChild(sliderItems[sliderIndex]);
                thumbnail.appendChild(thumbnailItems[sliderIndex]);

                // Move the current first items to the end
                sliderlist.appendChild(currentSliderItem);
                thumbnail.appendChild(currentThumbnailItem);

                // Update the slider class to trigger animations
                slider.classList.add('next');
                slider.classList.remove('prev');
            }
        });
    });
}

// Remove animation classes after animation ends
slider.addEventListener('animationend', function() {
    slider.classList.remove('next', 'prev');
});

// Initialize thumbnail listeners
addThumbnailListeners();
