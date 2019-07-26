const hamburger = document.querySelector(".hamburger");
const dropdownMenu = document.getElementById("myDropdown");
const navDots = document.querySelectorAll('.dot');
const slider = document.querySelector('.slider');
const sliderItem = document.querySelectorAll('.slider-item');
let position = 0;

//functional for slider implementation
navDots.forEach(function (dot, dotIndex) {
    dot.addEventListener('click', function (e) {
        slideItems(dot, dotIndex);
    })
});

function slideItems(dot, dotIndex) {
    sliderItem.forEach(function (sliderItem) {
        sliderItem.style.transform = "translate(" + (dotIndex * -sliderItem.clientWidth) + "px)";
        position = dotIndex;
    });
    setActiveDot(dot, dotIndex);
}

function setActiveDot() {
    navDots.forEach(function (dot, index) {
        if (index === position) {
            dot.classList.add('dot-active')
        } else {
            dot.classList.remove('dot-active')
        }
    })
}

function swipedetect(el, callback) {
    var touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 150,
        restraint = 100,
        allowedTime = 300,
        elapsedTime,
        startTime,
        handleswipe = callback || function (swipedir) {
        };

    touchsurface.addEventListener('touchstart', function (e) {
        var touchobj = e.changedTouches[0];
        swipedir = 'none';
        dist = 0;
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime();
        e.preventDefault()
    }, false);

    touchsurface.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);

    touchsurface.addEventListener('touchend', function (e) {
        var touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX;
        elapsedTime = new Date().getTime() - startTime;
        if (elapsedTime <= allowedTime) {
            if (Math.abs(distX) >= threshold) {
                swipedir = (distX < 0) ? 'left' : 'right';
            }
        }
        handleswipe(swipedir);
        e.preventDefault()
    }, false)
}

swipedetect(slider, function (swipedir) {
    if (swipedir === 'left' && position < slideItems.length) {
        slideItems(navDots[position], ++position)
    } else if (swipedir === 'right' && position > 0) {
        slideItems(navDots[position], --position)
    }
});


// functional for implementing burger menu
let toggle = false;

function show(dropMenu) {
    if (!toggle) {
        dropMenu.style.top = "10vh";
        toggle = !toggle;
    } else {
        dropMenu.style.top = "-500px";
        toggle = !toggle;
    }
}

hamburger.addEventListener("click", function () {
    this.classList.toggle("is-active");
    show(dropdownMenu);
});