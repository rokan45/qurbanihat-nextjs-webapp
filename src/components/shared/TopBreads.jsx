import React from 'react';

const TopBreads = () => {
    return (
        <div>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-10">
                    <h2 className="section-title">Top Breeds for Qurbani</h2>
                    <p className="section-subtitle">Most popular breeds chosen by Bangladeshi families</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { name: "Deshi Cow", emoji: "🐄", type: "Cow", note: "Widely available" },
                        { name: "Friesian Cross", emoji: "🐂", type: "Cow", note: "Heavy weight" },
                        { name: "Black Bengal", emoji: "🐐", type: "Goat", note: "Most popular goat" },
                        { name: "Jamuna Pari", emoji: "🐑", type: "Goat", note: "Large body size" },
                    ].map((breed) => (
                        <div
                            key={breed.name}
                            className="bg-white border border-gray-100 rounded-xl p-5 text-center shadow-sm hover:border-primary hover:shadow-md transition-all"
                        >
                            <div className="text-4xl mb-3">{breed.emoji}</div>
                            <h4 className="font-semibold text-gray-900 text-sm">{breed.name}</h4>
                            <p className="text-xs text-primary mt-1">{breed.type}</p>
                            <p className="text-xs text-gray-400 mt-1">{breed.note}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default TopBreads;