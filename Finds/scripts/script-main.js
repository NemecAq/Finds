document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.8s ease';

const images = document.querySelectorAll('img');
let loadedImages = 0;
const totalImages = images.length;

function checkAllImagesLoaded() {
    loadedImages++;
    if (loadedImages === totalImages) {
        document.body.style.opacity = '1';
    }
}

if (totalImages > 0) {
    images.forEach(img => {
        if (img.complete) {
            checkAllImagesLoaded();
        } else {
            img.addEventListener('load', checkAllImagesLoaded);
            img.addEventListener('error', checkAllImagesLoaded);
        }
    });
} else {
    document.body.style.opacity = '1';
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section, .product-card, .brand-card, .category-item, .popular-item, .more-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

document.querySelector('header').style.opacity = '1';
document.querySelector('header').style.transform = 'translateY(0)';


/* cлайдер */

const sliderWrapper = document.querySelector('.slider-wrapper');
if (sliderWrapper) {
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const dots = document.querySelectorAll('.dot');
    const sliderMain = document.querySelector('.slider-main img');
    
    let currentSlide = 0;
    const slides = [
        '../images/featured-brand.png',
        '../images/brand1.jpg',
        '../images/brand2.jpg',
        '../images/brand3.jpg'
    ];
    
    const slideTexts = [
        'Перспективный бренд месяца',
        'KODEX - Новая коллекция',
        'FRAGS - Осень/Зима 2024',
        'OMNIA - Премьера'
    ];
    
    const slideLabels = document.querySelector('.brand-label h3');
    
    function updateSlide(index) {
        if (sliderMain) {
            sliderMain.src = slides[index];
        }
        if (slideLabels) {
            slideLabels.textContent = slideTexts[index];
        }
        
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    if (rightArrow) {
        rightArrow.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlide(currentSlide);
        });
    }
    
    if (leftArrow) {
        leftArrow.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlide(currentSlide);
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlide(currentSlide);
        });
    });
    
    
    let slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide(currentSlide);
    }, 2000);
    
 
    sliderWrapper.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderWrapper.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlide(currentSlide);
        }, 5000);
    });
}


/* поиск */
document.querySelectorAll('.nav-icons svg[class*="search"]').forEach(searchIcon => {
    searchIcon.addEventListener('click', function() {
        const searchBar = document.createElement('div');
        searchBar.style.cssText = `
            position: fixed;
            top: 30px;
            right: 100px;
            background: white;
            padding: 10px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 999;
            animation: slideIn 0.3s ease;
        `;
        
        searchBar.innerHTML = `
            <input type="text" placeholder="Поиск..." style="
                padding: 10px 20px;
                border: none;
                outline: none;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                width: 250px;
              
            ">
        `;
        
        document.body.appendChild(searchBar);
        
        const input = searchBar.querySelector('input');
        input.focus();
        
        function removeSearchBar() {
            searchBar.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                searchBar.remove();
            }, 300);
        }
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                if (input.value.trim()) {
                    showNotification(`Поиск: ${input.value}`);
                }
                removeSearchBar();
            }
        });
        
        document.addEventListener('click', function removeOnClick(e) {
            if (!searchBar.contains(e.target) && !searchIcon.contains(e.target)) {
                removeSearchBar();
                document.removeEventListener('click', removeOnClick);
            }
        });
    });
});


