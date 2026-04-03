'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { addProduct, updateProduct, deleteProduct } from '@/lib/slices/inventorySlice';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

interface FormData {
  id?: string;
  name: string;
  sku: string;
  barcode: string;
  category: string;
  quantity: number;
  costPrice: number;
  salePrice: number;
  warehouse: string;
}

export default function ProductsPage() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.inventory.products);
  const warehouses = useSelector((state: RootState) => state.inventory.warehouses);
  const categories = useSelector((state: RootState) => state.inventory.categories);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    sku: '',
    barcode: '',
    category: '',
    quantity: 0,
    costPrice: 0,
    salePrice: 0,
    warehouse: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ['quantity', 'costPrice', 'salePrice'].includes(name)
        ? parseFloat(value) || 0
        : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.sku || !formData.category) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (editingId) {
      dispatch(
        updateProduct({
          ...formData,
          id: editingId,
        })
      );
      setEditingId(null);
      alert('تم تحديث المنتج بنجاح');
    } else {
      dispatch(
        addProduct({
          ...formData,
          id: Date.now().toString(),
        })
      );
      alert('تم إضافة المنتج بنجاح');
    }

    setFormData({
      name: '',
      sku: '',
      barcode: '',
      category: '',
      quantity: 0,
      costPrice: 0,
      salePrice: 0,
      warehouse: '',
    });
    setShowForm(false);
  };

  const handleEdit = (product: any) => {
    setFormData(product);
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      dispatch(deleteProduct(id));
      alert('تم حذف المنتج بنجاح');
    }
  };

  const filteredProducts = products.filter(
    p =>
      p.name.includes(searchTerm) ||
      p.sku.includes(searchTerm) ||
      p.barcode.includes(searchTerm)
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">تعريف الأصناف</h1>
          <p className="text-gray-600 mt-1">إدارة المنتجات والخامات، الكميات والأسعار</p>
        </div>
        <button
          onClick={() => {
            setFormData({
              name: '',
              sku: '',
              barcode: '',
              category: '',
              quantity: 0,
              costPrice: 0,
              salePrice: 0,
              warehouse: '',
            });
            setEditingId(null);
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
        >
          <Plus size={20} />
          <span>إضافة منتج</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute right-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="ابحث بالاسم أو SKU أو الباركود..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {editingId ? 'تعديل المنتج' : 'إضافة منتج جديد'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اسم المنتج *
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
                SKU (كود الصنف) *
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الباركود
              </label>
              <input
                type="text"
                name="barcode"
                value={formData.barcode}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                التصنيف *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">اختر تصنيف</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الكمية
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                سعر التكلفة
              </label>
              <input
                type="number"
                step="0.01"
                name="costPrice"
                value={formData.costPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                سعر البيع
              </label>
              <input
                type="number"
                step="0.01"
                name="salePrice"
                value={formData.salePrice}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                المخزن
              </label>
              <select
                name="warehouse"
                value={formData.warehouse}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">اختر مخزن</option>
                {warehouses.map((wh) => (
                  <option key={wh} value={wh}>
                    {wh}
                  </option>
                ))}
              </select>
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

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {products.length === 0 ? 'لا توجد منتجات حتى الآن' : 'لا توجد نتائج مطابقة'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    الاسم
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    التصنيف
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    الكمية
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    سعر البيع
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.sku}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          product.quantity > 10
                            ? 'bg-green-100 text-green-800'
                            : product.quantity > 0
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      ج.م {product.salePrice}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={16} />
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
    </div>
  );
}
