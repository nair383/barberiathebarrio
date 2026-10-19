// Catalog Master Data for Barbería The Barrio
const catalogData = [
    {
        id: 1,
        name: "Corte The Barrio Classic",
        category: "corte",
        price: 18000,
        desc: "Asesoria de imagen personalizada, lavamiento capilar y peinado con producto premium.",
        img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Ritual Barba Spa",
        category: "barba",
        price: 14000,
        desc: "Perfilado de barba con aceite, toalla caliente ritual, navaja y bálsamo hidratante.",
        img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Combo Executive (Corte + Barba)",
        category: "corte",
        price: 28000,
        desc: "Corte integral de cabello + servicio completo de perfilado y cuidado de barba.",
        img: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Corte Niño / Junior",
        category: "corte",
        price: 15000,
        desc: "Atención paciente y estilos modernos para los más jóvenes.",
        img: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Cera / Pomada Grooming Premium",
        category: "tienda",
        price: 16900,
        desc: "Fijación fuerte y acabado mate/brillo mate para peinados de larga duración.",
        img: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Aceite para Barba Orgánico",
        category: "tienda",
        price: 14900,
        desc: "Nutrición profunda con aroma amaderado para suavizar y dar brillo.",
        img: "https://images.unsplash.com/photo-1608248597261-83325705438f?q=80&w=800&auto=format&fit=crop"
    }
];

// Shopping Cart Logic
let cart = JSON.parse(localStorage.getItem('barrio_cart')) || [];

document.addEventListener("DOMContentLoaded", () => {
    initCartUI();
    renderCatalog('all');

    // Mobile Menu Toggle
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    // Cart Drawer Toggle
    const cartToggleBtn = document.getElementById("cartToggleBtn");
    const closeCartBtn = document.getElementById("closeCartBtn");
    const cartDrawer = document.getElementById("cartDrawer");

    if (cartToggleBtn && cartDrawer) {
        cartToggleBtn.addEventListener("click", () => cartDrawer.classList.remove("translate-x-full"));
    }
    if (closeCartBtn && cartDrawer) {
        closeCartBtn.addEventListener("click", () => cartDrawer.classList.add("translate-x-full"));
    }
});

function renderCatalog(category) {
    const catalogGrid = document.getElementById("catalogGrid");
    if (!catalogGrid) return;

    const filtered = category === 'all' ? catalogData : catalogData.filter(item => item.category === category);
    
    catalogGrid.innerHTML = filtered.map(item => `
        <div class="glass-card rounded-2xl p-6 relative group border border-white/10 hover:border-gold-500/50 transition-all duration-300">
            <div class="h-48 rounded-xl overflow-hidden mb-6 relative">
                <img src="${item.img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="${item.name}">
                <span class="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-gold-500 font-bold text-sm border border-gold-500/30">
                    $${item.price.toLocaleString('es-CL')}
                </span>
            </div>
            <h3 class="text-xl font-serif font-bold text-white mb-2">${item.name}</h3>
            <p class="text-gray-400 text-xs mb-6 leading-relaxed">${item.desc}</p>
            <button onclick="addToCart('${item.name}', ${item.price})" class="w-full py-3 rounded-lg bg-gold-500/10 border border-gold-500/30 text-gold-400 font-bold text-xs uppercase tracking-wider hover:bg-gold-500 hover:text-black transition-all">
                Añadir al Carrito
            </button>
        </div>
    `).join('');
}

function filterCatalog(cat) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-gold-500', 'text-black', 'border-gold-500');
        btn.classList.add('border-white/10', 'text-gray-300');
    });
    event.target.classList.add('bg-gold-500', 'text-black', 'border-gold-500');
    renderCatalog(cat);
}

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    saveCart();
    // Open drawer automatically
    const cartDrawer = document.getElementById("cartDrawer");
    if (cartDrawer) cartDrawer.classList.remove("translate-x-full");
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
}

function saveCart() {
    localStorage.setItem('barrio_cart', JSON.stringify(cart));
    initCartUI();
}

function initCartUI() {
    const badge = document.getElementById("cartBadge");
    const cartList = document.getElementById("cartItemsList");
    const totalEl = document.getElementById("cartTotal");

    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    if (badge) badge.innerText = totalCount;
    if (totalEl) totalEl.innerText = `$${totalPrice.toLocaleString('es-CL')}`;

    if (cartList) {
        if (cart.length === 0) {
            cartList.innerHTML = `<p class="text-gray-500 text-xs text-center py-8">Tu carrito está vacío.</p>`;
        } else {
            cartList.innerHTML = cart.map((item, idx) => `
                <div class="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                    <div>
                        <h4 class="text-white text-xs font-bold">${item.name}</h4>
                        <p class="text-gold-500 text-xs">$${item.price.toLocaleString('es-CL')} x ${item.qty}</p>
                    </div>
                    <button onclick="removeFromCart(${idx})" class="text-gray-500 hover:text-red-400 text-xs">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                </div>
            `).join('');
            if (window.lucide) lucide.createIcons();
        }
    }
}

function sendOrderWhatsApp() {
    if (cart.length === 0) {
        alert("Agrega al menos un servicio o producto antes de consultar por WhatsApp.");
        return;
    }
    let text = "Hola Barbería The Barrio! Quisiera consultar/agendar los siguientes ítems:\n\n";
    cart.forEach(i => {
        text += `- ${i.name} (x${i.qty}): $${(i.price * i.qty).toLocaleString('es-CL')}\n`;
    });
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    text += `\n*Total Estimado:* $${total.toLocaleString('es-CL')}\n\nQuedo atento a su confirmación de disponibilidad en Providencia!`;
    
    window.open(`https://wa.me/56932409253?text=${encodeURIComponent(text)}`, '_blank');
}

function handleContactSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("contactName").value;
    const phone = document.getElementById("contactPhone").value;
    const message = document.getElementById("contactMessage").value;

    const msg = `Hola Barbería The Barrio! Mi nombre es ${name} (${phone}).\n\nConsulta: ${message}`;
    window.open(`https://wa.me/56932409253?text=${encodeURIComponent(msg)}`, '_blank');
}

function toggleFaq(btn) {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('i');
    content.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
}