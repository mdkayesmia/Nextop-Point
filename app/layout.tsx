import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
export const metadata = {
  title: "Nextop Point",
  description: "Study Abroad Consultancy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
         <Toaster position="top-right" />
        </body>
    </html>
  );
}