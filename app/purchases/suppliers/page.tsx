'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { addSupplier, updateSupplier, deleteSupplier } from '@/lib/slices/suppliersSlice';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

interface FormData {
  id?: string;
  name: string;
  type: 'أقمشة' | 'منتجات نهائية';
  phone: string;
  address: string;
  balance: number;
}

export default function SuppliersPage() {
  const dispatch = useDispatch();
  const suppliers = useSelector((state: RootState) => state.suppliers.suppliers);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    type: 'أقمشة',
    phone: '',
    address: '',
    balance: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'balance' ? parseFloat(value) || 0 : value,
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
        updateSupplier({
          ...formData,
          id: editingId,
        })
      );
      setEditingId(null);
      alert('تم تحديث المورد بنجاح');
    } else {
      dispatch(
        addSupplier({
          ...formData,
          id: Date.now().toString(),
        })
      );
      alert('تم إضافة المورد بنجاح');
    }

    setFormData({
      name: '',
      type: 'أقمشة',
      phone: '',
      address: '',
      balance: 0,
    });
    setShowForm(false);
  };

  const handleEdit = (supplier: any) => {
    setFormData(supplier);
    setEditingId(supplier.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المورد؟')) {
      dispatch(deleteSupplier(id));
      alert('تم حذف المورد بنجاح');
    }
  };

  const filteredSuppliers = suppliers.filter(
    s =>
      s.name.includes(searchTerm) ||
      s.phone.includes(searchTerm) ||
      s.address.includes(searchTerm)
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">قائمة الموردين</h1>
          <p className="text-gray-600 mt-1">إدارة موردي الأقمشة والمنتجات النهائية</p>
        </div>
        <button
          onClick={() => {
            setFormData({
              name: '',
              type: 'أقمشة',
              phone: '',
              address: '',
              balance: 0,
            });
            setEditingId(null);
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
        >
          <Plus size={20} />
          <span>إضافة مورد</span>
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
            {editingId ? 'تعديل المورد' : 'إضافة مورد جديد'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اسم المورد *
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
                النوع
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="أقمشة">أقمشة</option>
                <option value="منتجات نهائية">منتجات نهائية</option>
              </select>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الرصيد المستحق
              </label>
              <input
                type="number"
                step="0.01"
                name="balance"
                value={formData.balance}
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

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">
            {suppliers.length === 0 ? 'لا توجد موردين حتى الآن' : 'لا توجد نتائج مطابقة'}
          </div>
        ) : (
          filteredSuppliers.map((supplier) => (
            <div key={supplier.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">{supplier.name}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(supplier)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(supplier.id)}
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
                    {supplier.type === 'أقمشة' ? (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        أقمشة
                      </span>
                    ) : (
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                        منتجات نهائية
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الهاتف:</span>
                  <span className="font-medium">{supplier.phone || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">العنوان:</span>
                  <span className="font-medium text-right">{supplier.address || '-'}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-600">الرصيد المستحق:</span>
                  <span className="font-semibold text-red-600">ج.م {supplier.balance}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
