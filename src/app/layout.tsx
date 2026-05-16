import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Search, User, Heart, ShoppingBag } from "lucide-react";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";
import { getCategories } from "@/lib/woocommerce";

export const metadata: Metadata = {
  title: "Wanderjackets | Leather. Made for You",
  description: "Luxurious yet sustainable leather jackets, where softness, durability, and affordable elegance elevate every moment.",
};

export const revalidate = 60;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header categories={categories} />
          <CartSidebar />
          <main>{children}</main>

          <footer className="site-footer">
            <div className="container">
              <div className="footer-grid">
                <div className="footer-col">
                  <h4>Men</h4>
                  <ul>
                    <li><a href="#">Men Leather Jacket</a></li>
                    <li><a href="#">Motorcycle Leather Jackets</a></li>
                    <li><a href="#">Bomber Leather Jacket</a></li>
                    <li><a href="#">Leather Pants Men</a></li>
                    <li><a href="#">Café Racer Jackets</a></li>
                  </ul>
                </div>
                <div className="footer-col">
                  <h4>Women</h4>
                  <ul>
                    <li><a href="#">Leather Jacket Women</a></li>
                    <li><a href="#">Women Biker Jacket</a></li>
                    <li><a href="#">Women Bomber Jackets</a></li>
                    <li><a href="#">Women Leather Blazers</a></li>
                    <li><a href="#">Women Leather Coats</a></li>
                  </ul>
                </div>
                <div className="footer-col">
                  <h4>Popular Colors</h4>
                  <ul>
                    <li><a href="#">Black Leather Jacket</a></li>
                    <li><a href="#">Brown Leather Jackets</a></li>
                    <li><a href="#">Red Leather Jacket</a></li>
                    <li><a href="#">Blue Leather Jacket</a></li>
                    <li><a href="#">Burgundy Leather Jackets</a></li>
                  </ul>
                </div>
                <div className="footer-col">
                  <h4>Customization</h4>
                  <ul>
                    <li><a href="#">Custom Leather Jackets</a></li>
                    <li><a href="#">Custom Embroidered Jackets</a></li>
                    <li><a href="#">Custom Motorcycle Jackets</a></li>
                    <li><a href="#">Custom Leather Vest</a></li>
                    <li><a href="#">Custom Bomber Jacket</a></li>
                  </ul>
                </div>
                <div className="footer-col footer-subscribe">
                  <h4 style={{marginBottom: "1rem"}}>Contact Us</h4>
                  <p style={{fontSize: "0.85rem", marginBottom: "0.5rem"}}>Toll Free: <strong>+1-360-362-5920</strong></p>
                  <p style={{fontSize: "0.85rem"}}>Email: <strong>support@wanderjackets.com</strong></p>
                </div>
              </div>
              
              <div className="footer-bottom">
                <div>© 2026 Wanderjackets. Copyright 2026 Wanderjackets - All Rights Reserved.</div>
                <div className="payment-icons">
                  <span style={{background: "#fff", color: "#000", padding: "2px 6px", borderRadius: "2px", fontSize: "10px", fontWeight: "bold"}}>VISA</span>
                  <span style={{background: "#fff", color: "#000", padding: "2px 6px", borderRadius: "2px", fontSize: "10px", fontWeight: "bold"}}>MC</span>
                  <span style={{background: "#fff", color: "#000", padding: "2px 6px", borderRadius: "2px", fontSize: "10px", fontWeight: "bold"}}>AMEX</span>
                  <span style={{background: "#fff", color: "#000", padding: "2px 6px", borderRadius: "2px", fontSize: "10px", fontWeight: "bold"}}>PAYPAL</span>
                </div>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
