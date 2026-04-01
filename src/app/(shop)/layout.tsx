import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { CartProvider } from "@/context/cart";
import CartDrawer from "@/components/shop/CartDrawer";
import CartButton from "@/components/shop/CartButton";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <CartButton />
    </CartProvider>
  );
}
