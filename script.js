// SalesforceConsultants.io - Main JavaScript

// ===== CLEAR COLOR ALTERNATING SYSTEM =====
function fixAllColorContrastIssues() {
    console.log('🔧 Applying clear color alternating system...');
    
    // Get all elements with text content, excluding navbar elements
    const allElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, div, span, a, li, td, th');
    
    allElements.forEach(element => {
        // Skip navbar elements
        if (isNavbarElement(element)) {
            return;
        }
        
        const computedStyle = window.getComputedStyle(element);
        const backgroundColor = computedStyle.backgroundColor;
        
        // Skip if no background color or transparent
        if (!backgroundColor || backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
            return;
        }
        
        // Check if background is light or dark
        const isLightBackground = isLightColor(backgroundColor);
        
        // Apply clear alternating pattern
        if (isLightBackground) {
            // Light background = black text
            element.style.color = 'var(--dark)';
        } else {
            // Dark background = white text
            element.style.color = 'var(--white)';
        }
    });
    
    // Special handling for specific sections
    fixProcessStepColors();
    fixCardColors();
    
    console.log('✅ Clear color alternating system applied');
}

function isNavbarElement(element) {
    // Check if element is part of the navbar
    return element.closest('header') !== null ||
           element.closest('.main-nav') !== null ||
           element.closest('.nav-icons') !== null ||
           element.closest('.nav-dropdown') !== null ||
           element.closest('.share-dropdown') !== null ||
           element.closest('.share-menu') !== null ||
           element.closest('.mobile-menu-btn') !== null ||
           element.closest('.logo') !== null ||
           element.closest('.nav-icon') !== null;
}

function isLightColor(color) {
    // Convert color to RGB values
    const rgb = parseColor(color);
    if (!rgb) return false;
    
    // Calculate luminance
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5;
}

function parseColor(color) {
    // Handle rgba format
    const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
    if (rgbaMatch) {
        return {
            r: parseInt(rgbaMatch[1]),
            g: parseInt(rgbaMatch[2]),
            b: parseInt(rgbaMatch[3])
        };
    }
    
    // Handle hex format
    const hexMatch = color.match(/#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i);
    if (hexMatch) {
        return {
            r: parseInt(hexMatch[1], 16),
            g: parseInt(hexMatch[2], 16),
            b: parseInt(hexMatch[3], 16)
        };
    }
    
    return null;
}

function fixProcessStepColors() {
    const processSteps = document.querySelectorAll('.process-step, .process-section .process-step');
    processSteps.forEach(step => {
        // Skip if part of navbar
        if (isNavbarElement(step)) return;
        
        const headings = step.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const paragraphs = step.querySelectorAll('p');
        const divs = step.querySelectorAll('div');
        
        [...headings, ...paragraphs, ...divs].forEach(element => {
            if (!isNavbarElement(element)) {
                element.style.color = 'var(--dark)';
            }
        });
    });
}

function fixCardColors() {
    const cards = document.querySelectorAll('.benefit-item, .service-item, .testimonial-card, .leader-card, .why-card');
    cards.forEach(card => {
        // Skip if part of navbar
        if (isNavbarElement(card)) return;
        
        const computedStyle = window.getComputedStyle(card);
        const backgroundColor = computedStyle.backgroundColor;
        
        if (isLightColor(backgroundColor)) {
            // Light background = black text
            const textElements = card.querySelectorAll('h1, h2, h3, h4, h5, h6, p, div, span');
            textElements.forEach(element => {
                if (!isNavbarElement(element)) {
                    element.style.color = 'var(--dark)';
                }
            });
        } else {
            // Dark background = white text
            const textElements = card.querySelectorAll('h1, h2, h3, h4, h5, h6, p, div, span');
            textElements.forEach(element => {
                if (!isNavbarElement(element)) {
                    element.style.color = 'var(--white)';
                }
            });
        }
    });
}

// Main initialization function
function initializeSite() {
    console.log('🚀 Initializing SalesforceConsultants.io...');
    
    // Initialize color system
    fixAllColorContrastIssues();
    
    // Initialize search system
    initializeSearch();
    
    // Initialize mobile menu
    handleMobileMenu();
    
    // Initialize lazy loading
    lazyLoadImages();
    
    // Initialize form validation
    validateForm();
    
    // Initialize form handling
    initializeFormHandling();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize stats observer
    initializeStatsObserver();
    
    // Initialize performance optimizations
    initializePerformanceOptimizations();
    
    // Initialize bio modal
    initializeBioModal();
    
    // Initialize exit intent popup
    initializeExitIntentPopup();
    
    // Set up periodic color fixing
    setTimeout(fixAllColorContrastIssues, 1000);
    setInterval(fixAllColorContrastIssues, 5000);
    
    console.log('✅ Site initialization complete');
}

// Single DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', initializeSite);

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
                
                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New service worker available
                            showNotification('New version available! Refresh to update.', 'info');
                        }
                    });
                });
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Universal Search System
let searchData = [];
let searchModal = null;
let searchInput = null;
let searchResults = null;
let currentSearchIndex = -1;

// Initialize search system
function initializeSearch() {
    console.log('Initializing search system...');
    
    // Create search modal
    createSearchModal();
    
    // Add click handlers to search icons
    const searchIcons = document.querySelectorAll('.search-icon');
    console.log('Found search icons:', searchIcons.length);
    searchIcons.forEach(icon => {
        icon.addEventListener('click', openSearchModal);
    });
    
    // Add keyboard shortcut (Ctrl/Cmd + K)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearchModal();
        }
    });
    
    // Load search data
    loadSearchData();
    
    console.log('Search system initialized successfully');
}

// Create search modal
function createSearchModal() {
    const modalHTML = `
        <div id="searchModal" class="search-modal" style="display: none;">
            <div class="search-overlay"></div>
            <div class="search-container">
                <div class="search-header">
                    <div class="search-input-wrapper">
                        <svg class="search-icon-svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        <input type="text" id="searchInput" placeholder="Search for Salesforce implementation, services, expertise..." autocomplete="off">
                        <button class="search-close" onclick="closeSearchModal()">×</button>
                    </div>
                </div>
                <div class="search-results" id="searchResults">
                    <div class="search-placeholder">
                        <p>Type to search across all content...</p>
                        <div class="search-shortcuts">
                            <span>⌘K to open search</span>
                            <span>↑↓ to navigate</span>
                            <span>Enter to select</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    searchModal = document.getElementById('searchModal');
    searchInput = document.getElementById('searchInput');
    searchResults = document.getElementById('searchResults');
    
    // Add event listeners
    searchInput.addEventListener('input', debounce(performSearch, 300));
    searchInput.addEventListener('keydown', handleSearchKeydown);
    
    // Close modal when clicking overlay
    searchModal.querySelector('.search-overlay').addEventListener('click', closeSearchModal);
}

// Open search modal
function openSearchModal() {
    console.log('Opening search modal...');
    if (searchModal) {
        searchModal.style.display = 'block';
        searchInput.focus();
        searchInput.select();
        
        // Add body scroll lock
        document.body.style.overflow = 'hidden';
        
        // Show placeholder
        searchResults.innerHTML = `
            <div class="search-placeholder">
                <p>Type to search across all content...</p>
                <div class="search-shortcuts">
                    <span>⌘K to open search</span>
                    <span>↑↓ to navigate</span>
                    <span>Enter to select</span>
                </div>
            </div>
        `;
        console.log('Search modal opened successfully');
    } else {
        console.error('Search modal not found!');
    }
}

// Close search modal
function closeSearchModal() {
    if (searchModal) {
        searchModal.style.display = 'none';
        searchInput.value = '';
        currentSearchIndex = -1;
        
        // Remove body scroll lock
        document.body.style.overflow = '';
    }
}

// Handle search keyboard navigation
function handleSearchKeydown(e) {
    const results = searchResults.querySelectorAll('.search-result-item');
    
    switch(e.key) {
        case 'Escape':
            closeSearchModal();
            break;
        case 'ArrowDown':
            e.preventDefault();
            currentSearchIndex = Math.min(currentSearchIndex + 1, results.length - 1);
            updateSearchSelection(results);
            break;
        case 'ArrowUp':
            e.preventDefault();
            currentSearchIndex = Math.max(currentSearchIndex - 1, -1);
            updateSearchSelection(results);
            break;
        case 'Enter':
            e.preventDefault();
            if (currentSearchIndex >= 0 && results[currentSearchIndex]) {
                results[currentSearchIndex].click();
            }
            break;
    }
}

// Update search selection
function updateSearchSelection(results) {
    results.forEach((item, index) => {
        item.classList.toggle('selected', index === currentSearchIndex);
    });
}

// Load search data from all pages
function loadSearchData() {
    console.log('Loading search data...');
    searchData = [
        // Home page content
        {
            title: 'Salesforce Implementation Services',
            content: 'Comprehensive Salesforce implementation and adoption services for businesses and nonprofits',
            url: 'index.html',
            category: 'Services',
            tags: ['implementation', 'adoption', 'salesforce']
        },
        {
            title: 'Custom Salesforce Development',
            content: 'Custom Salesforce development solutions tailored to your specific business needs',
            url: 'index.html#services',
            category: 'Services',
            tags: ['custom', 'development', 'salesforce']
        },
        {
            title: 'Salesforce Training & Certification',
            content: 'Salesforce training programs and certification preparation for your team',
            url: 'index.html#services',
            category: 'Services',
            tags: ['training', 'certification', 'salesforce']
        },
        {
            title: 'Salesforce Integrations',
            content: 'Seamless Salesforce integrations with your existing systems and applications',
            url: 'index.html#services',
            category: 'Services',
            tags: ['integrations', 'salesforce', 'systems']
        },
        {
            title: 'Salesforce Automation',
            content: 'Advanced Salesforce automation solutions to streamline your business processes',
            url: 'index.html#services',
            category: 'Services',
            tags: ['automation', 'salesforce', 'processes']
        },
        {
            title: 'Salesforce Migrations',
            content: 'Expert Salesforce migration services to upgrade and optimize your platform',
            url: 'index.html#services',
            category: 'Services',
            tags: ['migration', 'salesforce', 'upgrade']
        },
        
        // Services page content
        {
            title: 'Salesforce Implementation & Adoption',
            content: 'Complete Salesforce implementation and adoption services with proven methodologies',
            url: 'services.html',
            category: 'Services',
            tags: ['implementation', 'adoption', 'methodologies']
        },
        {
            title: 'Custom Salesforce Development',
            content: 'Custom Salesforce development with advanced features and integrations',
            url: 'services.html',
            category: 'Services',
            tags: ['custom', 'development', 'features']
        },
        {
            title: 'Salesforce Training Programs',
            content: 'Comprehensive Salesforce training programs for administrators and users',
            url: 'services.html',
            category: 'Services',
            tags: ['training', 'programs', 'administrators']
        },
        {
            title: 'Salesforce System Integration',
            content: 'Seamless Salesforce system integration with third-party applications',
            url: 'services.html',
            category: 'Services',
            tags: ['integration', 'third-party', 'applications']
        },
        {
            title: 'Salesforce AI & Automation',
            content: 'Advanced Salesforce AI and automation solutions for business efficiency',
            url: 'services.html',
            category: 'Services',
            tags: ['ai', 'automation', 'efficiency']
        },
        {
            title: 'Salesforce Migration Services',
            content: 'Expert Salesforce migration services for platform upgrades and optimization',
            url: 'services.html',
            category: 'Services',
            tags: ['migration', 'upgrades', 'optimization']
        },
        
        // Success Stories content
        {
            title: 'LA Chamber of Commerce Success Story',
            content: 'How we transformed LA Chamber with comprehensive Salesforce solutions and training',
            url: 'success-stories.html',
            category: 'Success Stories',
            tags: ['chamber', 'commerce', 'training', 'success']
        },
        {
            title: 'Nonprofit Salesforce Implementation',
            content: 'Nonprofit Salesforce implementation that increased donor retention by 35%',
            url: 'success-stories.html',
            category: 'Success Stories',
            tags: ['nonprofit', 'donor', 'retention', 'implementation']
        },
        
        // Expertise content
        {
            title: 'Salesforce for Nonprofits',
            content: 'Specialized Salesforce solutions for nonprofit organizations and NPSP',
            url: 'expertise.html',
            category: 'Expertise',
            tags: ['nonprofit', 'npsp', 'organizations']
        },
        {
            title: 'Salesforce for Businesses',
            content: 'Comprehensive Salesforce solutions for businesses of all sizes',
            url: 'expertise.html',
            category: 'Expertise',
            tags: ['businesses', 'solutions', 'enterprise']
        },
        {
            title: 'Salesforce Certifications',
            content: '15+ Salesforce certifications across all major Salesforce products',
            url: 'expertise.html',
            category: 'Expertise',
            tags: ['certifications', 'salesforce', 'products']
        },
        
        // Contact content
        {
            title: 'Contact Salesforce Consultants',
            content: 'Get in touch for free Salesforce consultation and assessment',
            url: 'contact.html',
            category: 'Contact',
            tags: ['contact', 'consultation', 'assessment']
        },
        
        // Implementation Recovery content
        {
            title: 'Salesforce Implementation Recovery',
            content: 'Expert Salesforce implementation recovery services for failed or stalled projects',
            url: 'services/implementation-recovery.html',
            category: 'Services',
            tags: ['recovery', 'failed', 'stalled', 'projects']
        },
        
        // Partner content
        {
            title: 'Trusted by Industry Leaders',
            content: 'Our partners and clients across various industries trust us with their Salesforce transformation',
            url: 'index.html#partners',
            category: 'Partners',
            tags: ['partners', 'industry', 'leaders', 'trusted']
        },
        {
            title: 'Employer Partners',
            content: 'Organizations that trust us with their Salesforce transformation and implementation',
            url: 'clients.html',
            category: 'Partners',
            tags: ['employer', 'partners', 'organizations', 'trust']
        },
        {
            title: 'Salesforce Consulting Partnership',
            content: 'Strategic Salesforce consulting partnerships that deliver results and build long-term relationships',
            url: 'clients.html',
            category: 'Partners',
            tags: ['consulting', 'partnership', 'strategic', 'relationships']
        },
        {
            title: 'Partner Logos and Testimonials',
            content: 'See our partner logos and read testimonials from organizations we\'ve helped transform',
            url: 'clients.html',
            category: 'Partners',
            tags: ['logos', 'testimonials', 'transform', 'organizations']
        },
        {
            title: 'DevPipeline Partnership',
            content: 'A DevPipeline Division - This partnership allows us to provide comprehensive Salesforce solutions',
            url: 'index.html',
            category: 'Partners',
            tags: ['devpipeline', 'partnership', 'comprehensive', 'solutions']
        },
        {
            title: 'Salesforce Implementation Partner',
            content: 'Professional Salesforce implementation partner services for businesses and nonprofits',
            url: 'services.html',
            category: 'Services',
            tags: ['implementation', 'partner', 'professional', 'services']
        },
        
        // Chamber of Commerce content
        {
            title: 'LA Chamber of Commerce Success Story',
            content: 'How we transformed LA Chamber with comprehensive Salesforce solutions and training',
            url: 'success-stories.html',
            category: 'Success Stories',
            tags: ['chamber', 'commerce', 'la', 'training', 'success']
        },
        {
            title: 'Chambers of Commerce Solutions',
            content: 'Multi-departmental Salesforce solutions for Chambers of Commerce and business associations',
            url: 'services.html',
            category: 'Services',
            tags: ['chamber', 'commerce', 'multi-departmental', 'associations']
        },
        
        // Nonprofit content
        {
            title: 'Nonprofit Salesforce Solutions',
            content: 'Specialized Salesforce Nonprofit Cloud and NPSP solutions for mission-driven organizations',
            url: 'services.html',
            category: 'Services',
            tags: ['nonprofit', 'npsp', 'mission', 'organizations']
        },
        {
            title: 'Nonprofit Salesforce Implementation',
            content: 'Nonprofit Salesforce implementation that increased donor retention by 35%',
            url: 'success-stories.html',
            category: 'Success Stories',
            tags: ['nonprofit', 'donor', 'retention', 'implementation']
        },
        
        // Client content
        {
            title: 'Client Success Stories',
            content: 'Real results from real organizations. See how our Salesforce consulting services have transformed businesses and nonprofits',
            url: 'success-stories.html',
            category: 'Success Stories',
            tags: ['client', 'success', 'stories', 'results', 'organizations']
        },
        {
            title: 'Client Testimonials',
            content: 'Hear from our satisfied clients about their Salesforce transformation and success',
            url: 'expertise.html',
            category: 'Expertise',
            tags: ['client', 'testimonials', 'satisfied', 'transformation']
        },
        {
            title: 'Client Satisfaction',
            content: '100% client satisfaction rate with proven results across all implementations',
            url: 'success-stories.html',
            category: 'Success Stories',
            tags: ['client', 'satisfaction', 'results', 'implementations']
        },
        
        // ROI content
        {
            title: 'Salesforce ROI Calculator',
            content: 'Calculate your Salesforce ROI with our proven methodologies that deliver measurable ROI for businesses and nonprofits',
            url: 'index.html',
            category: 'Services',
            tags: ['roi', 'calculator', 'measurable', 'methodologies']
        },
        {
            title: '6-Month ROI Achievement',
            content: 'Return on investment achieved within 6 months of Salesforce implementation',
            url: 'success-stories.html',
            category: 'Success Stories',
            tags: ['roi', '6-month', 'investment', 'implementation']
        },
        
        // Training content
        {
            title: 'Salesforce Training Programs',
            content: 'Comprehensive Salesforce training programs for administrators and end users with certification preparation',
            url: 'services.html#training',
            category: 'Services',
            tags: ['training', 'programs', 'administrators', 'certification']
        },
        {
            title: 'Salesforce Admin Training',
            content: 'Expert-led Salesforce administrator training with certification preparation and ongoing support',
            url: 'clients.html',
            category: 'Services',
            tags: ['training', 'admin', 'certification', 'support']
        },
        {
            title: 'User Training & Adoption',
            content: 'Comprehensive user training and change management support for successful Salesforce adoption',
            url: 'index.html',
            category: 'Services',
            tags: ['training', 'user', 'adoption', 'change-management']
        },
        
        // Certification content
        {
            title: '15+ Salesforce Certifications',
            content: 'Our team holds 15+ Salesforce certifications across all major Salesforce products and clouds',
            url: 'expertise.html',
            category: 'Expertise',
            tags: ['certifications', 'salesforce', 'products', 'clouds']
        },
        {
            title: 'Salesforce Certification Training',
            content: 'Salesforce certification preparation and training for administrators and developers',
            url: 'services.html',
            category: 'Services',
            tags: ['certification', 'training', 'preparation', 'administrators']
        }
    ];
    console.log('Search data loaded successfully. Total items:', searchData.length);
    console.log('Sample search data:', searchData.slice(0, 3));
}

// Perform search
function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    console.log('Search query:', query);
    console.log('Search data length:', searchData.length);
    
    if (query.length < 2) {
        searchResults.innerHTML = `
            <div class="search-placeholder">
                <p>Type to search across all content...</p>
                <div class="search-shortcuts">
                    <span>⌘K to open search</span>
                    <span>↑↓ to navigate</span>
                    <span>Enter to select</span>
                </div>
            </div>
        `;
        return;
    }
    
    const results = searchData.filter(item => {
        const searchText = `${item.title} ${item.content} ${item.tags.join(' ')}`.toLowerCase();
        const matches = searchText.includes(query);
        if (matches) {
            console.log('Match found:', item.title);
        }
        return matches;
    });
    
    console.log('Search results count:', results.length);
    displaySearchResults(results, query);
}

// Display search results
function displaySearchResults(results, query) {
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-no-results">
                <p>No results found for "${query}"</p>
                <p>Try different keywords or check spelling</p>
            </div>
        `;
        return;
    }
    
    // Group results by category
    const groupedResults = results.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {});
    
    let resultsHTML = '';
    
    Object.entries(groupedResults).forEach(([category, items]) => {
        resultsHTML += `
            <div class="search-category">
                <h3>${category}</h3>
                <div class="search-category-results">
        `;
        
        items.forEach(item => {
            const highlightedTitle = highlightText(item.title, query);
            const highlightedContent = highlightText(item.content, query);
            
            resultsHTML += `
                <a href="${item.url}" class="search-result-item" onclick="closeSearchModal()">
                    <div class="search-result-title">${highlightedTitle}</div>
                    <div class="search-result-content">${highlightedContent}</div>
                    <div class="search-result-url">${item.url}</div>
                </a>
            `;
        });
        
        resultsHTML += `
                </div>
            </div>
        `;
    });
    
    searchResults.innerHTML = resultsHTML;
    currentSearchIndex = -1;
}

// Highlight search terms in text
function highlightText(text, query) {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.nav-dropdown');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenu && mobileMenuBtn) {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    }
}

// Share dropdown toggle
function toggleShareDropdown() {
    const shareMenu = document.getElementById('shareMenu');
    if (shareMenu) {
        shareMenu.classList.toggle('active');
    }
}

// Copy to clipboard function
function copyToClipboard() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        // Show success notification
        showNotification('Link copied to clipboard!', 'success');
        // Close dropdown
        toggleShareDropdown();
    }).catch(err => {
        console.error('Failed to copy: ', err);
        showNotification('Failed to copy link', 'error');
    });
}

// Close share dropdown when clicking outside
document.addEventListener('click', function(event) {
    const shareDropdown = document.querySelector('.share-dropdown');
    const shareMenu = document.getElementById('shareMenu');
    
    if (shareDropdown && shareMenu && !shareDropdown.contains(event.target)) {
        shareMenu.classList.remove('active');
    }
});

// Read more toggle function
function toggleReadMore() {
    const expandedContent = document.getElementById('expandedContent');
    const readMoreBtn = document.querySelector('.read-more-btn');
    
    if (expandedContent && readMoreBtn) {
        if (expandedContent.style.display === 'none') {
            expandedContent.style.display = 'block';
            readMoreBtn.textContent = 'Read Less';
        } else {
            expandedContent.style.display = 'none';
            readMoreBtn.textContent = 'Read More';
        }
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if href is just "#" (not a valid selector)
            if (targetId === '#') {
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Smooth scrolling for emergency button
    const emergencyBtn = document.querySelector('.btn-emergency');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function(e) {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                e.preventDefault();
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'var(--white)';
        header.style.backdropFilter = 'none';
        header.style.boxShadow = 'var(--shadow-light)';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .feature-card, .cert-category, .testimonial');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Form Handling
function initializeFormHandling() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual Formspree handling)
            setTimeout(() => {
                // Show success message
                showNotification('Thank you! Your Salesforce assessment request has been sent. We\'ll contact you soon.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 2000);
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS animation for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s;
    }
    
    .notification-close:hover {
        background: rgba(255,255,255,0.2);
    }
`;
document.head.appendChild(style);

// Stats Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('%') ? '%' : '+');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent.replace('+', '') + (counter.textContent.includes('%') ? '' : '+');
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

function initializeStatsObserver() {
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// Mobile Menu Responsive Behavior
function handleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    // Add mobile menu styles if not already present
    if (!document.getElementById('mobile-menu-styles')) {
        const mobileStyles = `
            @media (max-width: 768px) {
                #nav-menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: var(--white);
                    flex-direction: column;
                    padding: 1rem;
                    box-shadow: var(--shadow-medium);
                    border-top: 1px solid var(--light-gray);
                }
                
                #nav-menu.active {
                    display: flex;
                }
                
                #nav-menu li {
                    margin: 0.5rem 0;
                }
                
                #nav-menu a {
                    display: block;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid var(--light-gray);
                }
                
                #nav-menu a:last-child {
                    border-bottom: none;
                }
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.id = 'mobile-menu-styles';
        styleElement.textContent = mobileStyles;
        document.head.appendChild(styleElement);
    }
}



// Form Validation
function validateForm() {
    const requiredFields = document.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'var(--accent-red)';
            isValid = false;
        } else {
            field.style.borderColor = 'var(--light-gray)';
        }
    });
    
    // Email validation
    const emailField = document.getElementById('email');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            emailField.style.borderColor = 'var(--accent-red)';
            isValid = false;
        }
    }
    
    return isValid;
}

function initializeFormValidation() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            if (!validateForm()) {
                e.preventDefault();
                showNotification('Please fill in all required fields correctly.', 'error');
            }
        });
    }
}

// Enhanced Lazy Loading for Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
    });
    
    images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// Performance optimization: Preload critical images
function preloadCriticalImages() {
    const criticalImages = [
        'assets/logos/Salesforce_Consulting_Logo.svg',
        'assets/Jason Fletcher Profile.JPG',
        'assets/Shayne Roy Profile.png'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Performance optimization: Optimize CSS loading
function optimizeCSSLoading() {
    // Add critical CSS inline if needed
    const criticalCSS = `
        .hero-section { opacity: 1; }
        .leader-card { opacity: 1; }
        .process-step { opacity: 1; }
    `;
    
    if (document.readyState === 'loading') {
        const style = document.createElement('style');
        style.textContent = criticalCSS;
        document.head.appendChild(style);
    }
}

function initializePerformanceOptimizations() {
    preloadCriticalImages();
    optimizeCSSLoading();
}

// Performance Optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Header scroll effect (already implemented above)
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Console welcome message
console.log(`
        Welcome to SalesforceConsultants.io!
    
Transform your Salesforce investment with our certified consultants.
15+ certifications, proven results, mission-driven approach.
    
Get started: https://salesforceconsultants.io
        Contact: marketing@devpipeline.com
Phone: (385) 309-0807
`);

// Bio Modal Functions
function openBioModal(person) {
    const modal = document.getElementById('bioModal');
    const jasonBio = document.getElementById('jasonBio');
    const shayneBio = document.getElementById('shayneBio');
    
    // Hide all bio content first
    jasonBio.style.display = 'none';
    shayneBio.style.display = 'none';
    
    // Show the appropriate bio content
    if (person === 'jason') {
        jasonBio.style.display = 'block';
    } else if (person === 'shayne') {
        shayneBio.style.display = 'block';
    }
    
    // Show the modal
    modal.style.display = 'block';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Add animation
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.style.transition = 'opacity 0.3s ease';
    }, 10);
}

function closeBioModal() {
    const modal = document.getElementById('bioModal');
    
    // Hide the modal
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

function initializeBioModal() {
    const modal = document.getElementById('bioModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeBioModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeBioModal();
        }
    });
}

// Exit Intent Popup System
function initializeExitIntentPopup() {
    let hasShownPopup = false;
    let isPopupVisible = false;
    
    // Create popup HTML
    const popupHTML = `
        <div id="exitIntentPopup" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; padding: 2rem; border-radius: 16px; max-width: 500px; margin: 1rem; text-align: center; position: relative; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
                <button onclick="closeExitIntentPopup()" style="position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 24px; cursor: pointer; color: #666;">×</button>
                <h3 style="color: #3AAEAA; margin-bottom: 1rem; font-size: 1.5rem;">Wait! Get Your Free Salesforce Assessment</h3>
                <p style="color: #5a6c7d; margin-bottom: 1.5rem; line-height: 1.6;">Don't miss out on optimizing your Salesforce investment. Get a free assessment worth $500 and discover how to improve your ROI by 40%.</p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="contact.html" style="background: #3AAEAA; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; transition: all 0.3s ease;">Get Free Assessment</a>
                    <button onclick="closeExitIntentPopup()" style="background: #f8f9fa; color: #5a6c7d; padding: 12px 24px; border: 1px solid #dee2e6; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">Maybe Later</button>
                </div>
            </div>
        </div>
    `;
    
    // Add popup to page
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    
    // Track mouse movement
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !hasShownPopup && !isPopupVisible) {
            showExitIntentPopup();
        }
    });
    
    // Track scroll behavior (if user scrolls to bottom quickly)
    let scrollTimeout;
    document.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercentage > 80 && !hasShownPopup && !isPopupVisible) {
                showExitIntentPopup();
            }
        }, 1000);
    });
}

function showExitIntentPopup() {
    const popup = document.getElementById('exitIntentPopup');
    if (popup && !isPopupVisible) {
        popup.style.display = 'flex';
        isPopupVisible = true;
        hasShownPopup = true;
        
        // Track conversion
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exit_intent_popup_shown', {
                'event_category': 'engagement',
                'event_label': 'exit_intent_popup'
            });
        }
    }
}

function closeExitIntentPopup() {
    const popup = document.getElementById('exitIntentPopup');
    if (popup) {
        popup.style.display = 'none';
        isPopupVisible = false;
    }
}

// Export functions for global access (if needed)
window.toggleMobileMenu = toggleMobileMenu;
window.showNotification = showNotification;
window.openSearchModal = openSearchModal;
window.closeSearchModal = closeSearchModal;
window.openBioModal = openBioModal;
window.closeBioModal = closeBioModal;
window.closeExitIntentPopup = closeExitIntentPopup;

 