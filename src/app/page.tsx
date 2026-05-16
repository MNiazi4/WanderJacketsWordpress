import { getBestSellers } from "@/lib/woocommerce";
import { Star, Truck, User } from "lucide-react";
import CustomOrderForm from "@/components/CustomOrderForm";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";


export const revalidate = 60;

export default async function Home() {
  const bestSellers = await getBestSellers();

  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Leather. Made for You</h1>
            <p className="hero-subtitle">Luxurious yet sustainable leather jackets, where softness, durability, and affordable elegance elevate every moment.</p>
            <div className="hero-buttons">
              <Link href="/category/men" className="btn btn-light" style={{display: "inline-block"}}>Shop Men</Link>
              <Link href="/category/women" className="btn btn-dark" style={{display: "inline-block"}}>Shop Women</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY BOXES */}
      <section className="category-boxes">
        <div className="container">
          <div className="cat-grid">
            {/* Strictly Curated Collections */}
            <Link href="/category/jackets" className="cat-box">
              <div className="cat-img-wrap">
                <img src="/jacketg.jpg" alt="Jackets" style={{ borderRadius: '5px' }} />
              </div>
              <div className="cat-title">Jackets</div>
            </Link>
            
            <Link href="/category/purses" className="cat-box">
              <div className="cat-img-wrap">
                <img src="/pursesg.jpg" alt="Purses" style={{ borderRadius: '5px' }} />
              </div>
              <div className="cat-title">Purses</div>
            </Link>

            <Link href="/category/backpacks" className="cat-box">
              <div className="cat-img-wrap">
                <img src="/bagsg.png" alt="Backpacks" style={{ borderRadius: '5px' }} />
              </div>
              <div className="cat-title">Backpacks</div>
            </Link>

            <Link href="/category/accessories" className="cat-box">
              <div className="cat-img-wrap">
                <img src="/accecosries.png" alt="Accessories" style={{ borderRadius: '5px' }} />
              </div>
              <div className="cat-title">Accessories</div>
            </Link>

            <Link href="/category/belts" className="cat-box">
              <div className="cat-img-wrap">
                <img src="https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=200&auto=format&fit=crop" alt="Belts" style={{ borderRadius: '5px' }} />
              </div>
              <div className="cat-title">Belts</div>
            </Link>
            
            <Link href="#custom-order" className="cat-box">
              <div className="cat-img-wrap">
                <img src="/custom.png" alt="Custom Order" style={{ borderRadius: '5px' }} />
              </div>
              <div className="cat-title">Custom Order</div>
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST METRICS */}
      <section className="trust-bar">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon"><User size={30} /></div>
              <div className="trust-text">12,000+ CUSTOMERS</div>
            </div>
            <div className="trust-item">
              <div className="trust-icon"><Truck size={30} /></div>
              <div className="trust-text">15,000+ ORDERS</div>
            </div>
            <div className="trust-item">
              <div className="trust-icon"><Star size={30} /></div>
              <div className="trust-text">9,000+ 5-STAR REVIEWS</div>
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="section-pad" style={{ backgroundColor: "#F9F9F9" }}>
        <div className="container">
          <h2 className="section-title">Our Best Sellers</h2>
          <div className="product-grid">
            {bestSellers.map((product: any) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOM ORDER FORM */}
      <section id="custom-order" className="section-pad custom-order-section">
        <div className="container">
          <div className="custom-order-grid">
            <div className="custom-order-text">
              <h2>Create Your<br/>Custom<br/>Leather<br/>Jackets</h2>
            </div>
            <div className="custom-order-form-wrapper">
              <CustomOrderForm />
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-us">
        <div className="container" style={{ padding: 0 }}>
          <div style={{ textAlign: "center", padding: "4rem 0 2rem" }}>
            <h2 style={{ color: "white", fontSize: "2.5rem" }}>The Wanderjackets Difference</h2>
          </div>
          <div className="why-us-grid">
            <div className="why-item">
              <img className="why-img" src="https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?q=80&w=500&auto=format&fit=crop" alt="Premium Raw Materials" />
              <div className="why-text">
                <h3>Premium Raw Materials</h3>
                <p>From premium natural leather to premium YKK zippers, enjoy excellent craftsmanship that begins with only the highest class of materials.</p>
              </div>
            </div>
            <div className="why-item">
              <img className="why-img" src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=500&auto=format&fit=crop" alt="Crafted by Hand" />
              <div className="why-text">
                <h3>Crafted by Hand</h3>
                <p>Handmade by a craftsman, never mass-produced. Each product is individually measured, cut, and sewn to ensure greater detail in every stitch.</p>
              </div>
            </div>
            <div className="why-item">
              <img className="why-img" src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=500&auto=format&fit=crop" alt="Workshop to You" />
              <div className="why-text">
                <h3>Workshop to You</h3>
                <p>We provide luxury products directly to you, so there's no extra expense or middleman markup.</p>
              </div>
            </div>
            <div className="why-item">
              <img className="why-img" src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop" alt="Tailored For you" />
              <div className="why-text">
                <h3>Tailored For you</h3>
                <p>All of our handcrafted jackets are available in custom sizes and ready to wear right out of the box.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG INSIGHTS */}
      <section className="section-pad">
        <div className="container">
          <h2 className="section-title">Wanderjackets Insights</h2>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", color: "#666" }}>
            <p style={{ marginBottom: "1rem" }}>
              Welcome to the Wanderjackets journal. Here you will find our latest thoughts, styling guides, and deep dives into the world of premium leather craftsmanship. Leather is more than just a material; it is a lifestyle, a statement of enduring quality that only gets better with time. 
            </p>
            <p>
              Whether you are looking for tips on how to condition your vintage biker jacket or exploring the differences between top-grain and full-grain hides, our experts share their knowledge to help you make informed decisions and keep your wardrobe looking immaculate for decades to come.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
