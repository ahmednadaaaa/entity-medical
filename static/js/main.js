// التحقق من نموذج الاتصال
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع بيانات النموذج
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject') ? document.getElementById('subject').value : '',
                message: document.getElementById('message').value
            };

            // هنا يمكنك إضافة كود لإرسال البيانات إلى الخادم
            // يمكن إرسال البيانات عبر WhatsApp أو Telegram أو البريد الإلكتروني
            
            // إنشاء رسالة WhatsApp
            const whatsappMessage = `مرحباً، أريد التواصل معكم:
الاسم: ${formData.name}
البريد الإلكتروني: ${formData.email}
الهاتف: ${formData.phone}
الموضوع: ${formData.subject}
الرسالة: ${formData.message}`;
            
            const whatsappUrl = `https://wa.me/201013928114?text=${encodeURIComponent(whatsappMessage)}`;
            
            // عرض رسالة نجاح مع خيارات
            const userChoice = confirm('تم حفظ رسالتك! هل تريد إرسالها عبر WhatsApp؟');
            if (userChoice) {
                window.open(whatsappUrl, '_blank');
            }
            
            contactForm.reset();
        });
    }
});

// تأثير التمرير السلس للروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// تأثير ظهور العناصر عند التمرير
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .product-card').forEach((el) => {
    observer.observe(el);
});

// التعامل مع صور المنتج
document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');

    if (thumbnails.length && mainImage) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // تحديث الصورة الرئيسية
                mainImage.src = this.src;
                
                // إزالة الفئة النشطة من جميع الصور المصغرة
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                
                // إضافة الفئة النشطة للصورة المحددة
                this.classList.add('active');
            });
        });
    }
});

// التعامل مع عرض تفاصيل المنتج
document.addEventListener('DOMContentLoaded', function() {
    // الحصول على معرف المنتج من الرابط
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');

    // بيانات المنتجات
    const products = {
        'ecg': {
            title: 'جهاز تخطيط القلب',
            manufacturer: 'Philips',
            price: '150,000 جنيه',
            description: 'جهاز تخطيط قلب متطور مع شاشة رقمية عالية الدقة. يوفر قراءات دقيقة وسريعة مع إمكانية حفظ وتخزين النتائج.',
            features: [
                'شاشة رقمية عالية الدقة',
                'إمكانية حفظ وتخزين النتائج',
                'تقنية متطورة للتحليل',
                'سهولة الاستخدام',
                'ضمان 3 سنوات'
            ],
            images: [
                'images/products/ecg.jpg',
                'images/products/ecg-2.jpg',
                'images/products/ecg-3.jpg'
            ]
        },
        'ventilator': {
            title: 'جهاز التنفس الصناعي',
            manufacturer: 'Medtronic',
            price: '450,000 جنيه',
            description: 'جهاز تنفس صناعي متطور للمرضى في العناية المركزة. يوفر دعم تنفسي متقدم مع مراقبة مستمرة.',
            features: [
                'نظام تنفس متطور',
                'مراقبة مستمرة للمريض',
                'واجهة مستخدم سهلة',
                'تقارير تفصيلية',
                'ضمان 5 سنوات'
            ],
            images: [
                'images/products/ventilator.jpg',
                'images/products/ventilator-2.jpg',
                'images/products/ventilator-3.jpg'
            ]
        },
        'stethoscope': {
            title: 'سماعة طبية رقمية',
            manufacturer: '3M Littmann',
            price: '25,000 جنيه',
            description: 'سماعة طبية رقمية متطورة مع تقنية تكبير الصوت. تمكن الأطباء من سماع الأصوات بوضوح عالي.',
            features: [
                'تقنية تكبير الصوت',
                'تصميم مريح',
                'جودة صوت عالية',
                'متوافقة مع التطبيقات الطبية',
                'ضمان سنة'
            ],
            images: [
                'images/products/stethoscope.jpg',
                'images/products/stethoscope-2.jpg',
                'images/products/stethoscope-3.jpg'
            ]
        },
        'glucometer': {
            title: 'جهاز قياس السكر',
            manufacturer: 'Accu-Chek',
            price: '8,000 جنيه',
            description: 'جهاز قياس سكر الدم الرقمي مع شاشة عالية الدقة. يوفر قراءات دقيقة وسريعة مع إمكانية تخزين النتائج.',
            features: [
                'شاشة عالية الدقة',
                'نتائج سريعة',
                'ذاكرة تخزين',
                'سهولة الاستخدام',
                'ضمان سنة'
            ],
            images: [
                'images/products/glucometer.jpg',
                'images/products/glucometer-2.jpg',
                'images/products/glucometer-3.jpg'
            ]
        },
        'scale': {
            title: 'ميزان طبي رقمي',
            manufacturer: 'Tanita',
            price: '12,000 جنيه',
            description: 'ميزان طبي رقمي متطور مع قياس مؤشر كتلة الجسم. يوفر قياسات دقيقة للوزن والكتلة العضلية.',
            features: [
                'قياس مؤشر كتلة الجسم',
                'تحليل تكوين الجسم',
                'شاشة رقمية',
                'تصميم عصري',
                'ضمان سنة'
            ],
            images: [
                'images/products/scale.jpg',
                'images/products/scale-2.jpg',
                'images/products/scale-3.jpg'
            ]
        },
        'thermometer': {
            title: 'مقياس حرارة رقمي',
            manufacturer: 'Braun',
            price: '3,000 جنيه',
            description: 'مقياس حرارة رقمي سريع ودقيق مع شاشة رقمية. يوفر قراءات سريعة ودقيقة لدرجة الحرارة.',
            features: [
                'قراءة سريعة',
                'دقة عالية',
                'شاشة رقمية',
                'سهولة الاستخدام',
                'ضمان سنة'
            ],
            images: [
                'images/products/thermometer.jpg',
                'images/products/thermometer-2.jpg',
                'images/products/thermometer-3.jpg'
            ]
        },
        'blood-pressure': {
            title: 'جهاز قياس ضغط الدم',
            manufacturer: 'Omron',
            price: '15,000 جنيه',
            description: 'جهاز قياس ضغط الدم الرقمي مع ذاكرة تخزين. يوفر قياسات دقيقة للضغط مع إمكانية تخزين النتائج.',
            features: [
                'ذاكرة تخزين',
                'قياس دقيق',
                'شاشة رقمية',
                'سهولة الاستخدام',
                'ضمان سنة'
            ],
            images: [
                'images/products/blood-pressure.jpg',
                'images/products/blood-pressure-2.jpg',
                'images/products/blood-pressure-3.jpg'
            ]
        },
        'eeg': {
            title: 'جهاز تخطيط الدماغ',
            manufacturer: 'Natus',
            price: '350,000 جنيه',
            description: 'جهاز تخطيط الدماغ متعدد القنوات مع تحليل متقدم. يوفر تشخيص دقيق لحالات الدماغ المختلفة.',
            features: [
                'متعدد القنوات',
                'تحليل متقدم',
                'شاشة عالية الدقة',
                'تقارير تفصيلية',
                'ضمان 3 سنوات'
            ],
            images: [
                'images/products/eeg.jpg',
                'images/products/eeg-2.jpg',
                'images/products/eeg-3.jpg'
            ]
        },
        'vision': {
            title: 'جهاز قياس النظر',
            manufacturer: 'Topcon',
            price: '250,000 جنيه',
            description: 'جهاز قياس النظر الرقمي المتطور مع قياسات دقيقة. يوفر تشخيص شامل لمشاكل العين.',
            features: [
                'قياسات دقيقة',
                'تحليل متقدم',
                'شاشة عالية الدقة',
                'تقارير تفصيلية',
                'ضمان 3 سنوات'
            ],
            images: [
                'images/products/vision.jpg',
                'images/products/vision-2.jpg',
                'images/products/vision-3.jpg'
            ]
        },
        'bone-density': {
            title: 'جهاز قياس كثافة العظام',
            manufacturer: 'Hologic',
            price: '300,000 جنيه',
            description: 'جهاز قياس كثافة العظام بالموجات فوق الصوتية. يوفر تشخيص دقيق لحالات العظام المختلفة.',
            features: [
                'تقنية الموجات فوق الصوتية',
                'قياسات دقيقة',
                'شاشة عالية الدقة',
                'تقارير تفصيلية',
                'ضمان 3 سنوات'
            ],
            images: [
                'images/products/bone-density.jpg',
                'images/products/bone-density-2.jpg',
                'images/products/bone-density-3.jpg'
            ]
        }
    };

    // تحديث محتوى الصفحة إذا كان هناك معرف منتج
    if (productId && products[productId]) {
        const product = products[productId];
        
        // تحديث العنوان
        document.querySelector('.product-title').textContent = product.title;
        
        // تحديث الشركة المصنعة
        document.querySelector('.manufacturer').textContent = `الشركة المصنعة: ${product.manufacturer}`;
        
        // تحديث السعر
        document.querySelector('.product-price').textContent = product.price;
        
        // تحديث الوصف
        document.querySelector('.product-description p').textContent = product.description;
        
        // تحديث المميزات
        const featuresList = document.querySelector('.features-list');
        featuresList.innerHTML = '';
        product.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
        
        // تحديث الصور
        const mainImage = document.querySelector('.main-image img');
        const thumbnails = document.querySelectorAll('.thumbnail img');
        
        mainImage.src = product.images[0];
        mainImage.alt = product.title;
        
        thumbnails.forEach((thumbnail, index) => {
            if (index < product.images.length - 1) {
                thumbnail.src = product.images[index + 1];
                thumbnail.alt = `${product.title} - صورة ${index + 1}`;
            }
        });
    }
});

// وظيفة البحث في الأقسام (حماية عند عدم وجود عناصر البحث)
(function initSearchModule() {
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.getElementById('searchInput');
    const categoriesGrid = document.querySelector('.categories-grid');

    if (!searchContainer || !searchInput || !categoriesGrid) {
        return; // لا شيء لنفعله في الصفحات التي لا تحتوي على البحث
    }

    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    searchContainer.appendChild(searchResults);

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.trim().toLowerCase();

        if (searchTerm.length === 0) {
            searchResults.classList.remove('active');
            categoriesGrid.style.display = 'grid';
            return;
        }

        categoriesGrid.style.display = 'none';

        const categories = Array.from(document.querySelectorAll('.category-card'));
        const filteredCategories = categories.filter(category => {
            const title = category.querySelector('h3').textContent.toLowerCase();
            return title.includes(searchTerm);
        });

        if (filteredCategories.length > 0) {
            searchResults.innerHTML = filteredCategories.map(category => {
                const title = category.querySelector('h3').textContent;
                const link = category.querySelector('a').href;
                return `
                    <div class="search-result-item" onclick="window.location.href='${link}'">
                        ${title}
                    </div>
                `;
            }).join('');
            searchResults.classList.add('active');
        } else {
            searchResults.innerHTML = '<div class="search-result-item">لا توجد نتائج</div>';
            searchResults.classList.add('active');
        }
    });

    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchResults.classList.remove('active');
            categoriesGrid.style.display = 'grid';
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchResults.classList.remove('active');
            if (searchInput.value.length === 0) {
                categoriesGrid.style.display = 'grid';
            }
        }
    });
})();

// Shopping Cart Functionality
let cart = [];

// Load cart from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedCart = localStorage.getItem('medicalCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
});

// Add item to cart
function addToCart(name, price, icon) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            icon: icon,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    showCartNotification();
}

// Remove item from cart
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    saveCart();
    updateCartUI();
}

// Update item quantity
function updateQuantity(name, newQuantity) {
    const item = cart.find(item => item.name === name);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(name);
        } else {
            item.quantity = newQuantity;
            saveCart();
            updateCartUI();
        }
    }
}

// Clear entire cart
function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('medicalCart', JSON.stringify(cart));
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
    
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>عربة المشتريات فارغة</p>
                </div>
            `;
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="item-icon">
                        <i class="${item.icon}"></i>
                    </div>
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p class="item-price">${item.price} جنيه</p>
                    </div>
                    <div class="item-controls">
                        <button onclick="updateQuantity('${item.name}', ${item.quantity - 1})" class="qty-btn">-</button>
                        <span class="qty">${item.quantity}</span>
                        <button onclick="updateQuantity('${item.name}', ${item.quantity + 1})" class="qty-btn">+</button>
                        <button onclick="removeFromCart('${item.name}')" class="remove-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }
    
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `${total} جنيه`;
    }
}

// Toggle cart modal
function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.classList.toggle('active');
    }
}

// Show cart notification
function showCartNotification() {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>تم إضافة المنتج للسلة</span>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('عربة المشتريات فارغة');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemsList = cart.map(item => `${item.name} (${item.quantity}x) - ${item.price * item.quantity} جنيه`).join('\n');
    
    const message = `طلب جديد من موقع Entity Medical:

المنتجات:
${itemsList}

المجموع الكلي: ${total} جنيه

يرجى التواصل معنا لإتمام الطلب.`;
    
    const whatsappUrl = `https://wa.me/201013928114?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Clear cart after checkout
    clearCart();
    toggleCart();
}

// Close cart when clicking outside
document.addEventListener('click', function(e) {
    const cartModal = document.getElementById('cartModal');
    if (cartModal && e.target === cartModal) {
        toggleCart();
    }
});