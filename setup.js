const fs = require('fs');
const path = require('path');

const dirs = [
  'src/data',
  'src/context',
  'src/utils',
  'src/components/Navbar',
  'src/components/Footer',
  'src/components/Hero',
  'src/components/CarCard',
  'src/components/SearchFilter',
  'src/components/BookingForm',
  'src/components/RouteLine',
  'src/components/ProtectedRoute',
  'src/pages/Home',
  'src/pages/Cars',
  'src/pages/CarDetails',
  'src/pages/Booking',
  'src/pages/Login',
  'src/pages/Signup',
  'src/pages/BookingHistory',
  'src/pages/Admin',
  'src/pages/NotFound'
];

dirs.forEach(dir => {
  fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
});

console.log('Directories created');
