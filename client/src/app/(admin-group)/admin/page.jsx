"use client";

import React, { useState } from "react";

export default function Page() {
 

  return (
    <div className="flex">
    

      <div className="flex-1 lg:ml-64">
       

        <main className="p-6">
          <h2 className="text-3xl font-bold">
            Welcome Admin 👋
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="bg-white p-6 rounded-xl shadow">
              Total Users
              <h3 className="text-3xl font-bold mt-2">
                1,250
              </h3>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              Orders
              <h3 className="text-3xl font-bold mt-2">
                890
              </h3>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              Revenue
              <h3 className="text-3xl font-bold mt-2">
                ₹85,000
              </h3>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              Products
              <h3 className="text-3xl font-bold mt-2">
                350
              </h3>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}