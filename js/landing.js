(function() {
    var carousel = document.querySelector('[data-carousel]');

    if (!carousel) {
        return;
    }

    var slides = Array.prototype.slice.call(carousel.querySelectorAll('[data-carousel-slide]'));
    var dots = Array.prototype.slice.call(carousel.querySelectorAll('[data-carousel-dot]'));
    var previous = carousel.querySelector('[data-carousel-prev]');
    var next = carousel.querySelector('[data-carousel-next]');
    var current = 0;
    var intervalId;
    var intervalDelay = 7000;

    function showSlide(index) {
        current = (index + slides.length) % slides.length;

        slides.forEach(function(slide, slideIndex) {
            slide.classList.toggle('is-active', slideIndex === current);
        });

        dots.forEach(function(dot, dotIndex) {
            dot.classList.toggle('is-active', dotIndex === current);
        });
    }

    function advanceSlide(step) {
        showSlide(current + step);
    }

    function stopAutoAdvance() {
        if (intervalId) {
            window.clearInterval(intervalId);
            intervalId = null;
        }
    }

    function startAutoAdvance() {
        stopAutoAdvance();
        intervalId = window.setInterval(function() {
            advanceSlide(1);
        }, intervalDelay);
    }

    if (!slides.length) {
        return;
    }

    if (previous) {
        previous.addEventListener('click', function() {
            advanceSlide(-1);
            startAutoAdvance();
        });
    }

    if (next) {
        next.addEventListener('click', function() {
            advanceSlide(1);
            startAutoAdvance();
        });
    }

    dots.forEach(function(dot) {
        dot.addEventListener('click', function() {
            showSlide(parseInt(dot.getAttribute('data-carousel-dot'), 10));
            startAutoAdvance();
        });
    });

    carousel.addEventListener('mouseenter', stopAutoAdvance);
    carousel.addEventListener('mouseleave', startAutoAdvance);
    carousel.addEventListener('focusin', stopAutoAdvance);
    carousel.addEventListener('focusout', startAutoAdvance);

    showSlide(0);
    startAutoAdvance();
})();
