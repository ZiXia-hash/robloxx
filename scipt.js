// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website Kenangan loaded!');
    
    // Initialize all features
    initGallery();
    initQuoteSlider();
    initScrollAnimations();
    initSmoothScroll();
});

// Gallery Modal Functionality
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('modal');
    const modalClose = document.querySelector('.modal-close');
    const modalImage = document.querySelector('.modal-image');
    const modalCaption = document.querySelector('.modal-caption');
    const prevBtn = document.querySelector('.modal-nav.prev');
    const nextBtn = document.querySelector('.modal-nav.next');
    
    let currentIndex = 0;
    
    const galleryData = [
        {
            emoji: '📸',
            title: 'Momen Spesial',
            description: 'Kenangan yang tak terlupakan',
            name: 'Kenangan 1'
        },
        {
            emoji: '🌟',
            title: 'Hari Bahagia',
            description: 'Senyuman yang selalu dikenang',
            name: 'Kenangan 2'
        },
        {
            emoji: '💫',
            title: 'Petualangan',
            description: 'Jejak langkah bersama',
            name: 'Kenangan 3'
        },
        {
            emoji: '🎉',
            title: 'Perayaan',
            description: 'Kegembiraan yang dibagikan',
            name: 'Kenangan 4'
        },
        {
            emoji: '🌈',
            title: 'Kebersamaan',
            description: 'Waktu yang berkualitas',
            name: 'Kenangan 5'
        },
        {
            emoji: '❤️',
            title: 'Kasih Sayang',
            description: 'Cinta yang abadi',
            name: 'Kenangan 6'
        }
    ];
    
    // Open modal on gallery item click
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            openModal(index);
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Navigation
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
        updateModalContent(currentIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryData.length;
        updateModalContent(currentIndex);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'Escape') {
                closeModal();
            }
        }
    });
    
    function openModal(index) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateModalContent(index);
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    function updateModalContent(index) {
        const data = galleryData[index];
        modalImage.innerHTML = `
            <div class="placeholder-image">
                <span>${data.emoji}</span>
                <p>${data.name}</p>
            </div>
        `;
        modalCaption.innerHTML = `
            <h3>${data.title}</h3>
            <p>${data.description}</p>
        `;
    }
}

// Quote Slider
function initQuoteSlider() {
    const quotes = document.querySelectorAll('.quote-card');
    const dots = document.querySelectorAll('.dot');
    let currentQuote = 0;
    
    // Auto slide quotes
    setInterval(() => {
        changeQuote((currentQuote + 1) % quotes.length);
    }, 5000);
    
    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            changeQuote(index);
        });
    });
    
    function changeQuote(index) {
        quotes[currentQuote].classList.remove('active');
        dots[currentQuote].classList.remove('active');
        
        currentQuote = index;
        
        quotes[currentQuote].classList.add('active');
        dots[currentQuote].classList.add('active');
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = `all 0.6s ease ${index * 0.2}s`;
        observer.observe(item);
    });
}

// Smooth Scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});