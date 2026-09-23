  "use client";

  import { Geist, Geist_Mono } from "next/font/google";

  import "../globals.css";
  import Header from "@/components/admin/Header";
  import Sidebar from "@/components/admin/Sidebar";



  export default function RootLayout({ children }) {
    return (
      <html
        lang="en"
      >
        <body>
          <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex flex-col flex-1 ml-64">
              <Header />
              <main className="flex-1 p-6">
                {children}
              </main>

            </div>
          </div>


        </body>
      </html>
    );
  }
