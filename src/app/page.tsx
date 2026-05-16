import { getBestSellers } from "@/lib/woocommerce";
import { Star, Truck, User } from "lucide-react";
import CustomOrderForm from "@/components/CustomOrderForm";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export const revalidate = 60;

// The 6 curated collection items shown in "Our Collection"
const COLLECTIONS = [
  {
    id: 1,
    title: "Leather Jackets",
    subtitle: "Biker • Bomber • Café Racer",
    href: "/category/jackets",
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
    span: "large",
  },
  {
    id: 2,
    title: "Backpacks",
    subtitle: "Handcrafted. Built to last.",
    href: "/category/backpacks",
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    span: "small",
  },
  {
    id: 3,
    title: "Purses",
    subtitle: "Elegant everyday carry.",
    href: "/category/purses",
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
    span: "small",
  },
  {
    id: 4,
    title: "Belts",
    subtitle: "Full-grain. Perfectly finished.",
    href: "/category/belts",
    img: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop",
    span: "small",
  },
  {
    id: 5,
    title: "Accessories",
    subtitle: "Wallets, keychains & more.",
    href: "/category/accessories",
    img: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop",
    span: "small",
  },
  {
    id: 6,
    title: "Custom Orders",
    subtitle: "Your vision. Our craft.",
    href: "#custom-order",
    img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop",
    span: "large",
  },
];

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
            <p className="hero-subtitle">
              Luxurious yet sustainable leather goods, where softness, durability,
              and affordable elegance elevate every moment.
            </p>
            <div className="hero-buttons">
              <Link href="/category/men" className="btn btn-light">Shop Men</Link>
              <Link href="/category/women" className="btn btn-dark">Shop Women</Link>
            </div>
          </div>
        </div>
      </section>

      {/* OUR COLLECTION */}
      <section className="section-pad collection-section">
        <div className="container">
          <h2 className="section-title">Our Collection</h2>
          <p className="section-subtitle">Premium leather goods, handcrafted with care.</p>
          <div className="collection-grid">
            {COLLECTIONS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`collection-card${item.span === "large" ? " collection-card--large" : ""}`}
              >
                <img src={item.img} alt={item.title} className="collection-card__img" />
                <div className="collection-card__overlay"></div>
                <div className="collection-card__content">
                  <span className="collection-card__subtitle">{item.subtitle}</span>
                  <h3 className="collection-card__title">{item.title}</h3>
                  <span className="collection-card__cta">Explore →</span>
                </div>
              </Link>
            ))}
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
              <h2>Create Your<br />Custom<br />Leather<br />Jacket</h2>
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
                <p>From premium natural leather to YKK zippers, enjoy excellent craftsmanship that begins with only the highest class of materials.</p>
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
                <p>We provide luxury products directly to you, so there is no extra expense or middleman markup.</p>
              </div>
            </div>
            <div className="why-item">
              <img className="why-img" src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop" alt="Tailored For You" />
              <div className="why-text">
                <h3>Tailored For You</h3>
                <p>All of our handcrafted products are available in custom sizes and ready to wear right out of the box.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
