'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { TrendingUp, AlertCircle, Users, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const products = useSelector((state: RootState) => state.inventory.products);
  const invoices = useSelector((state: RootState) => state.sales.invoices);
  const customers = useSelector((state: RootState) => state.customers.customers);

  // Mock statistics
  const todaysSales = invoices
    .filter(inv => {
      const invDate = new Date(inv.date).toDateString();
      const today = new Date().toDateString();
      return invDate === today;
    })
    .reduce((sum, inv) => sum + inv.total, 0);

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const stockValue = products.reduce((sum, p) => sum + p.quantity * p.costPrice, 0);

  const stats = [
    {
      title: 'إجمالي المبيعات اليوم',
      value: todaysSales.toLocaleString('ar-EG', { style: 'currency', currency: 'EGP' }),
      icon: ShoppingIcon,
      color: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      title: 'إجمالي الإيرادات',
      value: totalRevenue.toLocaleString('ar-EG', { style: 'currency', currency: 'EGP' }),
      icon: DollarSign,
      color: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      title: 'قيمة المخزون',
      value: stockValue.toLocaleString('ar-EG', { style: 'currency', currency: 'EGP' }),
      icon: Package,
      color: 'bg-orange-100',
      textColor: 'text-orange-600',
    },
    {
      title: 'عدد العملاء',
      value: customers.length.toString(),
      icon: Users,
      color: 'bg-purple-100',
      textColor: 'text-purple-600',
    },
  ];

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة القيادة</h1>
        <p className="text-gray-600">مرحباً بك في نظام إدارة الموارد والمخزون</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-lg shadow p-6 border-r-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className={`${stat.textColor}`} size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Sales */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">آخر العمليات</h2>
          <div className="space-y-3">
            {invoices.slice(-5).reverse().map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between pb-3 border-b last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{invoice.customer}</p>
                  <p className="text-sm text-gray-500">{new Date(invoice.date).toLocaleDateString('ar-EG')}</p>
                </div>
                <p className="font-bold text-green-600">
                  {invoice.total.toLocaleString('ar-EG', { style: 'currency', currency: 'EGP' })}
                </p>
              </div>
            ))}
            {invoices.length === 0 && (
              <p className="text-gray-500 text-center py-4">لا توجد عمليات حتى الآن</p>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">الإجراءات السريعة</h2>
          <div className="space-y-2">
            <Link
              href="/sales/pos"
              className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center text-sm font-medium transition-colors"
            >
              فتح نقطة البيع
            </Link>
            <Link
              href="/inventory/products"
              className="block w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 text-center text-sm font-medium transition-colors"
            >
              إضافة منتج
            </Link>
            <Link
              href="/purchases/invoices"
              className="block w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 text-center text-sm font-medium transition-colors"
            >
              فاتورة شراء
            </Link>
            <Link
              href="/customers/list"
              className="block w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 text-center text-sm font-medium transition-colors"
            >
              إدارة العملاء
            </Link>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {products.some(p => p.quantity < 10) && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="font-bold text-red-900 mb-1">تنبيهات المخزون</h3>
            <p className="text-sm text-red-800">
              هناك {products.filter(p => p.quantity < 10).length} أصناف بحاجة إلى إعادة طلب
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ShoppingIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function Package(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}
