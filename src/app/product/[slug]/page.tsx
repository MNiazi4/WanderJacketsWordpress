import { getProducts } from "@/lib/woocommerce";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import ProductDetails from "@/components/ProductDetails";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  // Fetch products and find the one matching the slug (or ID)
  // For now, we'll use a high-end fallback product if not found
  const products = await getProducts();
  const product = products.find((p: any) => p.slug === slug || p.id.toString() === slug) || products[0];

  return (
    <div className="product-page-wrapper">
      {/* BREADCRUMBS */}
      <div className="container" style={{ padding: '1.5rem 2rem' }}>
        <div className="breadcrumbs" style={{ display: 'flex', gap: '8px', fontSize: '0.8rem', color: '#888', alignItems: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>
          <Link href="/">Home</Link> <ChevronRight size={12} /> 
          <Link href="/category/men">Men</Link> <ChevronRight size={12} />
          <span style={{ color: '#111' }}>{product.name}</span>
        </div>
      </div>

      <div className="container product-layout">
        
        {/* LEFT: IMAGE GALLERY */}
        <div className="product-gallery">
          <div className="main-image" style={{ background: '#f9f9f9', borderRadius: '4px', overflow: 'hidden', position: 'relative', aspectRatio: '4/5' }}>
            <img 
              src={product.images?.[0]?.src || "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800"} 
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {product.on_sale && <span className="badge sale" style={{ top: '20px', left: '20px', fontSize: '1rem', padding: '0.5rem 1.2rem' }}>Sale</span>}
          </div>
          
          <div className="thumb-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1rem' }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ aspectRatio: '1', background: '#f9f9f9', cursor: 'pointer', borderRadius: '2px', overflow: 'hidden' }}>
                <img 
                  src={product.images?.[0]?.src || "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=200"} 
                  alt="" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: i === 1 ? 1 : 0.6 }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: PRODUCT INFO */}
        <ProductDetails product={product} />
      </div>

      {/* DESCRIPTION TABS */}
      <section className="section-pad" style={{ borderTop: '1px solid #eee' }}>
        <div className="container">
          <div className="product-tabs">
            <div style={{ paddingBottom: '1rem', borderBottom: '2px solid #111', fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer' }}>Description</div>
            <div style={{ paddingBottom: '1rem', color: '#999', fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer' }}>Specifications</div>
            <div style={{ paddingBottom: '1rem', color: '#999', fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer' }}>Shipping & Returns</div>
          </div>
          <div style={{ maxWidth: '800px', fontSize: '1.1rem', color: '#555', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '1.5rem' }}>Experience the ultimate blend of luxury and ruggedness with our {product.name}. Handcrafted from premium steerhide leather, this jacket is designed to age beautifully, developing a unique patina that tells your story.</p>
            <p>Featuring reinforced stitching, YKK zippers, and a tailored fit that provides both comfort and style. Whether you're hitting the open road or navigating the city streets, Wanderjackets ensures you do it with unparalleled elegance.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
