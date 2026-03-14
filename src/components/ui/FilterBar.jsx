import React, { useState } from 'react';

export default function FilterBar({ items, filterKey, allLabel, onFilter }) {
  const [active, setActive] = useState(null);
  const categories = [...new Set(items.map((item) => item[filterKey]).filter(Boolean))];

  function handleSelect(val) {
    setActive(val);
    onFilter && onFilter(val);
  }

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter options">
      <button
        onClick={() => handleSelect(null)}
        className={`px-4 py-2 text-sm rounded-full border transition-colors min-h-[44px] ${!active ? 'bg-navy text-white border-navy' : 'bg-white text-gray-600 border-gray-200 hover:border-navy hover:text-navy'}`}
      >
        {allLabel || 'All'}
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleSelect(cat)}
          className={`px-4 py-2 text-sm rounded-full border transition-colors min-h-[44px] ${active === cat ? 'bg-navy text-white border-navy' : 'bg-white text-gray-600 border-gray-200 hover:border-navy hover:text-navy'}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
