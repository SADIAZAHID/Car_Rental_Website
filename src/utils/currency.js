const pkrFormatter = new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    currencyDisplay: 'code',
});

export function formatPKR(amount) {
    return pkrFormatter.format(amount);
}
