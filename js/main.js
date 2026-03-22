// Menu Data
const menuItems = [
    // Grills
    { id: 1, name: "Tandoori Chicken", price: "₹299", category: "grills", description: "Juicy chicken marinated in yogurt and spices", image: "https://placehold.co/300x200/ff6b35/white?text=Tandoori+Chicken" },
    { id: 2, name: "Grilled Fish", price: "₹399", category: "grills", description: "Fresh fish grilled with herbs", image: "https://placehold.co/300x200/ff6b35/white?text=Grilled+Fish" },
    { id: 3, name: "Seekh Kebab", price: "₹249", category: "grills", description: "Minced meat skewers with spices", image: "https://placehold.co/300x200/ff6b35/white?text=Seekh+Kebab" },
    { id: 4, name: "Grill Platter", price: "₹599", category: "grills", description: "Assorted grills for sharing", image: "https://placehold.co/300x200/ff6b35/white?text=Grill+Platter" },
    // Burgers
    { id: 5, name: "Classic Burger", price: "₹199", category: "burgers", description: "Beef patty with lettuce and tomato", image: "https://placehold.co/300x200/ff6b35/white?text=Classic+Burger" },
    { id: 6, name: "Grill Chicken Burger", price: "₹249", category: "burgers", description: "Grilled chicken with special sauce", image: "https://placehold.co/300x200/ff6b35/white?text=Chicken+Burger" },
    { id: 7, name: "Veg Burger", price: "₹149", category: "burgers", description: "Grilled veg patty with cheese", image: "https://placehold.co/300x200/ff6b35/white?text=Veg+Burger" },
    // Beverages
    { id: 8, name: "Fresh Lime Soda", price: "₹99", category: "beverages", description: "Refreshing lime soda", image: "https://placehold.co/300x200/ff6b35/white?text=Lime+Soda" },
    { id: 9, name: "Mint Mojito", price: "₹149", category: "beverages", description: "Fresh mint mojito", image: "https://placehold.co/300x200/ff6b35/white?text=Mint+Mojito" },
    { id: 10, name: "Cold Coffee", price: "₹129", category: "beverages", description: "Creamy cold coffee", image: "https://placehold.co/300x200/ff6b35/white?text=Cold+Coffee" },
    // Desserts
    { id: 11, name: "Chocolate Brownie", price: "₹179", category: "desserts", description: "Warm brownie with ice cream", image: "https://placehold.co/300x200/ff6b35/white?text=Brownie" },
    { id: 12, name: "Gulab Jamun", price: "₹129", category: "desserts", description: "Soft milk dumplings in syrup", image: "https://placehold.co/300x200/ff6b35/white?text=Gulab+Jamun" }
];

// Load Menu Items
function loadMenuItems(category = 'all') {
    const menuGrid = document.getElementById('menuGrid');
    if (!menuGrid) return;
    
    let filteredItems = menuItems;
    if (category !== 'all') {
        filteredItems = menuItems.filter(item => item.category === category);
    }
    
    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="menu-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <div class="price">${item.price}</div>
                <p class="description">${item.description}</p>
            </div>
        </div>
    `).join('');
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}

// Filter Buttons
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const category = btn.getAttribute('data-category');
                loadMenuItems(category);
            });
        });
    }
}

// Show Message Function
function showMessage(msg, type) {
    const messageDiv = document.getElementById('formMessage');
    if (!messageDiv) return;
    
    messageDiv.innerHTML = msg;
    messageDiv.className = `form-message ${type}`;
    
    setTimeout(() => {
        messageDiv.innerHTML = '';
        messageDiv.className = 'form-message';
    }, 5000);
}

// Reservation Form Handler
function initReservationForm() {
    const form = document.getElementById('reservationForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name')?.value || '',
            email: document.getElementById('email')?.value || '',
            phone: document.getElementById('phone')?.value || '',
            date: document.getElementById('date')?.value || '',
            time: document.getElementById('time')?.value || '',
            guests: document.getElementById('guests')?.value || '1',
            special: document.getElementById('special')?.value || ''
        };
        
        if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
            showMessage('Please fill all required fields', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        showMessage('Saving reservation...', '');
        
        try {
            const response = await fetch('http://sammyscafe.fwh.is/backend/save_reservation.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                showMessage('✓ Reservation saved to database! We will contact you soon.', 'success');
                form.reset();
            } else {
                showMessage('✗ Error: ' + result.message, 'error');
            }
        } catch (error) {
            showMessage('✗ Network error. Please try again.', 'error');
            console.error('Error:', error);
        }
    });
}

// Set Minimum Date
function setMinDate() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}

// Navbar Scroll Effect
function initNavbarScroll() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = '#1a1a1a';
        } else {
            navbar.style.background = '#1a1a1a';
        }
    });
}

// Scroll Animation
function initScrollAnimation() {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.5s ease';
        observer.observe(section);
    });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    loadMenuItems();
    initMobileMenu();
    initSmoothScroll();
    initFilters();
    initReservationForm();
    initNavbarScroll();
    initScrollAnimation();
    setMinDate();
});