// Create floating roses in the background
function createFloatingRoses() {
    const rosesContainer = document.getElementById('rosesContainer');
    const roseEmojis = ['🌹', '🌺', '🌸', '💐', '🥀'];
    
    // Reduce number of roses on mobile for better performance
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    const roseCount = isMobile ? 12 : 20;
    
    for (let i = 0; i < roseCount; i++) {
        const rose = document.createElement('div');
        rose.className = 'floating-rose';
        rose.textContent = roseEmojis[Math.floor(Math.random() * roseEmojis.length)];
        
        // Random horizontal position
        rose.style.left = Math.random() * 100 + '%';
        
        // Random animation delay
        rose.style.animationDelay = Math.random() * 5 + 's';
        
        // Random animation duration
        rose.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        rosesContainer.appendChild(rose);
    }
}

// Create particle effects
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    
    // Reduce number of particles on mobile for better performance
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    const particleCount = isMobile ? 15 : 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        // Random animation duration
        particle.style.animationDuration = (Math.random() * 5 + 8) + 's';
        
        // Random size
        const size = Math.random() * 8 + 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particlesContainer.appendChild(particle);
    }
}

// Add sparkle effect on mouse move
function addSparkleEffect() {
    // For touch devices, create sparkles on touch move
    if ('ontouchstart' in window) {
        let lastTouchTime = 0;
        document.addEventListener('touchmove', (e) => {
            const now = Date.now();
            if (now - lastTouchTime > 100) { // Throttle to every 100ms
                lastTouchTime = now;
                const touch = e.touches[0];
                const sparkle = document.createElement('div');
                sparkle.className = 'particle';
                sparkle.style.left = touch.clientX + 'px';
                sparkle.style.top = touch.clientY + 'px';
                sparkle.style.position = 'fixed';
                sparkle.style.animation = 'sparkle 1s ease-out forwards';
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => {
                    sparkle.remove();
                }, 1000);
            }
        });
    } else {
        // For desktop, use mouse move
        document.addEventListener('mousemove', (e) => {
            // Create sparkle only occasionally (20% chance)
            if (Math.random() > 0.8) {
                const sparkle = document.createElement('div');
                sparkle.className = 'particle';
                sparkle.style.left = e.clientX + 'px';
                sparkle.style.top = e.clientY + 'px';
                sparkle.style.position = 'fixed';
                sparkle.style.animation = 'sparkle 1s ease-out forwards';
                
                document.body.appendChild(sparkle);
                
                // Remove sparkle after animation
                setTimeout(() => {
                    sparkle.remove();
                }, 1000);
            }
        });
    }
}

// Add sparkle animation to CSS dynamically
function addSparkleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: scale(2) rotate(180deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Add click effect to the rose
function addRoseClickEffect() {
    const rose = document.querySelector('.rose-image');
    
    // Function to create heart burst
    function createHeartBurst() {
        // Play click sound
        const clickSound = document.getElementById('clickSound');
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {}); // Ignore autoplay errors
        }
        
        // Create burst of hearts
        for (let i = 0; i < 12; i++) {
            const heart = document.createElement('div');
            heart.textContent = '❤️';
            heart.style.position = 'fixed';
            heart.style.fontSize = '30px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            
            const rect = rose.getBoundingClientRect();
            heart.style.left = (rect.left + rect.width / 2) + 'px';
            heart.style.top = (rect.top + rect.height / 2) + 'px';
            
            const angle = (i / 12) * Math.PI * 2;
            const distance = 150;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            heart.style.animation = `heartBurst 1.5s ease-out forwards`;
            heart.style.setProperty('--endX', endX + 'px');
            heart.style.setProperty('--endY', endY + 'px');
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 1500);
        }
    }
    
    // Add click event
    rose.addEventListener('click', createHeartBurst);
    
    // Add touch event for mobile with prevention of double firing
    let lastTouchEnd = 0;
    rose.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
        createHeartBurst();
    }, { passive: false });
    
    // Add heart burst animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heartBurst {
            0% {
                transform: translate(0, 0) scale(1) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translate(var(--endX), var(--endY)) scale(0) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Add rainbow effect to title on hover
function addTitleHoverEffect() {
    const words = document.querySelectorAll('.word');
    
    words.forEach(word => {
        word.addEventListener('mouseenter', () => {
            word.style.animation = 'none';
            word.style.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
            word.style.transform = 'scale(1.2) rotate(5deg)';
            word.style.transition = 'all 0.3s ease';
        });
        
        word.addEventListener('mouseleave', () => {
            word.style.transform = 'scale(1) rotate(0deg)';
            setTimeout(() => {
                word.style.color = '';
                word.style.animation = '';
            }, 300);
        });
    });
}

// Initialize all effects when page loads
window.addEventListener('load', () => {
    createFloatingRoses();
    createParticles();
    addSparkleEffect();
    addSparkleAnimation();
    addRoseClickEffect();
    addTitleHoverEffect();
    addMobileOptimizations();
    setupMusicAutoplay();
    setupMessageBox();
    setupAlbum();
    
    // Add a welcome message to console
    console.log('%c🌹 Happy Rose Day! 🌹', 'font-size: 24px; color: #ff69b4; font-weight: bold;');
    console.log('%cClick the rose for a surprise! 💕', 'font-size: 16px; color: #ff1744;');
});

// Music autoplay setup
function setupMusicAutoplay() {
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    if (!bgMusic || !musicToggle) return;
    
    // Try to autoplay on load (may be blocked by browsers)
    const tryAutoplay = async () => {
        try {
            bgMusic.volume = 0.3;
            await bgMusic.play();
            musicToggle.classList.add('playing');
        } catch (error) {
            console.log('Autoplay blocked, will play on first interaction');
        }
    };
    
    // Try autoplay immediately
    tryAutoplay();
    
    // Play on first user interaction
    const playOnInteraction = async () => {
        if (bgMusic.paused) {
            try {
                await bgMusic.play();
                musicToggle.classList.add('playing');
            } catch (error) {
                console.log('Could not play music');
            }
        }
        
        // Remove listeners after first interaction
        document.removeEventListener('click', playOnInteraction);
        document.removeEventListener('touchstart', playOnInteraction);
        document.removeEventListener('keydown', playOnInteraction);
    };
    
    // Listen for first interaction
    document.addEventListener('click', playOnInteraction, { once: true });
    document.addEventListener('touchstart', playOnInteraction, { once: true });
    document.addEventListener('keydown', playOnInteraction, { once: true });
    
    // Music toggle button functionality
    musicToggle.addEventListener('click', async () => {
        if (bgMusic.paused) {
            try {
                await bgMusic.play();
                musicToggle.classList.add('playing');
            } catch (error) {
                console.log('Could not play music');
            }
        } else {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
        }
    });
}

// Mobile-specific optimizations
function addMobileOptimizations() {
    // Pause animations when page is not visible (battery saving)
    document.addEventListener('visibilitychange', () => {
        const animatedElements = document.querySelectorAll('.floating-rose, .particle, .heart, .word');
        if (document.hidden) {
            animatedElements.forEach(el => el.style.animationPlayState = 'paused');
        } else {
            animatedElements.forEach(el => el.style.animationPlayState = 'running');
        }
    });
    
    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            // Update rose fall animation height
            const roseFallStyle = document.getElementById('roseFallStyle');
            if (roseFallStyle) {
                roseFallStyle.textContent = `
                    @keyframes roseFall {
                        0% {
                            transform: translateY(0) rotate(0deg);
                            opacity: 1;
                        }
                        100% {
                            transform: translateY(${window.innerHeight + 100}px) rotate(720deg);
                            opacity: 0.5;
                        }
                    }
                `;
            }
        }, 100);
    });
    
    // Prevent pull-to-refresh on mobile
    document.body.addEventListener('touchmove', (e) => {
        if (e.target === document.body || e.target === document.querySelector('.container')) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Add haptic feedback if available
    if ('vibrate' in navigator) {
        const interactiveElements = document.querySelectorAll('.rose-image, .music-toggle, .heart');
        interactiveElements.forEach(el => {
            el.addEventListener('click', () => {
                navigator.vibrate(50);
            });
        });
    }
}

// Add keyboard interaction - press 'R' for rose shower
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'r') {
        createRoseShower();
    }
});

// Function to create rose shower
function createRoseShower() {
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    const roseCount = isMobile ? 25 : 50;
    const delay = isMobile ? 80 : 50;
    
    for (let i = 0; i < roseCount; i++) {
        setTimeout(() => {
            const rose = document.createElement('div');
            rose.textContent = '🌹';
            rose.style.position = 'fixed';
            rose.style.fontSize = isMobile ? '30px' : '40px';
            rose.style.left = Math.random() * window.innerWidth + 'px';
            rose.style.top = '-50px';
            rose.style.pointerEvents = 'none';
            rose.style.zIndex = '1000';
            rose.style.animation = 'roseFall 3s ease-in forwards';
            
            document.body.appendChild(rose);
            
            setTimeout(() => {
                rose.remove();
            }, 3000);
        }, i * delay);
    }
    
    // Add rose fall animation
    if (!document.getElementById('roseFallStyle')) {
        const style = document.createElement('style');
        style.id = 'roseFallStyle';
        style.textContent = `
            @keyframes roseFall {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(${window.innerHeight + 100}px) rotate(720deg);
                    opacity: 0.5;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Click anywhere (except rose image) to trigger rose shower
document.addEventListener('click', (e) => {
    // Don't trigger if clicking on the rose image
    if (e.target.closest('.rose-image')) return;
    
    // Don't trigger if clicking on music toggle
    if (e.target.closest('.music-toggle')) return;
    
    createRoseShower();
});

// Add touch double-tap as alternative for mobile
let lastTap = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    // Double tap anywhere except rose image
    if (now - lastTap <= 300 && !e.target.closest('.rose-image')) {
        createRoseShower();
    }
    lastTap = now;
});

// Message box functionality
function setupMessageBox() {
    const trigger = document.getElementById('messageBoxTrigger');
    const messageBox = document.getElementById('messageBox');
    const messageCloseBtn = document.getElementById('messageCloseBtn');
    
    if (!trigger || !messageBox || !messageCloseBtn) return;
    
    // Show message box when clicking the trigger
    trigger.addEventListener('click', () => {
        messageBox.classList.add('active');
        
        // Play click sound if available
        const clickSound = document.getElementById('clickSound');
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {});
        }
        
        // Add haptic feedback if available
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    });
    
    // Close message box when clicking the close button
    messageCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        messageBox.classList.remove('active');
        
        // Add haptic feedback if available
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    });
    
    // Add haptic feedback on trigger click
    trigger.addEventListener('click', () => {
        if ('vibrate' in navigator) {
            navigator.vibrate(30);
        }
    });
}

// Photo album functionality
function setupAlbum() {
    const albumTrigger = document.getElementById('albumTrigger');
    const albumBox = document.getElementById('albumBox');
    const albumCloseBtn = document.getElementById('albumCloseBtn');
    
    if (!albumTrigger || !albumBox || !albumCloseBtn) return;
    
    // Show album box when clicking the trigger
    albumTrigger.addEventListener('click', () => {
        albumBox.classList.add('active');
        
        // Play click sound if available
        const clickSound = document.getElementById('clickSound');
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {});
        }
        
        // Add haptic feedback if available
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    });
    
    // Close album box when clicking the close button
    albumCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        albumBox.classList.remove('active');
        
        // Add haptic feedback if available
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    });
    
    // Add haptic feedback on trigger click
    albumTrigger.addEventListener('click', () => {
        if ('vibrate' in navigator) {
            navigator.vibrate(30);
        }
    });
    
    // Setup lightbox
    setupLightbox();
}

// Lightbox functionality
function setupLightbox() {
    const photoItems = document.querySelectorAll('.photo-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    if (!photoItems.length || !lightbox || !lightboxImage) return;
    
    const photoSrcs = [];
    photoItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            photoSrcs.push(img.src);
            item.addEventListener('click', () => openLightbox(index));
        }
    });
    
    let currentIndex = 0;
    
    function openLightbox(index) {
        currentIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        
        // Add haptic feedback if available
        if ('vibrate' in navigator) {
            navigator.vibrate(30);
        }
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
    }
    
    function updateLightboxImage() {
        const highResSrc = photoSrcs[currentIndex].replace('w=200&h=200', 'w=800&h=800');
        lightboxImage.src = highResSrc;
        lightboxCounter.textContent = `${currentIndex + 1} / ${photoSrcs.length}`;
    }
    
    function showPrev() {
        currentIndex = (currentIndex - 1 + photoSrcs.length) % photoSrcs.length;
        updateLightboxImage();
        
        // Add haptic feedback if available
        if ('vibrate' in navigator) {
            navigator.vibrate(20);
        }
    }
    
    function showNext() {
        currentIndex = (currentIndex + 1) % photoSrcs.length;
        updateLightboxImage();
        
        // Add haptic feedback if available
        if ('vibrate' in navigator) {
            navigator.vibrate(20);
        }
    }
    
    // Event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrev);
    lightboxNext.addEventListener('click', showNext);
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
}
