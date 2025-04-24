import "../styles/globals.css";

import Navbar from "../components/layouts/Navbar";
import { useRouter } from "next/router";
import AdminLayout from "../components/layouts/AdminLayout";
import ResidentLayout from "../components/layouts/ResidentLayout";
import BusinessLayout from "../components/layouts/BusinessLayout";

import AuthProvider from "../context/authContext";
import { CouncilProvider } from "../context/CouncilContext";
import { LocationProvider } from "../context/LocationContext";
import { ResidentProvider } from "../context/ResidentContext";
import { BusinessProvider } from "../context/BusinessContext";
import { ProductProvider } from "../context/ProductContext";
import { VoteProvider } from "../context/VoteContext";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const path = router.pathname;

  const getLayout = () => {
    if (path.startsWith("/admin")) return (page) => <AdminLayout>{page}</AdminLayout>;
    if (path.startsWith("/resident")) return (page) => <ResidentLayout>{page}</ResidentLayout>;
    if (path.startsWith("/business")) return (page) => <BusinessLayout>{page}</BusinessLayout>;
    return (page) => page; // default for /auth, /products, etc.
  };

  const Layout = getLayout();
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        {/* <div className="flex flex-1">
          You can conditionally render Sidebar if needed
          <Sidebar /> */}
        <CouncilProvider>
          <LocationProvider>
            <ResidentProvider>
              <BusinessProvider>
                <ProductProvider>
                  <VoteProvider>
                    {/* Main content area */}
                    <main className="">
                      {Layout(<Component {...pageProps} />)}
                    </main>
                  </VoteProvider>
                </ProductProvider>
              </BusinessProvider>
            </ResidentProvider>
          </LocationProvider>
        </CouncilProvider>
        {/* </div> */}
      </div>
    </AuthProvider>
  );
}
