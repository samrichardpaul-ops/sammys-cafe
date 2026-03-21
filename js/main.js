// Menu Data
const menuItems = [
    // Grills
    { id: 1, name: "Tandoori Chicken", price: "₹299", category: "grills", description: "Juicy chicken marinated in yogurt and spices", image: "https://images.unsplash.com/photo-1593194586438-6e3e2e7d5b3c?w=300&h=200&fit=crop" },
    { id: 2, name: "Grilled Fish", price: "₹399", category: "grills", description: "Fresh fish grilled with herbs", image: "https://images.unsplash.com/photo-1532550902899-6f0d7b8f9156?w=300&h=200&fit=crop" },
    { id: 3, name: "Seekh Kebab", price: "₹249", category: "grills", description: "Minced meat skewers with spices", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&h=200&fit=crop" },
    { id: 4, name: "Grill Platter", price: "₹599", category: "grills", description: "Assorted grills for sharing", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop" },
    // Burgers
    { id: 5, name: "Classic Burger", price: "₹199", category: "burgers", description: "Beef patty with lettuce and tomato", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop" },
    { id: 6, name: "Grill Chicken Burger", price: "₹249", category: "burgers", description: "Grilled chicken with special sauce", image: "https://images.unsplash.com/photo-1553979459-d2229ba7431b?w=300&h=200&fit=crop" },
    { id: 7, name: "Veg Burger", price: "₹149", category: "burgers", description: "Grilled veg patty with cheese", image: "https://images.unsplash.com/photo-1525059698534-4967a8e1d8d2?w=300&h=200&fit=crop" },
    // Beverages
    { id: 8, name: "Fresh Lime Soda", price: "₹99", category: "beverages", description: "Refreshing lime soda", image: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=300&h=200&fit=crop" },
    { id: 9, name: "Mint Mojito", price: "₹149", category: "beverages", description: "Fresh mint mojito", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=200&fit=crop" },
    { id: 10, name: "Cold Coffee", price: "₹129", category: "beverages", description: "Creamy cold coffee", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=300&h=200&fit=crop" },
    // Desserts
    { id: 11, name: "Chocolate Brownie", price: "₹179", category: "desserts", description: "Warm brownie with ice cream", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=200&fit=crop" },
    { id: 12, name: "Gulab Jamun", price: "₹129", category: "desserts", description: "Soft milk dumplings in syrup", image: "https://images.unsplash.com/photo-1601054951041-6d2a25a3c3d5?w=300&h=200&fit=crop" }
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
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
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
                // Update active class
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Load filtered items
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
    
    // Clear message after 5 seconds
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
        
        // Get form data
        const formData = {
            name: document.getElementById('name')?.value || '',
            email: document.getElementById('email')?.value || '',
            phone: document.getElementById('phone')?.value || '',
            date: document.getElementById('date')?.value || '',
            time: document.getElementById('time')?.value || '',
            guests: document.getElementById('guests')?.value || '1',
            special: document.getElementById('special')?.value || ''
        };
        
        // Validate all fields are filled
        if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
            showMessage('Please fill all required fields', 'error');
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        showMessage('Saving reservation...', '');
        
        try {
            // For now, show success message (backend will be connected when hosted)
            // When hosted, uncomment the fetch code below
            
            /*
            const response = await fetch('backend/save_reservation.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                showMessage('✓ Reservation saved successfully! We will contact you soon.', 'success');
                form.reset();
            } else {
                showMessage('✗ Error: ' + result.message, 'error');
            }
            */
            
            // Temporary success message for now
            showMessage('✓ Reservation submitted successfully! (Backend will be connected after hosting)', 'success');
            form.reset();
            
        } catch (error) {
            showMessage('✗ Network error. Please try again.', 'error');
            console.error('Error:', error);
        }
    });
}

// Set Minimum Date for Reservation
function setMinDate() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}

// Navbar Background Change on Scroll
function initNavbarScroll() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = '#1a1a1a';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = '#1a1a1a';
        }
    });
}

// Animation on Scroll
function initScrollAnimation() {
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, options);
    
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