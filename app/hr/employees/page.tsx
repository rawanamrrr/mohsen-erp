'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { addEmployee, updateEmployee, deleteEmployee } from '@/lib/slices/hrSlice';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

interface FormData {
  id?: string;
  name: string;
  position: string;
  salary: number;
  joinDate: string;
  phone: string;
}

export default function EmployeesPage() {
  const dispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.hr.employees);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    position: '',
    salary: 0,
    joinDate: '',
    phone: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'salary' ? parseFloat(value) || 0 : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.position || !formData.joinDate) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (editingId) {
      dispatch(
        updateEmployee({
          ...formData,
          id: editingId,
        })
      );
      setEditingId(null);
      alert('تم تحديث الموظف بنجاح');
    } else {
      dispatch(
        addEmployee({
          ...formData,
          id: Date.now().toString(),
        })
      );
      alert('تم إضافة الموظف بنجاح');
    }

    setFormData({
      name: '',
      position: '',
      salary: 0,
      joinDate: '',
      phone: '',
    });
    setShowForm(false);
  };

  const handleEdit = (employee: any) => {
    setFormData(employee);
    setEditingId(employee.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الموظف؟')) {
      dispatch(deleteEmployee(id));
      alert('تم حذف الموظف بنجاح');
    }
  };

  const filteredEmployees = employees.filter(
    e =>
      e.name.includes(searchTerm) ||
      e.position.includes(searchTerm) ||
      e.phone.includes(searchTerm)
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة الموظفين</h1>
          <p className="text-gray-600 mt-1">إدارة بيانات الموظفين والرواتب</p>
        </div>
        <button
          onClick={() => {
            setFormData({
              name: '',
              position: '',
              salary: 0,
              joinDate: '',
              phone: '',
            });
            setEditingId(null);
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
        >
          <Plus size={20} />
          <span>إضافة موظف</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute right-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="ابحث بالاسم أو الوظيفة..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {editingId ? 'تعديل الموظف' : 'إضافة موظف جديد'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اسم الموظف *
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
                الوظيفة *
              </label>
              <select
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">اختر وظيفة</option>
                <option value="عامل إنتاج">عامل إنتاج</option>
                <option value="كاشير">كاشير</option>
                <option value="مستودع">مستودع</option>
                <option value="مدير">مدير</option>
                <option value="مشرف">مشرف</option>
                <option value="أخرى">أخرى</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الراتب الشهري
              </label>
              <input
                type="number"
                step="0.01"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                تاريخ التعيين *
              </label>
              <input
                type="date"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="md:col-span-2">
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

      {/* Employees Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredEmployees.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {employees.length === 0 ? 'لا توجد موظفين حتى الآن' : 'لا توجد نتائج مطابقة'}
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
                    الوظيفة
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    الراتب الشهري
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    تاريخ التعيين
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    الهاتف
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {employee.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{employee.position}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      ج.م {employee.salary}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(employee.joinDate).toLocaleDateString('ar-EG')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{employee.phone}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(employee)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(employee.id)}
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
