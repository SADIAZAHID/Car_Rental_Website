const cars = [
  {
    id: 'c01', name: 'Toyota Corolla Altis', category: 'Sedan',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80',
    pricePerDay: 8500, fuelType: 'Petrol', transmission: 'Automatic', seats: 5, rating: 4.6, available: true,
    description: 'A dependable mid-size sedan with a smooth ride, great fuel economy, and plenty of boot space for a family trip or a business commute.'
  },
  {
    id: 'c02', name: 'Honda Civic RS', category: 'Sedan',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80',
    pricePerDay: 10000, fuelType: 'Petrol', transmission: 'Automatic', seats: 5, rating: 4.7, available: true,
    description: 'Sporty styling meets everyday comfort. The Civic RS is a favourite for city driving with a bit of personality.'
  },
  {
    id: 'c03', name: 'Suzuki Alto VXL', category: 'Hatchback',
    image: 'https://images.unsplash.com/photo-1541348263662-e068662d82af?auto=format&fit=crop&w=800&q=80',
    pricePerDay: 4000, fuelType: 'Petrol', transmission: 'Manual', seats: 4, rating: 4.2, available: true,
    description: 'Light, easy to park, and easy on the wallet. Ideal for quick errands and short city hops.'
  },
  {
    id: 'c04', name: 'Toyota Fortuner', category: 'SUV',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    pricePerDay: 22000, fuelType: 'Diesel', transmission: 'Automatic', seats: 7, rating: 4.8, available: false,
    description: 'A full-size SUV built for long highway drives and rougher roads, with room for the whole family and their luggage.'
  },
  {
    id: 'c05', name: 'Kia Sportage', category: 'SUV',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80',
    pricePerDay: 12000, fuelType: 'Petrol', transmission: 'Automatic', seats: 5, rating: 4.5, available: true,
    description: 'A compact SUV with a raised driving position, generous cabin tech, and confident handling on motorways.'
  },
  {
    id: 'c06', name: 'Hyundai Elantra', category: 'Sedan',
    image: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=800&q=80',
    pricePerDay: 9000, fuelType: 'Petrol', transmission: 'Automatic', seats: 5, rating: 4.4, available: true,
    description: 'Clean, modern lines and a quiet cabin make the Elantra a relaxed choice for longer intercity trips.'
  },
  {
    id: 'c07', name: 'Suzuki Bolan', category: 'Van',
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80',
    pricePerDay: 6000, fuelType: 'Petrol', transmission: 'Manual', seats: 8, rating: 4.0, available: true,
    description: 'A practical van for group travel or moving cargo, with flexible seating and an easy-to-drive footprint.'
  },
  {
    id: 'c08', name: 'Tesla Model 3', category: 'Electric',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80',
    pricePerDay: 18000, fuelType: 'Electric', transmission: 'Automatic', seats: 5, rating: 4.9, available: true,
    description: 'Zero tailpipe emissions, instant torque, and a minimalist cabin built around a single central display.'
  },
  {
    id: 'c09', name: 'Honda BR-V', category: 'SUV',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    pricePerDay: 11000, fuelType: 'Petrol', transmission: 'Automatic', seats: 7, rating: 4.3, available: false,
    description: 'A seven-seat crossover that balances SUV practicality with sedan-like running costs.'
  },
  {
    id: 'c10', name: 'BMW 3 Series', category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    pricePerDay: 25000, fuelType: 'Petrol', transmission: 'Automatic', seats: 5, rating: 4.9, available: true,
    description: 'Precision handling and a premium cabin for clients, special occasions, or simply a treat on the open road.'
  },
  {
    id: 'c11', name: 'Suzuki Cultus', category: 'Hatchback',
    image: 'https://images.unsplash.com/photo-1471479917193-f00955256257?auto=format&fit=crop&w=800&q=80',
    pricePerDay: 5000, fuelType: 'Petrol', transmission: 'Manual', seats: 5, rating: 4.1, available: true,
    description: 'A well-rounded hatchback that is cheap to run and simple to drive, great for first-time renters.'
  },
  {
    id: 'c12', name: 'Audi Q5', category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80',
    pricePerDay: 30000, fuelType: 'Petrol', transmission: 'Automatic', seats: 5, rating: 4.8, available: true,
    description: 'A premium SUV with quattro all-wheel drive and a refined cabin, built for comfort on any terrain.'
  },
];

export const categories = ['All', ...new Set(cars.map((car) => car.category))];

export default cars;