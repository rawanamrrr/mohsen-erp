'use client';

import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import {
  addToCart,
  removeFromCart,
  clearCart,
  createInvoice,
} from '@/lib/slices/salesSlice';
import { Printer, X, Plus, Minus } from 'lucide-react';

export default function POSPage() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.inventory.products);
  const { currentCart } = useSelector((state: RootState) => state.sales);
  const customers = useSelector((state: RootState) => state.customers.customers);

  const [barcodeInput, setBarcodeInput] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('عميل نقدي');
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('نقد');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const barcodeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    barcodeRef.current?.focus();
  }, []);

  const handleBarcodeScan = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const product = products.find(
        p => p.barcode === barcodeInput || p.sku === barcodeInput
      );
      if (product) {
        dispatch(
          addToCart({
            productId: product.id,
            quantity: 1,
            price: product.salePrice,
            total: product.salePrice,
          })
        );
        setBarcodeInput('');
        barcodeRef.current?.focus();
      } else {
        alert('المنتج غير موجود');
        setBarcodeInput('');
      }
    }
  };

  const handleAddProduct = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      dispatch(
        addToCart({
          productId: product.id,
          quantity: 1,
          price: product.salePrice,
          total: product.salePrice,
        })
      );
    }
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    const product = products.find(p => p.id === productId);
    if (product) {
      dispatch(
        addToCart({
          productId: product.id,
          quantity,
          price: product.salePrice,
          total: product.salePrice * quantity,
        })
      );
    }
  };

  const subtotal = currentCart.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.14;
  const total = subtotal + tax - discount;

  const handleCompletePayment = () => {
    if (currentCart.length === 0) {
      alert('السلة فارغة');
      return;
    }

    const invoice = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      customer: selectedCustomer,
      items: currentCart,
      subtotal,
      tax,
      discount,
      total,
      paymentMethod,
      status: 'completed' as const,
    };

    dispatch(createInvoice(invoice));
    setShowPaymentModal(false);
    setDiscount(0);
    setBarcodeInput('');
    barcodeRef.current?.focus();
    alert('تم إتمام الفاتورة بنجاح');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Products and Barcode Input */}
        <div className="lg:col-span-2">
          {/* Barcode Scanner */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ماسح الباركود
            </label>
            <input
              ref={barcodeRef}
              type="text"
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              onKeyDown={handleBarcodeScan}
              placeholder="امسح الباركود هنا..."
              className="w-full px-4 py-3 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-0"
              autoComplete="off"
            />
          </div>

          {/* Products Grid */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">المنتجات</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleAddProduct(product.id)}
                  className="p-3 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-colors text-center"
                >
                  <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                  <p className="text-xs text-gray-600 mt-1">ج.م {product.salePrice}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {product.quantity > 0 ? `${product.quantity} متاح` : 'نفد'}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Cart and Summary */}
        <div className="space-y-4">
          {/* Customer Selection */}
          <div className="bg-white rounded-lg shadow p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              العميل
            </label>
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              {customers.map((customer) => (
                <option key={customer.id} value={customer.name}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          {/* Cart Items */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">سلة المشتريات</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {currentCart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">السلة فارغة</p>
              ) : (
                currentCart.map((item) => {
                  const product = products.find(p => p.id === item.productId);
                  return (
                    <div key={item.productId} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-900">
                          {product?.name}
                        </p>
                        <button
                          onClick={() => handleRemoveItem(item.productId)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.productId, item.quantity - 1)
                            }
                            className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                          >
                            <Minus size={14} />
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(item.productId, parseInt(e.target.value) || 1)
                            }
                            className="w-12 px-2 py-1 border border-gray-300 rounded text-center"
                            min="1"
                          />
                          <button
                            onClick={() =>
                              handleQuantityChange(item.productId, item.quantity + 1)
                            }
                            className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">
                          ج.م {item.total}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-blue-900 text-white rounded-lg shadow p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span>الإجمالي قبل الضريبة</span>
              <span>ج.م {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>الضريبة (14%)</span>
              <span>ج.م {tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>الخصم</span>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                className="w-24 px-2 py-1 text-gray-900 rounded text-right"
              />
            </div>
            <div className="border-t border-blue-700 pt-3 flex justify-between text-xl font-bold">
              <span>الإجمالي</span>
              <span>ج.م {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              طريقة الدفع
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="نقد">نقد</option>
              <option value="فيزا">فيزا</option>
              <option value="شيك">شيك</option>
              <option value="تحويل بنكي">تحويل بنكي</option>
              <option value="آجل">آجل</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={() => setShowPaymentModal(true)}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold transition-colors"
            >
              الدفع والإنهاء
            </button>
            <button
              onClick={() => {
                dispatch(clearCart());
                setDiscount(0);
                setBarcodeInput('');
                barcodeRef.current?.focus();
              }}
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 text-sm transition-colors"
            >
              إلغاء الفاتورة
            </button>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-sm transition-colors">
              <Printer size={16} />
              <span>طباعة (F2)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold text-gray-900 mb-4">تأكيد الدفع</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span>الإجمالي</span>
                <span className="font-bold">ج.م {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>طريقة الدفع</span>
                <span className="font-bold">{paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>العميل</span>
                <span className="font-bold">{selectedCustomer}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCompletePayment}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-semibold"
              >
                تأكيد الدفع
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
