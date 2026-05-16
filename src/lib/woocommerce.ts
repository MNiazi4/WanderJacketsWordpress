

const FALLBACK_PRODUCTS = [
  { id: 1, name: "Ironbound Heritage Steerhide Moto Perfecto", price: "249.95", regular_price: "350.00", on_sale: true, images: [{ src: "https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=600&auto=format&fit=crop" }], categories: [{ name: "Men" }], rating_count: 124 },
  { id: 2, name: "Tralee Black Bomber Women's Jacket", price: "189.00", regular_price: "249.00", on_sale: true, images: [{ src: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop" }], categories: [{ name: "Women" }], rating_count: 85 },
  { id: 3, name: "Classic Cafe Racer Leather Jacket", price: "215.00", regular_price: "299.00", on_sale: false, images: [{ src: "https://images.unsplash.com/photo-1489987707023-afc824781ef1?q=80&w=600&auto=format&fit=crop" }], categories: [{ name: "Men" }], rating_count: 56 },
  { id: 4, name: "Premium Suede Trucker Jacket", price: "175.00", regular_price: "220.00", on_sale: true, images: [{ src: "https://images.unsplash.com/photo-1559582798-678dfc71caa4?q=80&w=600&auto=format&fit=crop" }], categories: [{ name: "Accessories" }], rating_count: 42 },
];

const FALLBACK_CATEGORIES = [
  { id: 101, name: "Leather Jackets", slug: "leather-jackets", parent: 0 },
];

// High-performance direct HTTPS fetch to bypass Next.js fetch patches and proxy latency
async function fetchWooCommerce(endpoint: string): Promise<any> {
  const KEY = process.env.WOOCOMMERCE_KEY || '';
  const SECRET = process.env.WOOCOMMERCE_SECRET || '';
  const BASE_URL = process.env.WOOCOMMERCE_URL || '';
  
  // Ensure we don't have double slashes and correct separator
  const cleanBaseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
  const separator = endpoint.includes('?') ? '&' : '?';
  const url = `${cleanBaseUrl}/wp-json/wc/v3/${endpoint}${separator}consumer_key=${KEY}&consumer_secret=${SECRET}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'application/json'
      },
      next: { revalidate: 60 } // Cache for 60 seconds to improve performance
    });

    if (!res.ok) {
      console.error(`WooCommerce API Error: ${res.status} ${res.statusText} for ${endpoint}`);
      return null;
    }

    return await res.json();
  } catch (e: any) {
    console.error(`HTTPS Fetch Error: ${e.message}`);
    return null;
  }
}

function processProducts(data: any[]) {
  const defaultImages = [
    "https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1489987707023-afc824781ef1?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559582798-678dfc71caa4?q=80&w=600&auto=format&fit=crop"
  ];

  return data.map((p: any, i: number) => {
    const processed = { ...p };
    if (!processed.images || processed.images.length === 0) {
      processed.images = [{ src: defaultImages[i % defaultImages.length] }];
    }
    if (!processed.price || processed.price === "") {
      processed.price = (150 + (i * 10)).toFixed(2);
    }
    return processed;
  });
}

export async function getProducts() {
  const data = await fetchWooCommerce('products?per_page=20&status=publish');
  if (!Array.isArray(data) || data.length === 0) return FALLBACK_PRODUCTS;
  return processProducts(data);
}

export async function getBestSellers() {
  // Fetch by popularity (best sellers)
  const data = await fetchWooCommerce('products?orderby=popularity&per_page=8&status=publish');
  
  // If no products found, return fallback products as placeholders
  if (!Array.isArray(data) || data.length === 0) {
    return FALLBACK_PRODUCTS;
  }

  return processProducts(data);
}

export async function getCategories() {
  const data = await fetchWooCommerce('products/categories?hide_empty=false&per_page=100');
  if (!Array.isArray(data) || data.length === 0) return FALLBACK_CATEGORIES;

  const defaultImages = [
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=300&auto=format&fit=crop"
  ];

  return data.map((cat: any, i: number) => {
    if (!cat.image || !cat.image.src) cat.image = { src: defaultImages[i % defaultImages.length] };
    return cat;
  });
}
