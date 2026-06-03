import { CheckCircle, ShieldCheck, Star } from 'lucide-react';
import React from 'react';

const Quality = () => {
    return (
        <div>
            <section className="bg-primary text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="font-heading text-2xl font-bold mb-2">Why Choose QurbaniHat?</h2>
                        <p className="text-green-200 text-sm">Trusted by thousands of families across Bangladesh</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: <Star size={22} />, title: "Verified Sellers", desc: "All sellers are verified through our strict screening process." },
                            { icon: <ShieldCheck size={22} />, title: "Secure Booking", desc: "Your booking data is protected and your payments are safe." },
                            { icon: <CheckCircle size={22} />, title: "Quality Assured", desc: "Every animal listing is reviewed for accuracy and health documentation." },
                        ].map((item) => (
                            <div key={item.title} className="flex gap-4">
                                <div className="text-accent shrink-0 mt-1">{item.icon}</div>
                                <div>
                                    <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                                    <p className="text-sm text-green-200">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Quality;