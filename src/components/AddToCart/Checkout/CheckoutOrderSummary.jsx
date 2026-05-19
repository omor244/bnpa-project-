import { ShieldCheck } from 'lucide-react';
import React from 'react';

const CheckoutOrderSummary = ({cartItems, subtotal, selectedSpeed, shippingCost, orderTotal, vatIncluded  }) => {
    return (
        <div>
            <div className="bg-white border border-slate-200 rounded-md shadow-sm p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Order Summary</h2>
                    <span className="text-xs text-slate-500 font-semibold">
                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                    </span>
                </div>

                {/* Cart List Pipeline */}
                {cartItems.length === 0 ? (
                    <p className="text-xs text-slate-400 py-4 text-center">Your shopping cart is empty.</p>
                ) : (
                    <div className="space-y-4 max-h-[260px] overflow-y-auto pr-1">
                        {cartItems.map((item) => {
                            const parsedPrice = parseFloat(item.price || 0);
                            return (
                                <div key={item._id || item.id} className="flex gap-4 items-start text-xs border-b border-slate-100 pb-3">
                                    <img
                                        src={item.photo || item.image || "https://via.placeholder.com/150"}
                                        alt={item.title}
                                        className="w-14 h-14 rounded border object-cover bg-slate-50"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-slate-800 line-clamp-2 leading-tight">{item.title}</h3>
                                        {item.sku && <p className="text-[10px] text-slate-400 mt-1">SKU: {item.sku}</p>}
                                        {item.category && <p className="text-[10px] text-slate-500">Category: {item.category}</p>}
                                    </div>
                                    <div className="text-right whitespace-nowrap">
                                        <span className="font-bold text-slate-900">৳{parsedPrice.toFixed(2)}</span>
                                        <p className="text-[10px] text-slate-400 mt-0.5">QTY {item.quantity || 1}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Financial Summary Calculation Panel */}
                <div className="space-y-2 border-b border-slate-100 pb-3 text-xs text-slate-600">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-bold">৳{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="capitalize">Delivery Fee ({selectedSpeed})</span>
                        <span className="font-bold">৳{shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 italic text-[11px]">
                        <span>Govt VAT (5% included)</span>
                        <span>(৳{vatIncluded.toFixed(2)})</span>
                    </div>
                </div>

                {/* Aggregate Invoice Display */}
                <div className="flex justify-between items-baseline pt-1">
                    <span className="text-sm font-bold text-slate-900">Total payable</span>
                    <span className="text-2xl font-black text-slate-900 tracking-tight">৳{orderTotal.toFixed(2)}</span>
                </div>

                <button
                    type="submit"
                    disabled={cartItems.length === 0}
                    className="w-full bg-[#26bba4] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-md shadow hover:cursor-pointer hover:bg-[#1fa38e] transition active:scale-[0.99]"
                >
                    Proceed to Secure Payment
                </button>

                <div className="text-center pt-3 space-y-3">
                    
                    <div className="mt-4">
                        <img
                            className="w-full h-auto rounded-lg"
                            src="https://i.ibb.co.com/3yNhQpMR/Whats-App-Image-2026-04-21-at-3-00-18-PM.jpg"
                            alt="Payment Methods Bangladesh"
                        />
                    </div>

                    {/* Security Verification Subtext */}
                    <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Encrypted & Secured Payment
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CheckoutOrderSummary;