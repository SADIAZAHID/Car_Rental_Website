import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cars from '../../data/cars';
import { useBookings } from '../../context/BookingContext';
import { formatPKR } from '../../utils/currency';
import { isRequired, isValidEmail, isValidPhone, isFutureOrToday, isAfterDate } from '../../utils/validation';
import './BookingForm.css';

const initialForm = {
    fullName: '', email: '', phone: '', carId: '', pickupDate: '', returnDate: '', notes: '',
};

export default function BookingForm({ defaultCarId = '' }) {
    const [form, setForm] = useState({ ...initialForm, carId: defaultCarId });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(null);
    const { addBooking } = useBookings();
    const navigate = useNavigate();

    const availableCars = useMemo(() => cars.filter((c) => c.available), []);
    const selectedCar = cars.find((c) => c.id === form.carId);

    const days =
        form.pickupDate && form.returnDate && isAfterDate(form.returnDate, form.pickupDate)
            ? Math.ceil((new Date(form.returnDate) - new Date(form.pickupDate)) / (1000 * 60 * 60 * 24))
            : 0;

    const estimatedTotal = selectedCar && days > 0 ? selectedCar.pricePerDay * days : 0;

    function update(field, value) {
        setForm((f) => ({ ...f, [field]: value }));
        setErrors((e) => ({ ...e, [field]: undefined }));
    }

    function validate() {
        const next = {};
        if (!isRequired(form.fullName)) next.fullName = 'Please enter your full name.';
        else if (form.fullName.trim().length < 3) next.fullName = 'Name looks too short.';

        if (!isRequired(form.email)) next.email = 'Please enter your email.';
        else if (!isValidEmail(form.email)) next.email = 'Enter a valid email address.';

        if (!isRequired(form.phone)) next.phone = 'Please enter a contact number.';
        else if (!isValidPhone(form.phone)) next.phone = 'Enter a valid phone number.';

        if (!isRequired(form.carId)) next.carId = 'Please choose a car.';

        if (!isRequired(form.pickupDate)) next.pickupDate = 'Select a pickup date.';
        else if (!isFutureOrToday(form.pickupDate)) next.pickupDate = 'Pickup date cannot be in the past.';

        if (!isRequired(form.returnDate)) next.returnDate = 'Select a return date.';
        else if (form.pickupDate && !isAfterDate(form.returnDate, form.pickupDate))
            next.returnDate = 'Return date must be after the pickup date.';

        setErrors(next);
        return Object.keys(next).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;

        const record = addBooking({
            ...form,
            carName: selectedCar?.name,
            pricePerDay: selectedCar?.pricePerDay,
            totalDays: days,
            estimatedTotal,
        });

        setSubmitted(record);
        setForm(initialForm);
    }

    if (submitted) {
        return (
            <div className="booking-form__success">
                <div className="booking-form__success-icon">✓</div>
                <h3>Booking request sent</h3>
                <p>
                    Thanks, {submitted.fullName.split(' ')[0]}. Your request for{' '}
                    <strong>{submitted.carName}</strong> has been received. We'll confirm availability
                    and contact you at <strong>{submitted.email}</strong> shortly.
                </p>
                <div className="booking-form__success-actions">
                    <button className="btn btn-outline" onClick={() => setSubmitted(null)}>
                        Book Another Car
                    </button>
                    <button className="btn btn-primary" onClick={() => navigate('/history')}>
                        View My Bookings
                    </button>
                </div>
            </div>
        );
    }

    return (
        <form className="booking-form" onSubmit={handleSubmit} noValidate>
            <div className="row-2">
                <div className={`field ${errors.fullName ? 'has-error' : ''}`}>
                    <label htmlFor="fullName">Full name</label>
                    <input id="fullName" type="text" placeholder="e.g. Sadia Zahid" value={form.fullName}
                        onChange={(e) => update('fullName', e.target.value)} />
                    {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>

                <div className={`field ${errors.phone ? 'has-error' : ''}`}>
                    <label htmlFor="phone">Phone number</label>
                    <input id="phone" type="tel" placeholder="e.g. +92 300 1234567" value={form.phone}
                        onChange={(e) => update('phone', e.target.value)} />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
            </div>

            <div className={`field ${errors.email ? 'has-error' : ''}`}>
                <label htmlFor="email">Email address</label>
                <input id="email" type="email" placeholder="you@example.com" value={form.email}
                    onChange={(e) => update('email', e.target.value)} />
                {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className={`field ${errors.carId ? 'has-error' : ''}`}>
                <label htmlFor="carId">Choose a car</label>
                <select id="carId" value={form.carId} onChange={(e) => update('carId', e.target.value)}>
                    <option value="">Select an available car</option>
                    {availableCars.map((car) => (
                        <option key={car.id} value={car.id}>
                            {car.name} — {formatPKR(car.pricePerDay)}/day
                        </option>
                    ))}
                </select>
                {errors.carId && <span className="error-text">{errors.carId}</span>}
            </div>

            <div className="row-2">
                <div className={`field ${errors.pickupDate ? 'has-error' : ''}`}>
                    <label htmlFor="pickupDate">Pickup date</label>
                    <input id="pickupDate" type="date" value={form.pickupDate}
                        onChange={(e) => update('pickupDate', e.target.value)} />
                    {errors.pickupDate && <span className="error-text">{errors.pickupDate}</span>}
                </div>

                <div className={`field ${errors.returnDate ? 'has-error' : ''}`}>
                    <label htmlFor="returnDate">Return date</label>
                    <input id="returnDate" type="date" value={form.returnDate}
                        onChange={(e) => update('returnDate', e.target.value)} />
                    {errors.returnDate && <span className="error-text">{errors.returnDate}</span>}
                </div>
            </div>

            <div className="field">
                <label htmlFor="notes">Notes (optional)</label>
                <textarea id="notes" rows="3" placeholder="Anything we should know? Airport pickup, child seat, etc."
                    value={form.notes} onChange={(e) => update('notes', e.target.value)} />
            </div>

            {selectedCar && (
                <div className="booking-form__summary">
                    <div>
                        <span>Selected car</span>
                        <strong>{selectedCar.name}</strong>
                    </div>
                    <div>
                        <span>Duration</span>
                        <strong>{days > 0 ? `${days} day${days > 1 ? 's' : ''}` : '—'}</strong>
                    </div>
                    <div>
                        <span>Estimated total</span>
                        <strong>{estimatedTotal > 0 ? formatPKR(estimatedTotal) : '—'}</strong>
                    </div>
                </div>
            )}

            <button type="submit" className="btn btn-primary btn-block">
                Submit Booking Request
            </button>
        </form>
    );
}