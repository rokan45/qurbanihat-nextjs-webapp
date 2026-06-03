import React from 'react';

const QurbaniTips = () => {
    return (
        <div>
            <section className="bg-surface-dark py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="section-title">Qurbani Tips</h2>
                        <p className="section-subtitle">Important guidelines before booking your animal</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <ShieldCheck className="text-primary" size={28} />,
                                title: "Check Animal Health",
                                desc: "Always verify the animal is healthy, active, and free from any visible diseases or injuries. Ask for vaccination records.",
                            },
                            {
                                icon: <CheckCircle className="text-primary" size={28} />,
                                title: "Age & Weight Verification",
                                desc: "Ensure the animal meets the minimum age requirement. Cows must be at least 2 years old, goats at least 1 year.",
                            },
                            {
                                icon: <Truck className="text-primary" size={28} />,
                                title: "Arrange Transport Early",
                                desc: "Book transportation well in advance as demand spikes near Eid. Many sellers offer delivery for an additional fee.",
                            },
                        ].map((tip) => (
                            <div key={tip.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="mb-4">{tip.icon}</div>
                                <h3 className="font-heading font-semibold text-gray-900 mb-2">{tip.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{tip.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default QurbaniTips;