import React from "react";

const FilterSort = ({filterCategory, setFilterCategory, categories, sortBy, setSortBy}) => {
  return (
    <div>
      <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
        <option>All</option>
        <option>Personal</option>
        <option>Work</option>
        <option>Urgent</option>
        {categories.map((c) => (
          <option key={c._id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="newest">Newest</option>
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
      </select>
    </div>
  );
};

export default FilterSort;
