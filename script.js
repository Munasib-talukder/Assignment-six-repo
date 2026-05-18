/* ==========================================================================
   ১) GLOBAL APPLICATION STATE & DOM SELECTORS
   ========================================================================== */
const state = {
  cart: [],
  totalPrice: 0,
  currentCategoryId: 'all'
};

// DOM Element Selector Blocks
const categoryContainer = document.getElementById('category-container');
const plantsContainer = document.getElementById('plants-container');
const loadingSpinner = document.getElementById('loading-spinner');
const cartItemsList = document.getElementById('cart-items-list');
const cartTotalPriceElem = document.getElementById('cart-total-price');
const emptyCartMsg = document.getElementById('empty-cart-msg');
const treeDetailModal = document.getElementById('tree_detail_modal');
const modalContentTarget = document.getElementById('modal-content-target');

/* ==========================================================================
   ২) MOCK DATASET (CATEGORIES & PLANTS)
   ========================================================================== */
// 🌴 100% FIGMA MATCHED FULL CATEGORIES DATASET
const MOCK_CATEGORIES = [
  { id: "1", category_name: "Fruit Trees" },
  { id: "2", category_name: "Flowering Trees" },
  { id: "3", category_name: "Shade Trees" },
  { id: "4", category_name: "Medicinal Trees" },
  { id: "5", category_name: "Timber Trees" },
  { id: "6", category_name: "Evergreen Trees" },
  { id: "7", category_name: "Ornamental Plants" },
  { id: "8", category_name: "Bamboo" },
  { id: "9", category_name: "Climbers" },
  { id: "10", category_name: "Aquatic Plants" }
];

// 🌿 RICH & RELEVANT PLANT DATA WITH HIGH-QUALITY IMAGES
const MOCK_PLANTS = [
  {
    id: "p1",
    name: "Mango Tree",
    category: "Fruit Trees",
    category_id: "1",
    price: 500,
    description: "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers great shade.",
    image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "p3",
    name: "Golden Shower Tree",
    category: "Flowering Trees",
    category_id: "2",
    price: 600,
    description: "Famous for its stunning cascades of bright yellow flowers that bloom beautifully during late spring and early summer.",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "p4",
    name: "Neem Tree",
    category: "Medicinal Trees",
    category_id: "4",
    price: 350,
    description: "A highly valuable medicinal tree known for its air-purifying qualities and powerful antibacterial leaves used in healthcare.",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "p5",
    name: "Teak Tree",
    category: "Timber Trees",
    category_id: "5",
    price: 850,
    description: "Precious tropical hardwood tree known for making premium quality durable furniture and high-end construction.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "p6",
    name: "Pine Tree",
    category: "Evergreen Trees",
    category_id: "6",
    price: 550,
    description: "Classic conical evergreen tree that retains its green foliage and fresh woody aroma all year round.",
    image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "p7",
    name: "Bonsai Ficus",
    category: "Ornamental Plants",
    category_id: "7",
    price: 1200,
    description: "Artistically pruned miniature ornamental tree, excellent for premium indoor aesthetics and living room decoration.",
    image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "p8",
    name: "Lucky Bamboo",
    category: "Bamboo",
    category_id: "8",
    price: 250,
    description: "Sturdy and elegant green stalks that thrive gracefully in water, widely considered a symbol of good fortune.",
    image: "https://images.unsplash.com/photo-1561571994-3c61c554181a?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "p10",
    name: "Water Lily",
    category: "Aquatic Plants",
    category_id: "10",
    price: 400,
    description: "Beautiful floating aquatic plant with broad round green leaves and radiant blooming soft pink flowers.",
    image: "Water-Lily-920x518.webp"
  },
  {
    id: "p11",
    name: "Banyan Tree",
    category: "Shade Trees",
    category_id: "3",
    price: 700,
    description: "A massive, long-living tree that creates a sprawling natural shade structure, perfect for wide outdoor spaces.",
    image: "bayan-trees-in-hawaii.webp"
  }
];

/* ==========================================================================
   ৩) APP INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

async function initApp() {
  renderCategories(MOCK_CATEGORIES);
  renderPlants(MOCK_PLANTS);
}

/* ==========================================================================
   ৪) CATEGORY RENDERING & LOGIC
   ========================================================================== */
function renderCategories(categories) {
  categoryContainer.innerHTML = '';

  // All Trees Button Creation
  const allBtn = createCategoryButton('All Trees', 'all', true);
  categoryContainer.appendChild(allBtn);

  // Dynamic injection of all categories
  categories.forEach(cat => {
    const btn = createCategoryButton(cat.category_name, cat.id, false);
    categoryContainer.appendChild(btn);
  });
}

// Category Button Builder Utility
function createCategoryButton(name, id, isDefault = false) {
  const button = document.createElement('button');
  button.innerText = name;
  button.setAttribute('data-id', id);

  // যদি ডিফল্ট বাটন হয় (যেমন initial load এ All Trees), তবে active ক্লাস পাবে
  if (isDefault) {
    button.classList.add('active');
  }

  button.addEventListener('click', () => {
    if (state.currentCategoryId === id) return;
    
    // ১) প্রথমে সব ক্যাটাগরি বাটন থেকে 'active' ক্লাসটি মুছে ফেলা
    document.querySelectorAll('#category-container button').forEach(b => {
      b.classList.remove('active');
    });
    
    // ২) শুধুমাত্র বর্তমান ক্লিক করা বাটনটিতে 'active' ক্লাস যোগ করা
    button.classList.add('active');
    
    state.currentCategoryId = id;

    // লোডিং স্পিনার ও ফিল্টারিং লজিক
    toggleSpinner(true);
    
    setTimeout(() => {
      if (id === 'all') {
        renderPlants(MOCK_PLANTS);
      } else {
        const filtered = MOCK_PLANTS.filter(plant => plant.category_id === id);
        renderPlants(filtered);
      }
      toggleSpinner(false);
    }, 300);
  });

  return button;
}

/* ==========================================================================
   ৫) PLANT CARDS GRID RENDERING
   ========================================================================== */
function renderPlants(plantsList) {
  plantsContainer.innerHTML = '';

  if (!plantsList || plantsList.length === 0) {
    plantsContainer.innerHTML = `
      <div class="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed">
        <p class="text-slate-400 font-medium">No plants found inside this category.</p>
      </div>`;
    return;
  }

  plantsList.forEach(plant => {
    const card = document.createElement('div');

    card.innerHTML = `
      <div>
        <div class="card-image-wrapper" style="height: 11rem; overflow: hidden; background-color: #f1f5f9;">
          <img src="${plant.image}" alt="${plant.name}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        
        <div class="card-body">
          <h4 onclick="openPlantDetails('${plant.id}')">${plant.name}</h4>
          <p>${plant.description}</p>
          <div class="plant-badge-container">
            <span class="plant-badge">${plant.category}</span>
          </div>
        </div>
      </div>
      
      <div class="card-footer">
        <span class="plant-price">৳${plant.price}</span>
        <button class="btn-add-to-cart"
                onclick="addPlantToCart('${plant.id}', '${escapeHtml(plant.name)}', ${plant.price})">
          Add to Cart
        </button>
      </div>
    `;
    plantsContainer.appendChild(card);
  });
}

/* ==========================================================================
   ৬) PRODUCT DETAILS MODAL
   ========================================================================== */
function openPlantDetails(plantId) {
  const plant = MOCK_PLANTS.find(p => p.id === plantId);
  if (!plant) return;

  modalContentTarget.innerHTML = `
    <div class="space-y-4">
      <div class="w-full h-56 bg-slate-100 rounded-xl overflow-hidden mt-2">
        <img src="${plant.image}" alt="${plant.name}" class="w-full h-full object-cover">
      </div>
      <div>
        <h3 class="text-xl font-bold text-slate-900">${plant.name}</h3>
        <p class="text-sm font-semibold text-green-700 mt-0.5">Category: ${plant.category}</p>
      </div>
      <p class="text-slate-600 text-sm leading-relaxed">${plant.description}</p>
      <div class="border-t pt-3 flex justify-between items-center">
        <div>
          <span class="text-xs text-slate-400 block font-medium">Price Tag</span>
          <span class="text-xl font-black text-slate-900">৳${plant.price}</span>
        </div>
        <button class="btn bg-[#15803D] hover:bg-[#166534] text-white border-none rounded-xl" 
                onclick="treeDetailModal.close(); addPlantToCart('${plant.id}', '${escapeHtml(plant.name)}', ${plant.price})">
          Add to Cart
        </button>
      </div>
    </div>
  `;
  treeDetailModal.showModal();
}

/* ==========================================================================
   ৭) SHOPPING CART STATE & UI MANAGEMENT
   ========================================================================== */
function addPlantToCart(id, name, price) {
  const cartItemInstance = {
    uniqueCartId: Date.now() + Math.random().toString(36).substr(2, 5),
    id,
    name,
    price
  };

  state.cart.push(cartItemInstance);
  updateCartUI();
}

function removePlantFromCart(uniqueCartId) {
  state.cart = state.cart.filter(item => item.uniqueCartId !== uniqueCartId);
  updateCartUI();
}

function updateCartUI() {
  // প্রথমে আগের জেনারেট হওয়া সব আইটেম রো মুছে ফেলা
  const itemRows = cartItemsList.querySelectorAll('.cart-item-row');
  itemRows.forEach(row => row.remove());

  // কার্ট খালি থাকলে empty message দেখাবে
  if (state.cart.length === 0) {
    emptyCartMsg.classList.remove('hidden');
    state.totalPrice = 0;
  } else {
    // কার্ট খালি না থাকলে empty message হাইড করবে
    emptyCartMsg.classList.add('hidden');
    
    let runtimeSumAccumulator = 0;

    // কার্টের প্রতিটা আইটেম লুপ করে ফিকমা ডিজাইনে রূপান্তর
    state.cart.forEach(item => {
      runtimeSumAccumulator += item.price;

      const itemRow = document.createElement('div');
      itemRow.className = 'cart-item-row';
      
      itemRow.innerHTML = `
        <div class="cart-item-info">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-details">৳${item.price} &times; 1</p>
        </div>
        <button class="cart-remove-btn" 
                onclick="removePlantFromCart('${item.uniqueCartId}')" title="Remove item">
          <i class="fa-solid fa-xmark"></i>
        </button>
      `;
      
      // টোটাল লাইনের ঠিক উপরে আইটেমটি পুশ করা
      cartItemsList.insertBefore(itemRow, emptyCartMsg);
    });

    state.totalPrice = runtimeSumAccumulator;
  }

  // ফাইনাল টোটাল প্রাইস আপডেট
  cartTotalPriceElem.innerText = state.totalPrice;
}



/* ==========================================================================
   ৮) GLOBAL UTILITIES & SANITIZATION
   ========================================================================== */
function toggleSpinner(show) {
  if (show) {
    loadingSpinner.classList.remove('hidden');
  } else {
    loadingSpinner.classList.add('hidden');
  }
}

function escapeHtml(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}