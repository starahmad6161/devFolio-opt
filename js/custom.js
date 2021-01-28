
var triggers = document.querySelectorAll(".lazy-loading");



function checkScroll(e) {
    triggers.forEach(image => {
        const imgCoords = image.getBoundingClientRect();
        //Half way through the image
        const slideInAt = (window.scrollY + window.innerHeight) - imgCoords.height / 2;
        //Get Image bottom position
        const imageBottom = imgCoords.top + window.scrollY + imgCoords.height;
        //Check if image center > scroll
        const isHalfShown = slideInAt > imgCoords.top +window.scrollY;
        //And Check if scroll top < image bottom
        const isNotScrolledPast = window.scrollY < imageBottom;
        //console.log(slideInAt, imageBottom, isHalfShown, isNotScrolledPast)
        if (isHalfShown && isNotScrolledPast) {
            image.style.visibility = "visible";
            setTimeout(() => image.classList.add("active"), 50);
            //get data-src attribute
            const dataSrc = image.dataset.src;
            //get data-bg attribute
            const dataBg = image.dataset.bg;
            //Get src attribute
            const src = image.getAttribute("src");
            //Get background image
            const backgroundImage = (image.style.backgroundImage);
            if (dataSrc && dataSrc != src) {
                image.setAttribute("src", dataSrc)
            }
            if (dataBg && `url("${dataBg}")` != backgroundImage) {
                image.style = `background-image: url(${dataBg})`;
            }
        //If the image is not in viewport
        } else {
            //image.classList.remove("active");
        }
    });
}


function debounce(func, wait = 5, immediate = true) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    }
}
//window.addEventListener("load", debounce(checkScroll));
window.addEventListener("scroll", debounce(checkScroll));