import CarouselComponent from "@/components/ui/CarouselComponent";
import Link from "next/link"
export default function Home() {
  return (
    <div className="p-4">
      {/* <h1 className="text-xl font-bold">Welcome to Healthy Habitat Network</h1>
      <Link href="/auth/login">Login</Link> | <Link href="/auth/register">Register</Link>
       */}
       <div className="flex flex-col gap-4">
        {/* Cover Art */}
        <CarouselComponent/>
        <div className=" text-center flex flex-col items-center">
          <h2 className="  text-xl font-bold tracking-wide">
            About Us
          </h2>
          <hr className="w-[90%] sm:w-[70%] text-gray-200 my-2"/>
          <p className="w-[90%] sm:w-[70%] max-sm:text-sm ">
            "Healthy Habitat Network," is a non-profit organization dedicated to promoting health and wellness in communities through sustainable living practices. The initiative aims to develop an online platform encouraging individuals and families to adopt healthy, sustainable lifestyle choices by connecting them with businesses offering health and wellness products and services. The platform will serve as a bridge between health-conscious consumers and businesses, fostering a community focused on well-being and sustainability.
          </p>
        </div>
        {/* Products */}
        <div className=" border p-2 border-gray-200 rounded-2xl">
        <h2 className="ml-4 text-xl font-bold tracking-wide">
            Top Products
          </h2>
          <hr className="sm:w-[70%] text-gray-200 my-2"/>
          <div className=" gap-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <button className=" h-full w-full bg-red-900 rounded-2xl text-amber-50">ejkr</button>
            <button className=" h-full w-full bg-red-900 rounded-2xl text-amber-50">ejkr</button>
            <button className=" h-full w-full bg-red-900 rounded-2xl text-amber-50">ejkr</button>
            <button className=" h-full w-full bg-red-900 rounded-2xl text-amber-50">ejkr</button>
            <button className=" h-full w-full bg-red-900 rounded-2xl text-amber-50">ejkr</button>
            <button className=" h-full w-full bg-red-900 rounded-2xl text-amber-50">ejkr</button>
            <button className=" h-full w-full bg-red-900 rounded-2xl text-amber-50">ejkr</button>
            <button className=" h-full w-full bg-red-900 rounded-2xl text-amber-50">ejkr</button>
            <button className=" h-full w-full bg-red-900 rounded-2xl text-amber-50">ejkr</button>
          </div>
        </div>
       </div>
    </div>
  );
}


// import Image from "next/image";
// import { Geist, Geist_Mono } from "next/font/google";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
//               pages/index.js
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>
//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
