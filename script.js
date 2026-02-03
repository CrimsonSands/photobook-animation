class PhotoBook {
    constructor() {
        this.currentPage = 0;
        this.totalPages = 10; // Total number of pages (must be even)
        this.isAnimating = false;

        // Photo book content
        this.pages = [
            { color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', text: 'Photo 1' },
            { color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', text: 'Photo 2' },
            { color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', text: 'Photo 3' },
            { color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', text: 'Photo 4' },
            { color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', text: 'Photo 5' },
            { color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', text: 'Photo 6' },
            { color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', text: 'Photo 7' },
            { color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', text: 'Photo 8' },
            { color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', text: 'Photo 9' },
            { color: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)', text: 'Photo 10' }
        ];

        this.init();
    }

    init() {
        // Get DOM elements
        this.pageLeft = document.querySelector('.page-left');
        this.pageRight = document.querySelector('.page-right');
        this.pageTurn = document.querySelector('.page-turn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.pageIndicator = document.getElementById('pageIndicator');

        // Event listeners
        this.pageLeft.addEventListener('click', () => this.turnToPrevious());
        this.pageRight.addEventListener('click', () => this.turnToNext());
        this.prevBtn.addEventListener('click', () => this.turnToPrevious());
        this.nextBtn.addEventListener('click', () => this.turnToNext());

        // Touch events for mobile
        this.addTouchSupport();

        // Initial render
        this.updatePages();
    }

    addTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;

        const handleSwipe = () => {
            if (touchEndX < touchStartX - 50) {
                this.turnToNext();
            }
            if (touchEndX > touchStartX + 50) {
                this.turnToPrevious();
            }
        };

        document.querySelector('.book').addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        document.querySelector('.book').addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    updatePages() {
        // Update left page
        if (this.currentPage > 0) {
            this.updatePageContent(this.pageLeft, this.currentPage - 1);
        }

        // Update right page
        if (this.currentPage < this.totalPages) {
            this.updatePageContent(this.pageRight, this.currentPage);
        }

        // Update navigation buttons
        this.prevBtn.disabled = this.currentPage === 0;
        this.nextBtn.disabled = this.currentPage >= this.totalPages;

        // Update page indicator
        const leftPageNum = this.currentPage === 0 ? 1 : this.currentPage;
        const rightPageNum = this.currentPage + 1;
        this.pageIndicator.textContent = `Page ${leftPageNum}-${rightPageNum}`;
    }

    updatePageContent(pageElement, pageIndex) {
        const photo = pageElement.querySelector('.placeholder-photo');
        const pageNumber = pageElement.querySelector('.page-number');

        if (pageIndex >= 0 && pageIndex < this.pages.length) {
            photo.style.background = this.pages[pageIndex].color;
            photo.innerHTML = `<span>${this.pages[pageIndex].text}</span>`;
            pageNumber.textContent = pageIndex + 1;
        }
    }

    turnToNext() {
        if (this.isAnimating || this.currentPage >= this.totalPages) return;

        this.isAnimating = true;
        this.pageTurn.classList.add('active', 'animating');

        // Set up the turning page content
        const pageFront = this.pageTurn.querySelector('.page-front .placeholder-photo');
        const pageFrontNumber = this.pageTurn.querySelector('.page-front .page-number');
        const pageBack = this.pageTurn.querySelector('.page-back .placeholder-photo');
        const pageBackNumber = this.pageTurn.querySelector('.page-back .page-number');

        // Front shows current right page
        if (this.currentPage < this.pages.length) {
            pageFront.style.background = this.pages[this.currentPage].color;
            pageFront.innerHTML = `<span>${this.pages[this.currentPage].text}</span>`;
            pageFrontNumber.textContent = this.currentPage + 1;
        }

        // Back shows next left page
        if (this.currentPage + 1 < this.pages.length) {
            pageBack.style.background = this.pages[this.currentPage + 1].color;
            pageBack.innerHTML = `<span>${this.pages[this.currentPage + 1].text}</span>`;
            pageBackNumber.textContent = this.currentPage + 2;
        }

        // Animate
        this.pageTurn.classList.add('turn-next');

        setTimeout(() => {
            this.currentPage += 2;
            this.updatePages();
            this.resetTurningPage();
        }, 1000);
    }

    turnToPrevious() {
        if (this.isAnimating || this.currentPage === 0) return;

        this.isAnimating = true;
        this.pageTurn.classList.add('active', 'animating');
        this.pageTurn.style.right = 'auto';
        this.pageTurn.style.left = '0';
        this.pageTurn.style.transformOrigin = 'right center';

        // Set up the turning page content
        const pageFront = this.pageTurn.querySelector('.page-front .placeholder-photo');
        const pageFrontNumber = this.pageTurn.querySelector('.page-front .page-number');
        const pageBack = this.pageTurn.querySelector('.page-back .placeholder-photo');
        const pageBackNumber = this.pageTurn.querySelector('.page-back .page-number');

        // Front shows current left page
        if (this.currentPage - 1 >= 0 && this.currentPage - 1 < this.pages.length) {
            pageFront.style.background = this.pages[this.currentPage - 1].color;
            pageFront.innerHTML = `<span>${this.pages[this.currentPage - 1].text}</span>`;
            pageFrontNumber.textContent = this.currentPage;
        }

        // Back shows previous right page
        if (this.currentPage - 2 >= 0 && this.currentPage - 2 < this.pages.length) {
            pageBack.style.background = this.pages[this.currentPage - 2].color;
            pageBack.innerHTML = `<span>${this.pages[this.currentPage - 2].text}</span>`;
            pageBackNumber.textContent = this.currentPage - 1;
        }

        // Start with page turned
        this.pageTurn.style.transform = 'rotateY(-180deg)';

        // Animate
        setTimeout(() => {
            this.pageTurn.classList.add('turn-prev');
        }, 50);

        setTimeout(() => {
            this.currentPage -= 2;
            this.updatePages();
            this.resetTurningPage();
        }, 1050);
    }

    resetTurningPage() {
        this.pageTurn.classList.remove('active', 'animating', 'turn-next', 'turn-prev');
        this.pageTurn.style.transform = '';
        this.pageTurn.style.right = '0';
        this.pageTurn.style.left = 'auto';
        this.pageTurn.style.transformOrigin = 'left center';
        this.isAnimating = false;
    }
}

// Initialize the photo book when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PhotoBook();
});
