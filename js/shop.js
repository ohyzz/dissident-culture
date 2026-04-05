const shopItems = [
    {
        id: 1,
        brand: "Rick Owens",
        name: "Geobasket SS16 CYCLOPS in Palm Green",
        description: "Несмотря на свою экстравагантность, этот цвет считается одним из самых носибельных среди нестандартных расцветок Geobasket. Палитра вдохновлена идеей первобытной силы, мифологией и монолитной эстетикой. Коллекция SS16 Cyclops. Кожа именно этой серии ценится за свою текстуру и долговечность.",
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
        description: "Абсолютно уникальная подошва, не похожая ни на что другое. CCP доводит идею обуви как скульптуры до логического абсолюта. Это один из самых узнаваемых и мифологизированных объектов в мире авангардной моды.",
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
        description: "Состаренная чёрная кожа с серебристой фурнитурой. Модель из культовой коллекции Такахиро Мияшиты 2008 года.",
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
        description: "Лонгслив ERD Dorothy Dunked — это не просто одежда. Это носимый арт-объект, идеально отражающий философию бренда: цинизм, меланхолию, отсылки к высокой культуре и роскошь сквозь призму разрушения. Вещь для тех, кто ценит не только имя, но и историю с концепцией, стоящей за ним.",
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
        description: "Олицетворение тёмного поэтического величия вселенной Rick Owens. Исключительно редкая и культовая куртка из знаковой коллекции FW15 Faun. Это не просто предмет гардероба — это носимый шедевр и часть истории моды для ценителей радикальной элегантности.",
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
        description: "Чёрный шерстяной свитер с культовой вышивкой в виде черепа. Лимитированная модель из коллаборации.",
        price: 2200,
        image: "https://i.pinimg.com/736x/7c/b0/8a/7cb08af012cbb7ab9197bd50a62be21e.jpg",
        category: "mastermind",
        sizes: ["L", "XL"],
        inStock: true
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
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
                    ${!item.inStock ? '<div class="sold-badge">Нет в наличии</div>' : ''}
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
                            <button class="add-to-cart" data-item="${item.id}">Добавить</button>
                        ` : `
                            <span style="color: #888; font-size: 0.9rem;">Нет в наличии</span>
                        `}
                    </div>
                </div>
            `;
            
            // Image fade-in on load
            const img = itemElement.querySelector('img');
            if (img) {
                img.style.opacity = '0';
                img.addEventListener('load', () => { img.style.opacity = '1'; });
                if (img.complete) img.style.opacity = '1';
            }

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
                        alert('Пожалуйста, выберите размер');
                        return;
                    }

                    const btn = this;
                    btn.textContent = '✓ Добавлено';
                    btn.disabled = true;
                    btn.style.borderColor = '#b8ffcc';
                    btn.style.color = '#b8ffcc';
                    setTimeout(() => {
                        btn.textContent = 'Добавить';
                        btn.disabled = false;
                        btn.style.borderColor = '';
                        btn.style.color = '';
                    }, 1500);

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
        saveCart();
        updateCart();
        updateCartCount();

        document.getElementById('cartSidebar').classList.add('active');
    }
    
    function updateCart() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        cartItems.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-bag"></i>
                    <p>Корзина пуста</p>
                </div>
            `;
        }

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
                saveCart();
                updateCart();
                updateCartCount();
            });
        });

        cartTotal.textContent = total.toLocaleString();
    }
    
    function updateCartCount() {
        const countEl = document.querySelector('.cart-count');
        countEl.textContent = cart.length;
        countEl.classList.remove('pulse');
        void countEl.offsetWidth;
        countEl.classList.add('pulse');
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
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
