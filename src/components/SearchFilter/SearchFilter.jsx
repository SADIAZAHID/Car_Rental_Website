import './SearchFilter.css';
import { formatPKR } from '../../utils/currency';

export default function SearchFilter({
    query, onQueryChange, category, categories, onCategoryChange,
    maxPrice, onMaxPriceChange, sortBy, onSortChange,
    availableOnly, onAvailableOnlyChange, resultCount,
}) {
    return (
        <div className="search-filter">
            <div className="search-filter__row">
                <div className="search-filter__search">
                    <span aria-hidden="true">🔍</span>
                    <input
                        type="search"
                        placeholder="Search by name or model, e.g. Civic"
                        value={query}
                        onChange={(e) => onQueryChange(e.target.value)}
                        aria-label="Search cars by name or model"
                    />
                </div>

                <select value={category} onChange={(e) => onCategoryChange(e.target.value)} aria-label="Filter by category">
                    {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>

                <select value={sortBy} onChange={(e) => onSortChange(e.target.value)} aria-label="Sort cars">
                    <option value="default">Sort: Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-desc">Rating: Best first</option>
                </select>
            </div>

            <div className="search-filter__row search-filter__row--secondary">
                <div className="search-filter__slider">
                    <label htmlFor="maxPrice">Max price: {formatPKR(maxPrice)}/day</label>
                    <input
                        id="maxPrice"
                        type="range"
                        min="3000"
                        max="35000"
                        step="500"
                        value={maxPrice}
                        onChange={(e) => onMaxPriceChange(Number(e.target.value))}
                    />
                </div>

                <label className="search-filter__checkbox">
                    <input
                        type="checkbox"
                        checked={availableOnly}
                        onChange={(e) => onAvailableOnlyChange(e.target.checked)}
                    />
                    Available only
                </label>

                <span className="search-filter__count">
                    {resultCount} {resultCount === 1 ? 'car' : 'cars'} found
                </span>
            </div>
        </div>
    );
}