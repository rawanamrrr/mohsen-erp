'use client';

import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html dir="rtl" lang="ar">
      <head>
        <title>أبو ليلة ERP - نظام إدارة المشاريع</title>
        <meta name="description" content="نظام إدارة الموارد والمخزون للمتاجر والتصنيع" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-slate-50">
        <Provider store={store}>
          <div className="flex h-screen bg-slate-50">
            {/* Sidebar Navigation */}
            <Sidebar />
            
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Top Header */}
              <Header />
              
              {/* Page Content */}
              <main className="flex-1 overflow-auto">
                {children}
              </main>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
