'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Eye, FileText, Download } from 'lucide-react';
import { useState } from 'react';

export default function SalesInvoicesPage() {
  const invoices = useSelector((state: RootState) => state.sales.invoices);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<string>('');

  const filteredInvoices = filterStatus
    ? invoices.filter(inv => inv.status === filterStatus)
    : invoices;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">فواتير المبيعات</h1>
          <p className="text-gray-600 mt-1">عرض وإدارة جميع فواتير البيع</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">جميع الفواتير</option>
          <option value="completed">المكتملة</option>
          <option value="draft">المسودات</option>
          <option value="cancelled">الملغاة</option>
        </select>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredInvoices.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            لا توجد فواتير حتى الآن
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    رقم الفاتورة
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    التاريخ
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    العميل
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    العدد
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    الإجمالي
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      #{invoice.id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(invoice.date).toLocaleDateString('ar-EG')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{invoice.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {invoice.items.length}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      ج.م {invoice.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          invoice.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : invoice.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {invoice.status === 'completed'
                          ? 'مكتملة'
                          : invoice.status === 'draft'
                          ? 'مسودة'
                          : 'ملغاة'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedInvoice(invoice)}
                          className="text-blue-600 hover:text-blue-700"
                          title="عرض"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-700"
                          title="طباعة"
                        >
                          <FileText size={16} />
                        </button>
                        <button
                          className="text-purple-600 hover:text-purple-700"
                          title="تحميل"
                        >
                          <Download size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-gray-50 border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                تفاصيل الفاتورة #{selectedInvoice.id.slice(0, 8)}
              </h2>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">العميل</p>
                  <p className="font-semibold text-gray-900">{selectedInvoice.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">التاريخ</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(selectedInvoice.date).toLocaleDateString('ar-EG')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">طريقة الدفع</p>
                  <p className="font-semibold text-gray-900">{selectedInvoice.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">الحالة</p>
                  <p className="font-semibold text-green-600">مكتملة</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">الأصناف</h3>
                <div className="space-y-2">
                  {selectedInvoice.items.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex justify-between text-sm border-b pb-2 last:border-b-0"
                    >
                      <span className="text-gray-600">
                        {item.quantity} x {item.price}
                      </span>
                      <span className="font-semibold">ج.م {item.total.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>الإجمالي قبل الضريبة</span>
                  <span className="font-semibold">
                    ج.م {selectedInvoice.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>الضريبة</span>
                  <span className="font-semibold">ج.م {selectedInvoice.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>الخصم</span>
                  <span className="font-semibold">
                    ج.م {selectedInvoice.discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-lg border-t pt-2">
                  <span className="font-bold">الإجمالي</span>
                  <span className="font-bold text-blue-600">
                    ج.م {selectedInvoice.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
