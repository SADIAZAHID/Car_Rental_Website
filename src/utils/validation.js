export function isRequired(value) {
    return value !== undefined && value !== null && String(value).trim().length > 0;
}

export function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidPhone(value) {
    const digits = value.replace(/\D/g, '');
    return /^[\d\s+()-]+$/.test(value) && digits.length >= 7;
}

export function isFutureOrToday(dateStr) {
    if (!dateStr) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(dateStr);
    return date >= today;
}

export function isAfterDate(endStr, startStr) {
    if (!endStr || !startStr) return false;
    return new Date(endStr) > new Date(startStr);
}

export function minLength(value, length) {
    return String(value || '').length >= length;
}