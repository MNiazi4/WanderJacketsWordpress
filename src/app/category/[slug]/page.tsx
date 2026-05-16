import { getProducts, getCategories } from "@/lib/woocommerce";
import { Star } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const HERO_IMAGES: Record<string, string> = {
  men: "https://images.unsplash.com/photo-1489987707023-afc824781ef1?q=80&w=2000&auto=format&fit=crop",
  women: "https://images.unsplash.com/photo-1559582798-678dfc71caa4?q=80&w=2000&auto=format&fit=crop",
  default: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=2000&auto=format&fit=crop",
};

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const title = slug === "women" ? "Women's Collection" : slug === "men" ? "Men's Collection" : slug.replace(/-/g, " ");
  const heroImg = HERO_IMAGES[slug] || HERO_IMAGES["default"];
  const productCount = slug === "women" ? "248 products" : slug === "men" ? "312 products" : "products";
  
  const allProducts = await getProducts();
  const allCategories = await getCategories();
  
  // Find current category
  const currentCat = allCategories.find((c: any) => c.slug === slug);
  
  // Determine subcategories to show in sidebar
  let sidebarCats: any[] = [];
  if (currentCat) {
    sidebarCats = allCategories.filter((c: any) => c.parent === currentCat.id);
    // If it has no children, show its siblings instead
    if (sidebarCats.length === 0 && currentCat.parent !== 0) {
      sidebarCats = allCategories.filter((c: any) => c.parent === currentCat.parent);
    }
  }

  // Filter products by the current category slug
  let products = allProducts.filter((p: any) => 
    p.categories && p.categories.some((c: any) => c.slug === slug)
  );

  // If no products match, products array will remain empty. We handle this in the UI.

  return (
    <div>

      {/* HERO BANNER */}
      <section
        className="cat-hero"
        style={{
          backgroundImage: `url('${heroImg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        <div className="cat-hero-overlay"></div>
        <div className="container cat-hero-content">
          <h1>{title}</h1>
          <p>{productCount} &mdash; Free shipping on orders over $150</p>
        </div>
      </section>

      {/* PRODUCTS + SIDEBAR */}
      <div className="container cat-layout">

        {/* Sidebar */}
        <aside className="cat-sidebar">
          <h3 style={{ borderBottom: "1px solid #E5E5E5", paddingBottom: "1rem", marginBottom: "2rem", fontSize: "1.2rem", textTransform: "uppercase", letterSpacing: "1px" }}>Filters</h3>

          {sidebarCats.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <h4 style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: "1rem", color: "#111" }}>CATEGORIES</h4>
              {sidebarCats.map((cat) => (
                <Link href={`/category/${cat.slug}`} key={cat.id} style={{ textDecoration: 'none' }}>
                  <label style={{ display: "flex", alignItems: "center", marginBottom: "0.6rem", color: "#555", fontSize: "0.95rem", cursor: "pointer" }}>
                    <input 
                      type="checkbox" 
                      style={{ marginRight: "10px", width: "16px", height: "16px", accentColor: "#4A3728", cursor: "pointer", pointerEvents: "none" } as React.CSSProperties} 
                      checked={slug === cat.slug}
                      readOnly
                    /> 
                    <span style={{ fontWeight: slug === cat.slug ? 700 : 400, color: slug === cat.slug ? '#111' : '#555' }}>
                      {cat.name}
                    </span>
                  </label>
                </Link>
              ))}
            </div>
          )}

          <div style={{ marginBottom: "2rem" }}>
            <h4 style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: "1rem", color: "#111" }}>MATERIAL</h4>
            {["Cowhide", "Lambskin", "Suede"].map((m) => (
              <label key={m} style={{ display: "flex", alignItems: "center", marginBottom: "0.6rem", color: "#555", fontSize: "0.95rem", cursor: "pointer" }}>
                <input type="checkbox" style={{ marginRight: "10px", width: "16px", height: "16px", accentColor: "#4A3728" } as React.CSSProperties} /> {m}
              </label>
            ))}
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h4 style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: "1rem", color: "#111" }}>COLOR</h4>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {[["#111","Black"],["#4A3728","Dark Brown"],["#8B4513","Saddle Brown"],["#A52A2A","Burgundy"],["#D2B48C","Tan"]].map(([bg, label]) => (
                <span key={label} title={label} style={{ width: "32px", height: "32px", background: bg, borderRadius: "50%", border: "2px solid #E5E5E5", cursor: "pointer", display: "inline-block" }}></span>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem", borderBottom: "1px solid #E5E5E5", paddingBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.5rem", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>{title}</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontSize: "0.85rem", color: "#666" }}>Showing {products.length} results</span>
              <select style={{ padding: "0.8rem 1.2rem", border: "1px solid #E5E5E5", background: "white", fontSize: "0.9rem", outline: "none", cursor: "pointer" }}>
                <option>Sort by: Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>New Arrivals</option>
              </select>
            </div>
          </div>

          <div className="product-grid">
            {products.length === 0 ? (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "4rem 0", color: "#666" }}>
                <h3 style={{ fontSize: "1.2rem", color: "#111", marginBottom: "1rem" }}>New Collection Coming Soon</h3>
                <p>We are currently handcrafting our premium pieces for this collection. Please check back later.</p>
              </div>
            ) : (
              products.map((product: any) => (
                <ProductCard product={product} key={product.id} />
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
