class MusicSlider {
    constructor() {
        this.currentIndex = 0;
        this.totalSlides = document.querySelectorAll('.slide').length;
        this.autoPlayInterval = null;
        this.isAutoPlaying = true;

        this.init();
    }

    init() {
        this.bindEvents();
        this.startAutoPlay();
    }

    bindEvents() {
        // Dot navigation
        document.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.goToSlide(index);
                this.resetAutoPlay();
            });
        });

        // Navigation buttons
        document.getElementById('prevBtn').addEventListener('click', () => {
            this.previousSlide();
            this.resetAutoPlay();
        });

        document.getElementById('nextBtn').addEventListener('click', () => {
            this.nextSlide();
            this.resetAutoPlay();
        });

        // Pause autoplay on hover
        const slider = document.querySelector('.slider');
        slider.addEventListener('mouseenter', () => this.pauseAutoPlay());
        slider.addEventListener('mouseleave', () => this.resumeAutoPlay());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
                this.resetAutoPlay();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
                this.resetAutoPlay();
            }
        });

        // Touch/swipe support
        let startX = 0;
        let endX = 0;

        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        slider.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
    }

    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
            this.resetAutoPlay();
        }
    }

    goToSlide(index) {
        this.currentIndex = index;
        const offset = -index * 100;

        document.querySelector('.slides').style.transform = `translateX(${offset}%)`;

        // Update dots
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // Reset progress bar animation
        const progressBar = document.querySelector('.progress-bar');
        progressBar.style.animation = 'none';
        progressBar.offsetHeight; // Trigger reflow
        progressBar.style.animation = 'progress 4s linear infinite';
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.goToSlide(this.currentIndex);
    }

    previousSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(this.currentIndex);
    }

    startAutoPlay() {
        if (this.isAutoPlaying) {
            this.autoPlayInterval = setInterval(() => {
                this.nextSlide();
            }, 4000);
        }
    }

    pauseAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }

    resumeAutoPlay() {
        if (this.isAutoPlaying) {
            this.startAutoPlay();
        }
    }

    resetAutoPlay() {
        this.pauseAutoPlay();
        this.resumeAutoPlay();
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MusicSlider();
});