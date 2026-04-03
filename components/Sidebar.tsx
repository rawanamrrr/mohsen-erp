'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Briefcase,
  DollarSign,
  Users2,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

interface NavItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    label: 'لوحة القيادة',
    href: '/',
    icon: <LayoutDashboard size={20} />,
  },
  {
    label: 'المخازن',
    icon: <Package size={20} />,
    children: [
      { label: 'تعريف الأصناف', href: '/inventory/products' },
      { label: 'المنتجات النهائية', href: '/inventory/finished-goods' },
      { label: 'الخامات والأقمشة', href: '/inventory/raw-materials' },
      { label: 'حركات المخزون', href: '/inventory/movements' },
      { label: 'التحويلات بين المخازن', href: '/inventory/transfers' },
      { label: 'سحب للتصنيع', href: '/inventory/manufacturing-issue' },
      { label: 'الجرد التسويتي', href: '/inventory/reconciliation' },
    ],
  },
  {
    label: 'المشتريات والموردين',
    icon: <Briefcase size={20} />,
    children: [
      { label: 'قائمة الموردين', href: '/purchases/suppliers' },
      { label: 'أوامر الشراء', href: '/purchases/orders' },
      { label: 'فواتير الشراء', href: '/purchases/invoices' },
      { label: 'مردودات الشراء', href: '/purchases/returns' },
      { label: 'مدفوعات الموردين', href: '/purchases/payments' },
    ],
  },
  {
    label: 'المبيعات والـ POS',
    icon: <ShoppingCart size={20} />,
    children: [
      { label: 'نقطة البيع (POS)', href: '/sales/pos' },
      { label: 'فواتير المبيعات', href: '/sales/invoices' },
      { label: 'مردودات المبيعات', href: '/sales/returns' },
    ],
  },
  {
    label: 'العملاء',
    icon: <Users size={20} />,
    children: [
      { label: 'قائمة العملاء', href: '/customers/list' },
      { label: 'التحصيلات', href: '/customers/collections' },
      { label: 'كشوفات الحساب', href: '/customers/statements' },
    ],
  },
  {
    label: 'المالية',
    icon: <DollarSign size={20} />,
    children: [
      { label: 'الخزائن والبنوك', href: '/finance/cashboxes' },
      { label: 'المصروفات', href: '/finance/expenses' },
      { label: 'الإيرادات الأخرى', href: '/finance/revenues' },
      { label: 'إدارة الشيكات', href: '/finance/cheques' },
      { label: 'التحويلات المالية', href: '/finance/transfers' },
    ],
  },
  {
    label: 'الموارد البشرية',
    icon: <Users2 size={20} />,
    children: [
      { label: 'الموظفين', href: '/hr/employees' },
      { label: 'الحضور والانصراف', href: '/hr/attendance' },
      { label: 'السلف والخصومات', href: '/hr/loans' },
      { label: 'بنود الإنتاج', href: '/hr/production-items' },
      { label: 'تسجيل الإنتاج اليومي', href: '/hr/daily-production' },
      { label: 'الرواتب والأجور', href: '/hr/payroll' },
    ],
  },
  {
    label: 'التقاریر',
    icon: <FileText size={20} />,
    children: [
      { label: 'تقاریر المخازن', href: '/reports/inventory' },
      { label: 'تقاریر المبيعات', href: '/reports/sales' },
      { label: 'التقاریر المالية', href: '/reports/finance' },
      { label: 'تقاریر الموارد البشرية', href: '/reports/hr' },
    ],
  },
  {
    label: 'الإعدادات',
    icon: <Settings size={20} />,
    children: [
      { label: 'إعدادات النظام', href: '/settings/system' },
      { label: 'المستخدمين', href: '/settings/users' },
      { label: 'الصلاحيات', href: '/settings/permissions' },
    ],
  },
];

function SidebarItem({ item }: { item: NavItem }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="mb-1">
      {hasChildren ? (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-4 py-2.5 text-gray-700 hover:bg-cream hover:text-secondary rounded-lg transition-colors text-sm"
        >
          <span className="flex items-center gap-3">
            <span className="text-gray-600">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </span>
          {isExpanded ? (
            <ChevronDown size={18} className="text-gray-400" />
          ) : (
            <ChevronRight size={18} className="text-gray-400" />
          )}
        </button>
      ) : (
        <Link
          href={item.href || '#'}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-cream hover:text-secondary rounded-lg transition-colors text-sm font-medium"
        >
          <span className="text-gray-600">{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      )}

      {/* Submenu */}
      {hasChildren && isExpanded && (
        <div className="pr-4 py-1 space-y-0.5">
          {item.children.map((child, idx) => (
            <Link
              key={idx}
              href={child.href || '#'}
              className="block px-4 py-2 text-gray-600 hover:bg-cream rounded-lg text-sm transition-colors hover:text-secondary"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto flex flex-col h-full">
      {/* Logo Section */}
      <div className="p-4 border-b border-primary bg-primary text-secondary flex flex-col items-center justify-center">
        {/* Placeholder SVG for the logo mark based on brand colors */}
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
          <path d="M50 15 C30 15 15 30 15 50 C15 70 30 85 50 85 C70 85 85 70 85 50 C85 30 70 15 50 15 Z M50 25 C64 25 75 36 75 50 C75 64 64 75 50 75 C36 75 25 64 25 50 C25 36 36 25 50 25 Z" fill="#C58B79" fillOpacity="0.8"/>
          <path d="M40 70 Q 50 30 60 70 M30 50 Q 50 20 70 50" stroke="#C58B79" strokeWidth="3" strokeLinecap="round" fill="none"/>
        </svg>
        <h1 className="text-xl font-serif tracking-widest text-[#F7F4EB] font-bold text-center uppercase">MOHSEN</h1>
        <p className="text-[10px] text-secondary tracking-widest text-center mt-1 uppercase">for casual women clothes</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navItems.map((item, idx) => (
          <SidebarItem key={idx} item={item} />
        ))}
      </nav>
    </aside>
  );
}
