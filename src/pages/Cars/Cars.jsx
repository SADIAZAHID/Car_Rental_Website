import { useMemo, useState } from 'react';
import SearchFilter from '../../components/SearchFilter/SearchFilter';
import CarCard from '../../components/CarCard/CarCard';
import cars, { categories } from '../../data/cars';
import './Cars.css';

export default function Cars() {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('All');
    const [maxPrice, setMaxPrice] = useState(35000);
    const [sortBy, setSortBy] = useState('default');
    const [availableOnly, setAvailableOnly] = useState(false);

    const filtered = useMemo(() => {
        let list = cars.filter((car) => {
            const matchesQuery = car.name.toLowerCase().includes(query.trim().toLowerCase());
            const matchesCategory = category === 'All' || car.category === category;
            const matchesPrice = car.pricePerDay <= maxPrice;
            const matchesAvailability = !availableOnly || car.available;
            return matchesQuery && matchesCategory && matchesPrice && matchesAvailability;
        });

        if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.pricePerDay - b.pricePerDay);
        if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.pricePerDay - a.pricePerDay);
        if (sortBy === 'rating-desc') list = [...list].sort((a, b) => b.rating - a.rating);

        return list;
    }, [query, category, maxPrice, sortBy, availableOnly]);

    return (
        <div className="section cars-page">
            <div className="container">
                <div className="section-head">
                    <span className="eyebrow">Full fleet</span>
                    <h2>Find your car</h2>
                    <p>Search by model, filter by category or budget, and book straight from the card.</p>
                </div>

                <SearchFilter
                    query={query} onQueryChange={setQuery}
                    category={category} categories={categories} onCategoryChange={setCategory}
                    maxPrice={maxPrice} onMaxPriceChange={setMaxPrice}
                    sortBy={sortBy} onSortChange={setSortBy}
                    availableOnly={availableOnly} onAvailableOnlyChange={setAvailableOnly}
                    resultCount={filtered.length}
                />

                {filtered.length > 0 ? (
                    <div className="car-grid">
                        {filtered.map((car) => (
                            <CarCard car={car} key={car.id} />
                        ))}
                    </div>
                ) : (
                    <div className="cars-page__empty">
                        <h3>No cars match those filters</h3>
                        <p>Try widening the price range or clearing the search box.</p>
                    </div>
                )}
            </div>
        </div>
    );
}