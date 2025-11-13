 // Theme configurations
        const themes = {
            all: {
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                shapes: ['circle', 'square'],
                colors: ['#667eea', '#764ba2', '#8b7cf8'],
                icon: '🌅'
            },
            motivation: {
                gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                shapes: ['triangle', 'circle'],
                colors: ['#f093fb', '#f5576c', '#ff6b9d'],
                icon: '🔥'
            },
            wisdom: {
                gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                shapes: ['circle', 'square'],
                colors: ['#4facfe', '#00f2fe', '#5fd4f4'],
                icon: '🧠'
            },
            love: {
                gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                shapes: ['circle'],
                colors: ['#fa709a', '#fee140', '#fdb5b5'],
                icon: '💖'
            },
            success: {
                gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
                shapes: ['square', 'triangle'],
                colors: ['#30cfd0', '#330867', '#5a67d8'],
                icon: '🏆'
            },
            life: {
                gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                shapes: ['circle', 'square'],
                colors: ['#a8edea', '#fed6e3', '#d4f1f4'],
                icon: '🌱'
            },
            mythology: {
                gradient: 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 50%, #ff99ac 100%)',
                shapes: ['triangle', 'circle', 'square'],
                colors: ['#ff9a56', '#ff6a88', '#ff99ac'],
                icon: '🕉️'
            }
        };
        
        // Quotes
        const quotes = [
            { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "motivation" },
            { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "life" },
            { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "motivation" },
            { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", category: "wisdom" },
            { text: "Love all, trust a few, do wrong to none.", author: "William Shakespeare", category: "love" },
            { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "success" },
            { text: "The mind is everything. What you think you become.", author: "Buddha", category: "wisdom" },
            { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde", category: "life" },
            { text: "Darkness cannot drive out darkness; only light can do that.", author: "Martin Luther King Jr.", category: "love" },
            { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins", category: "motivation" },
            { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs", category: "life" },
            { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau", category: "success" },
            { text: "You have the right to perform your duty, but not to the fruits of your actions.", author: "Bhagavad Gita", category: "mythology" },
            { text: "Dharma protects those who protect it.", author: "Mahabharata", category: "mythology" },
            { text: "Truth alone triumphs.", author: "Mundaka Upanishad", category: "mythology" },
            { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", category: "wisdom" },
            { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", category: "motivation" },
            { text: "Love is composed of a single soul inhabiting two bodies.", author: "Aristotle", category: "love" },
            { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", category: "success" },
            { text: "Life is really simple, but we insist on making it complicated.", author: "Confucius", category: "life" }
        ];
        
        let currentQuote = null;
        let currentCategory = 'all';
        let favorites = JSON.parse(localStorage.getItem('inspirePulseFavorites')) || [];
        
        // DOM
        const bgGradient = document.getElementById('bgGradient');
        const shapesLayer = document.getElementById('shapesLayer');
        const particlesLayer = document.getElementById('particlesLayer');
        const logoIcon = document.getElementById('logoIcon');
        const quoteText = document.getElementById('quoteText');
        const quoteAuthor = document.getElementById('quoteAuthor');
        const quoteCategoryBadge = document.getElementById('quoteCategoryBadge');
        const categoryPills = document.querySelectorAll('.category-pill');
        const favoritesList = document.getElementById('favoritesList');
        
        // Apply theme
        function applyTheme(category) {
            const theme = themes[category];
            
            // Update gradient
            bgGradient.style.background = theme.gradient;
            
            // Update icon
            logoIcon.textContent = theme.icon;
            
            // Clear shapes
            shapesLayer.innerHTML = '';
            
            // Create shapes
            for (let i = 0; i < 6; i++) {
                const shape = document.createElement('div');
                const shapeType = theme.shapes[Math.floor(Math.random() * theme.shapes.length)];
                shape.className = `shape ${shapeType}`;
                
                const size = Math.random() * 100 + 80;
                const color = theme.colors[Math.floor(Math.random() * theme.colors.length)];
                
                shape.style.width = size + 'px';
                shape.style.height = size + 'px';
                shape.style.left = Math.random() * 100 + '%';
                shape.style.top = Math.random() * 100 + '%';
                
                if (shapeType === 'triangle') {
                    shape.style.color = color;
                } else {
                    shape.style.background = color;
                }
                
                shape.style.animationDelay = Math.random() * 5 + 's';
                shapesLayer.appendChild(shape);
            }
            
            // Clear particles
            particlesLayer.innerHTML = '';
            
            // Create particles
            const particleCount = 25;
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 3 + 's';
                particlesLayer.appendChild(particle);
            }
        }
        
        // Get quote
        function getRandomQuote() {
            const filtered = currentCategory === 'all' 
                ? quotes 
                : quotes.filter(q => q.category === currentCategory);
            
            if (filtered.length === 0) return quotes[0];
            
            let newQuote;
            do {
                newQuote = filtered[Math.floor(Math.random() * filtered.length)];
            } while (filtered.length > 1 && newQuote === currentQuote);
            
            return newQuote;
        }
        
        // Display quote
        function displayQuote() {
            currentQuote = getRandomQuote();
            
            const card = document.getElementById('quoteCard');
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                quoteText.textContent = `"${currentQuote.text}"`;
                quoteAuthor.textContent = `— ${currentQuote.author}`;
                quoteCategoryBadge.textContent = currentQuote.category.toUpperCase();
                
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 300);
        }
        
        // Save favorite
        function saveToFavorites() {
            if (!currentQuote) {
                alert('⚠️ Please generate a quote first!');
                return;
            }
            
            const exists = favorites.some(fav => 
                fav.text === currentQuote.text
            );
            
            if (exists) {
                alert('💫 Already in favorites!');
                return;
            }
            
            favorites.push(currentQuote);
            localStorage.setItem('inspirePulseFavorites', JSON.stringify(favorites));
            displayFavorites();
            alert('💖 Quote saved to favorites!');
        }
        
        // Display favorites
        function displayFavorites() {
            if (favorites.length === 0) {
                favoritesList.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">📚</div>
                        <p>No favorites yet. Start collecting quotes that speak to your soul!</p>
                    </div>
                `;
                return;
            }
            
            favoritesList.innerHTML = favorites.map((quote, index) => `
                <div class="favorite-card">
                    <button class="remove-btn" onclick="removeFavorite(${index})">×</button>
                    <div class="favorite-text">"${quote.text}"</div>
                    <div class="favorite-author">— ${quote.author}</div>
                </div>
            `).join('');
        }
        
        // Remove favorite
        function removeFavorite(index) {
            if (confirm('Remove this quote from favorites?')) {
                favorites.splice(index, 1);
                localStorage.setItem('inspirePulseFavorites', JSON.stringify(favorites));
                displayFavorites();
            }
        }
        
        // Share quote
        function shareQuote() {
            if (!currentQuote) {
                alert('⚠️ Please generate a quote first!');
                return;
            }
            
            const shareText = `"${currentQuote.text}" — ${currentQuote.author}\n\n✨ Discover more at InspirePulse`;
            
            if (navigator.share) {
                navigator.share({
                    title: 'InspirePulse Quote',
                    text: shareText,
                    url: window.location.href
                }).catch(err => console.log('Share cancelled'));
            } else {
                navigator.clipboard.writeText(shareText).then(() => {
                    alert('📋 Quote copied to clipboard!');
                }).catch(() => {
                    alert('❌ Unable to copy');
                });
            }
        }
        
        // Category selection
        categoryPills.forEach(pill => {
            pill.addEventListener('click', () => {
                categoryPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                currentCategory = pill.dataset.category;
                applyTheme(currentCategory);
                displayQuote();
            });
        });
        
        // Event listeners
        document.getElementById('newQuoteBtn').addEventListener('click', displayQuote);
        document.getElementById('saveBtn').addEventListener('click', saveToFavorites);
        document.getElementById('shareBtn').addEventListener('click', shareQuote);
        
        // Initialize
        applyTheme('all');
        displayQuote();
        displayFavorites();
        
        // Auto-refresh on visibility
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                displayQuote();
            }
        });
        
        // Enhanced remove favorite with confirmation and animation
       function removeFavorite(index) {
    const quote = favorites[index];
    const confirmDelete = confirm(`🗑️ Remove this quote?\n\n"${quote.text}"\n— ${quote.author}`);
    
    if (confirmDelete) {
        favorites.splice(index, 1);
        localStorage.setItem('inspirePulseFavorites', JSON.stringify(favorites));
        displayFavorites();

        // Optional animation feedback
        alert('✅ Quote removed from favorites!');
    }
}

