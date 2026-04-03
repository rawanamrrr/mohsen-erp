'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { addCustomer, updateCustomer, deleteCustomer } from '@/lib/slices/customersSlice';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

interface FormData {
  id?: string;
  name: string;
  phone: string;
  address: string;
  creditLimit: number;
  balance: number;
  type: 'نقدي' | 'آجل';
}

export default function CustomersPage() {
  const dispatch = useDispatch();
  const customers = useSelector((state: RootState) => state.customers.customers);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
    creditLimit: 0,
    balance: 0,
    type: 'نقدي',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ['creditLimit', 'balance'].includes(name) ? parseFloat(value) || 0 : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (editingId) {
      dispatch(
        updateCustomer({
          ...formData,
          id: editingId,
        })
      );
      setEditingId(null);
      alert('تم تحديث العميل بنجاح');
    } else {
      dispatch(
        addCustomer({
          ...formData,
          id: Date.now().toString(),
        })
      );
      alert('تم إضافة العميل بنجاح');
    }

    setFormData({
      name: '',
      phone: '',
      address: '',
      creditLimit: 0,
      balance: 0,
      type: 'نقدي',
    });
    setShowForm(false);
  };

  const handleEdit = (customer: any) => {
    setFormData(customer);
    setEditingId(customer.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا العميل؟')) {
      dispatch(deleteCustomer(id));
      alert('تم حذف العميل بنجاح');
    }
  };

  const filteredCustomers = customers.filter(
    c =>
      c.name.includes(searchTerm) ||
      c.phone.includes(searchTerm) ||
      c.address.includes(searchTerm)
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">قائمة العملاء</h1>
          <p className="text-gray-600 mt-1">إدارة بيانات العملاء والحدود الائتمانية</p>
        </div>
        <button
          onClick={() => {
            setFormData({
              name: '',
              phone: '',
              address: '',
              creditLimit: 0,
              balance: 0,
              type: 'نقدي',
            });
            setEditingId(null);
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
        >
          <Plus size={20} />
          <span>إضافة عميل</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute right-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="ابحث بالاسم أو رقم الهاتف..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {editingId ? 'تعديل العميل' : 'إضافة عميل جديد'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اسم العميل *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رقم الهاتف
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                العنوان
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نوع العميل
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="نقدي">نقدي</option>
                <option value="آجل">آجل</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الحد الائتماني
              </label>
              <input
                type="number"
                step="0.01"
                name="creditLimit"
                value={formData.creditLimit}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="col-span-2 flex gap-2">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
              >
                {editingId ? 'تحديث' : 'إضافة'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">
            {customers.length === 0 ? 'لا توجد عملاء حتى الآن' : 'لا توجد نتائج مطابقة'}
          </div>
        ) : (
          filteredCustomers.map((customer) => (
            <div key={customer.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">{customer.name}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(customer)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">النوع:</span>
                  <span className="font-medium">
                    {customer.type === 'نقدي' ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">نقدي</span>
                    ) : (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">آجل</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الهاتف:</span>
                  <span className="font-medium">{customer.phone || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الرصيد:</span>
                  <span
                    className={`font-semibold ${
                      customer.balance > 0 ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    ج.م {customer.balance}
                  </span>
                </div>
                {customer.type === 'آجل' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">الحد الائتماني:</span>
                    <span className="font-medium">ج.م {customer.creditLimit}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
