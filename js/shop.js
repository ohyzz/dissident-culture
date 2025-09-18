console.log('write: \"startGame()\"');

const shopItems = [
    {
        id: 1,
        brand: "Rick Owens",
        name: "Geobasket SS16 CYCLOPS in Palm Green",
        description: "Despite extravagance, this color is one of the most wearable among the non-standard geobasket colors. The color scheme was inspired by the idea of primordial power, mythology and monolithic aesthetics. Collection SS16 Cyclops. the skin of this particular series is valued for its texture and durability.",
        price: 3500,
        image: "https://i.pinimg.com/474x/3a/78/b0/3a78b068ec51b19e3270de9101904cc1.jpg",
        category: "rick",
        sizes: ['41', "43"],
        inStock: true
    },
    {
        id: 2,
        brand: "Carol Christian Poell",
        name: "drip-rubber boots",
        description: "Absolutely unique and not like anything like the sole. CCP brings the idea of shoes as sculptures to the logical absolute. This is one of the most recognizable and mythologized objects in the world of avant -garde fashion.",
        price: 6500,
        image: "https://thelibrary1994.com/cdn/shop/files/CCPAM_2687PRBIAS_10_6.jpg?v=1711635123",
        category: "ccp",
        sizes: ["44"],
        inStock: true
    },
    {
        id: 3,
        brand: "Number Nine",
        name: "Vintage Leather Biker Jacket",
        description: "Aged black leather with silver hardware. From Takahiro Miyashita's iconic 2008 collection.",
        price: 3200,
        image: "https://realabayan.com/cdn/shop/products/number_n_ine7420_1200x1200.jpg?v=1669184288",
        category: "numbernine",
        sizes: ["S", "M"],
        inStock: false
    },
    {
        id: 4,
        brand: "Enfants Riches Déprimés",
        name: "«Dorothy Dunked»",
        description: "Longslit ERD Dorothy Dunked is not just clothes. This is a wearable art object that is perfectly encapsulates brand philosophy: cynicism, melancholy, reference to high culture, luxury through the prism of destruction. This is a thing for those who value not just a brand, but the history and concept of Behind it.",
        price: 1200,
        image: "https://static.cdn.oskelly.ru/product/3764559/item-6dec39ea-c402-4069-b12b-dd50935968be.jpg",
        category: "erd",
        sizes: ["S", "M", "L"],
        inStock: true
    },
    {
        id: 5,
        brand: "Rick Owens",
        name: "FW15 Faun Leather Drape Jacket in Black",
        description: "Embody the dark, poetic grandeur of Rick Owens' visionary universe with this exceptionally rare and iconic jacket from the landmark FW15 Faun collection. This isn't merely a garment; it's a wearable masterpiece, a piece of fashion history that speaks to the connoisseur of radical elegance.",
        price: 1450,
        image: "https://i.pinimg.com/736x/f2/8d/f6/f28df6637d5f2573f9b0a464e2ea2f3a.jpg",
        category: "rick",
        sizes: ["M", 'L'],
        inStock: true
    },
    {
        id: 6,
        brand: "Mastermind Japan",
        name: "Skull Emblem Sweater",
        description: "Black wool sweater with iconic skull embroidery. Limited collaboration piece.",
        price: 2200,
        image: "https://i.pinimg.com/736x/7c/b0/8a/7cb08af012cbb7ab9197bd50a62be21e.jpg",
        category: "mastermind",
        sizes: ["L", "XL"],
        inStock: true
    }
];

let cart = [];
let selectedSizes = {};

document.addEventListener('DOMContentLoaded', function() {
    const shopGrid = document.getElementById('shopGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cartIcon = document.getElementById('cartIcon');
    const closeCart = document.getElementById('closeCart');
    const cartSidebar = document.getElementById('cartSidebar');
    
    // Load all items initially
    renderItems(shopItems);
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            const filteredItems = filter === 'all' 
                ? shopItems 
                : shopItems.filter(item => item.category === filter);
            
            renderItems(filteredItems);
        });
    });
    
    // Cart functionality
    cartIcon.addEventListener('click', function() {
        cartSidebar.classList.add('active');
        disableScroll();
    });
    
    closeCart.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        enableScroll();
    });
    
    function renderItems(items) {
        shopGrid.innerHTML = '';
        
        items.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'shop-item loading';
            itemElement.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'">
                    ${!item.inStock ? '<div class="sold-badge">OUT OF STOCK</div>' : ''}
                </div>
                <div class="item-info">
                    <div class="item-brand">${item.brand}</div>
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-description">${item.description}</p>
                    
                    ${item.inStock ? `
                        <div class="item-sizes">
                            ${item.sizes.map(size => `
                                <button class="size-btn" data-size="${size}" data-item="${item.id}">${size}</button>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    <div class="item-details">
                        <span class="item-price">$${item.price.toLocaleString()}</span>
                        ${item.inStock ? `
                            <button class="add-to-cart" data-item="${item.id}">Add to Cart</button>
                        ` : `
                            <span style="color: #888; font-size: 0.9rem;">Out of Stock</span>
                        `}
                    </div>
                </div>
            `;
            
            shopGrid.appendChild(itemElement);
            
            // Add event listeners
            if (item.inStock) {
                const sizeButtons = itemElement.querySelectorAll('.size-btn');
                const addButton = itemElement.querySelector('.add-to-cart');
                
                sizeButtons.forEach(btn => {
                    btn.addEventListener('click', function() {
                        const size = this.getAttribute('data-size');
                        const itemId = this.getAttribute('data-item');
                        
                        // Toggle selection
                        sizeButtons.forEach(b => b.classList.remove('selected'));
                        this.classList.add('selected');
                        
                        selectedSizes[itemId] = size;
                    });
                });
                
                addButton.addEventListener('click', function() {
                    const itemId = this.getAttribute('data-item');
                    const selectedSize = selectedSizes[itemId];
                    
                    if (!selectedSize) {
                        alert('Please select a size first');
                        return;
                    }
                    
                    addToCart(itemId, selectedSize);
                });
            }
            
            // Staggered animation
            setTimeout(() => {
                itemElement.classList.add('show');
            }, 100 * index);
        });
    }
    
    function addToCart(itemId, size) {
        const item = shopItems.find(i => i.id === parseInt(itemId));
        if (!item) return;
        
        const cartItem = {
            ...item,
            size: size,
            quantity: 1
        };
        
        cart.push(cartItem);
        updateCart();
        updateCartCount();
        
        // Show cart sidebar
        document.getElementById('cartSidebar').classList.add('active');
    }
    
    function updateCart() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        cartItems.innerHTML = '';
        let total = 0;
        
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">Size: ${item.size} | $${item.price}</div>
                </div>
                <div class="cart-item-remove" data-index="${index}">
                    <i class="fas fa-times"></i>
                </div>
            `;
            
            cartItems.appendChild(cartItemElement);
            
            // Add remove functionality
            cartItemElement.querySelector('.cart-item-remove').addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCart();
                updateCartCount();
            });
        });
        
        cartTotal.textContent = total.toLocaleString();
    }
    
    function updateCartCount() {
        document.querySelector('.cart-count').textContent = cart.length;
    }
    
    // Parallax effect
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        document.body.style.backgroundPosition = `50% ${scrollPosition * 0.4}px`;
    });
});

function startGame() {
    window.location.href = './secret.html'
}
