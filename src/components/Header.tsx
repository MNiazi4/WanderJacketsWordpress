"use client";

import Link from "next/link";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Header({ categories = [] }: { categories?: any[] }) {
  const { cart, setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const menCat = categories.find(c => c.slug === 'men');
  const womenCat = categories.find(c => c.slug === 'women');
  
  const menSubCats = menCat ? categories.filter(c => c.parent === menCat.id) : [];
  const womenSubCats = womenCat ? categories.filter(c => c.parent === womenCat.id) : [];

  return (
    <header className="site-header">
      <div className="top-bar">
        FREE LIFETIME GUARANTEE ON ALL LEATHER PRODUCTS
      </div>

      {/* Main header row: hamburger | logo | icons */}
      <div className="container">
        <div className="header-main">
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <Link href="/" className="logo">Wander<span>jackets</span></Link>
          
          {/* Desktop nav — hidden on mobile via CSS */}
          <nav className="nav-links desktop-nav">
            <div className="nav-item">
              <Link href="/category/women">Women</Link>
              <div className="mega-menu">
                <div className="container mega-menu-inner">
                  <div className="mega-col">
                    <h4>Shop by Style</h4>
                    <ul>
                      {womenSubCats.slice(0, 10).map((cat) => (
                        <li key={cat.id}><Link href={`/category/${cat.slug}`}>{cat.name}</Link></li>
                      ))}
                      {womenSubCats.length === 0 && (
                        <>
                          <li><Link href="/category/leather-skirts">Leather Skirts &amp; Trousers</Link></li>
                          <li><Link href="/category/suede-jackets">Suede Jackets</Link></li>
                        </>
                      )}
                    </ul>
                  </div>
                  <div className="mega-col">
                    <h4>Collections</h4>
                    <ul>
                      <li><a href="#">New Arrivals</a></li>
                      <li><a href="#">Bestsellers</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="nav-item">
              <Link href="/category/men">Men</Link>
              <div className="mega-menu">
                <div className="container mega-menu-inner">
                  <div className="mega-col">
                    <h4>Jackets &amp; Coats</h4>
                    <ul>
                      {menSubCats.slice(0, 8).map((cat) => (
                        <li key={cat.id}><Link href={`/category/${cat.slug}`}>{cat.name}</Link></li>
                      ))}
                      {menSubCats.length === 0 && (
                        <>
                          <li><Link href="/category/biker-jackets">Biker Jackets</Link></li>
                          <li><Link href="/category/bomber-jackets">Bomber Jackets</Link></li>
                        </>
                      )}
                    </ul>
                  </div>
                  <div className="mega-col">
                    <h4>Shop by Style</h4>
                    <ul>
                      {menSubCats.slice(8, 16).map((cat) => (
                        <li key={cat.id}><Link href={`/category/${cat.slug}`}>{cat.name}</Link></li>
                      ))}
                    </ul>
                  </div>
                  <div className="mega-col mega-featured">
                    <img src="https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=600" alt="Featured" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="nav-item">Bags</div>
          </nav>

          <div className="header-icons">
            <Search className="header-icon" size={20} />
            <User className="header-icon" size={20} />
            <Heart className="header-icon" size={20} />
            <button 
              onClick={() => setIsCartOpen(true)}
              style={{ background: 'none', border: 'none', padding: 0, position: 'relative', cursor: 'pointer' }}
            >
              <ShoppingBag className="header-icon" size={20} />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav — renders below header row, full width */}
      {isMenuOpen && (
        <nav className="mobile-nav-drawer">
          <Link href="/category/women" className="mobile-nav-item" onClick={() => setIsMenuOpen(false)}>Women</Link>
          <Link href="/category/men" className="mobile-nav-item" onClick={() => setIsMenuOpen(false)}>Men</Link>
          <Link href="/category/jackets" className="mobile-nav-item" onClick={() => setIsMenuOpen(false)}>Bags</Link>
          <Link href="/category/accessories" className="mobile-nav-item" onClick={() => setIsMenuOpen(false)}>Accessories</Link>
          <Link href="/#custom-order" className="mobile-nav-item" onClick={() => setIsMenuOpen(false)}>Custom Order</Link>
        </nav>
      )}
    </header>
  );
}
