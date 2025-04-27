import CarouselComponent from "@/components/ui/CarouselComponent";
import useProducts from "../hooks/useProducts";
import Link from "next/link"
import { useMemo } from "react";
import ProductCard from "../components/ui/ProductCard";
export default function Home() {

  const { products } = useProducts();

  const displayedProducts = useMemo(() => {
    if (!products) return [];

    const productsOnly = products.filter((p) => p.type === "product");
    const servicesOnly = products.filter((p) => p.type === "service");

    const selectedProducts = productsOnly.slice(0, 4);
    const selectedServices = servicesOnly.slice(0, 4);

    let combined = [...selectedProducts, ...selectedServices];

    // Fill if total is less than 8
    if (combined.length < 8) {
      const remaining = 8 - combined.length;

      // Get extra from products first if possible
      const extraProducts = productsOnly.slice(4, 4 + remaining);
      const extraServices = servicesOnly.slice(4, 4 + (remaining - extraProducts.length));

      combined = [...combined, ...extraProducts, ...extraServices];
    }

    // Finally if still less than 8 (total available items are less), just return all
    return combined.slice(0, 8);
  }, [products]);


  return (
    <div className="p-4">
      {/* <h1 className="text-xl font-bold">Welcome to Healthy Habitat Network</h1>
      <Link href="/auth/login">Login</Link> | <Link href="/auth/register">Register</Link>
       */}
      <div className="flex flex-col gap-4">
        {/* Cover Art */}
        <CarouselComponent />
        <div className=" text-center flex flex-col items-center">
          <h2 className="  text-xl font-bold tracking-wide">
            About Us
          </h2>
          <hr className="w-[90%] sm:w-[70%] text-gray-200 my-2" />
          <p className="w-[90%] sm:w-[70%] max-sm:text-sm ">
            "Healthy Habitat Network," is a non-profit organization dedicated to promoting health and wellness in communities through sustainable living practices. The initiative aims to develop an online platform encouraging individuals and families to adopt healthy, sustainable lifestyle choices by connecting them with businesses offering health and wellness products and services. The platform will serve as a bridge between health-conscious consumers and businesses, fostering a community focused on well-being and sustainability.
          </p>
        </div>
        {/* Products */}
        <div className=" min-w-min flex flex-col items-center justify-start border p-2 border-gray-200 rounded-2xl">
          <h2 className="ml-4 text-xl font-bold tracking-wide">
            Top Products
          </h2>
          <hr className="sm:w-[90%] text-gray-200 my-2" />
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2">

            {displayedProducts.map((product) => (

              <ProductCard key={product.id} product={product} />

            ))}

          </div>
          <button href="/products" className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition duration-200">
            See All Products
          </button>
        </div>
      </div>
    </div>
  );
}


