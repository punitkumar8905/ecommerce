import Header from "@/components/website/Header";
import HeroSection from "@/components/website/HeroSection";
import BrandsAndCategories from "@/components/website/BrandsAndCategories";
import DealsOfTheDay from "@/components/website/DealsOfTheDay";
import PreOrderBanner from "@/components/website/PreOrderBanner";
import ProductGridTabs from "@/components/website/ProductGridTabs";
import CategoryProductSection from "@/components/website/CategoryProductSection";

export default function HomePage() {
  return (
    <>
      {/* <Header /> */}
      <HeroSection />
      <BrandsAndCategories />
      <DealsOfTheDay />
      <PreOrderBanner />
      <ProductGridTabs />

      <CategoryProductSection
        title="Top Cellphones & Tablets"
        bannerTitle="Top Cellphones & Tablets"
        bannerColor="bg-[#0bb59d]"
        subCategories={[
          { name: "Smartphones", count: 120 },
          { name: "Tablet", count: 80 },
          { name: "Accessories", count: 45 },
        ]}
        products={[
          { name: "Galaxy S24 Ultra", price: "$999.00", reviews: "(124)", badge: "NEW" },
          { name: "iPad Pro 12.9", price: "$1,099.00", reviews: "(88)", badge: "HOT" },
          { name: "AirPods Pro", price: "$249.00", reviews: "(56)", badge: null },
          { name: "Wireless Charger", price: "$39.00", reviews: "(21)", badge: null },
        ]}
      />

      <CategoryProductSection
        title="Best Laptops & Computers"
        bannerTitle="Best Laptops & Computers"
        bannerColor="bg-gray-900"
        subCategories={[
          { name: "Gaming Laptops", count: 70 },
          { name: "Ultrabooks", count: 55 },
          { name: "Monitors", count: 40 },
        ]}
        products={[
          { name: "MacBook Air M3", price: "$1,299.00", reviews: "(98)", badge: "SALE" },
          { name: "Dell XPS 15", price: "$1,799.00", reviews: "(74)", badge: null },
          { name: "ROG Zephyrus", price: "$2,199.00", reviews: "(41)", badge: "HOT" },
          { name: "Mechanical Keyboard", price: "$129.00", reviews: "(32)", badge: null },
        ]}
      />

      <CategoryProductSection
        title="Audio & Headphones"
        bannerTitle="Audio & Headphones"
        bannerColor="bg-[#0bb59d]"
        subCategories={[
          { name: "Wireless Headphones", count: 90 },
          { name: "Earbuds", count: 65 },
          { name: "Soundbars", count: 50 },
        ]}
        products={[
          { name: "Sony WH-1000XM5", price: "$349.00", reviews: "(63)", badge: "NEW" },
          { name: "Beats Studio Pro", price: "$299.00", reviews: "(47)", badge: null },
          { name: "Bose QuietComfort", price: "$279.00", reviews: "(35)", badge: null },
          { name: "JBL Charge 5", price: "$129.00", reviews: "(24)", badge: null },
        ]}
      />
    </>
  );
}