# DriveNow Documentation

## Project Objective
The goal is to deliver a Complete, production-quality frontend solution for a fictional Car Rental Management System called "DriveNow". The objective emphasizes a robust and aesthetic design adhering specifically to the requested "Asphalt & Headlight" theme, without leveraging CSS frameworks, whilst maintaining logical file structures and React state.

## Design Rationale
- **Colors**: The palette incorporates `#14171c` (dark asphalt) providing a sleek canvas, enhanced by cool concrete grays. Accents are brought out with `#f2a93b` (headlight gold) ensuring CTAs draw attention effectively. Success/Alert states use standard teal and red to complement this without clashing.
- **Typography**: 
  - *Oswald* (Headings): Chosen to emulate license plates and bold industrial aesthetics.
  - *Inter* (Body): Optimizes readability across digital mediums.
  - *Space Mono* (Specs/Prices): Represents a digital-odometer to infuse subtle automotive characteristics.
- **Signature Element**: A custom CSS `route-line` divider component acts as a dashed road marking, setting the tone for a driving adventure instead of a conventional horizontal rule `<hr>`.

## Explanation of Features
- **Context Ecosystem**: The app uses `ThemeContext`, `AuthContext`, and `BookingContext`. All contexts map deeply into `localStorage` allowing the simulated data to survive browser refreshes seamlessly.
- **Dynamic CSS**: Utilizing a central token system via CSS variables, toggling `data-theme` on the `html` tag updates all layouts globally without recomputing elements.

## Data Flow
State originates in the Context API wrapping the application. Pages (`Home`, `Cars`, `Login`, etc.) consume data (like themes, currentUser, and bookings) directly through custom hooks, bypassing prop-drilling. Write mutations cascade down to localStorage side-effects embedded in the contexts.

## Known Limitations
- The car listing data is static. Advanced mutations beyond localStorage updates aren't pushed to an actual backend.
- Booking forms have standard DOM/React validations with inline alerts, but lack real-time API integrations.
- Not all pages (e.g., specific sub-details or intricate Admin charts) have been completely extrapolated with all permutations since this serves as an MVP assignment.

## Testing
- Build was compiled utilizing `vite build` validating component trees.
- React Router paths and simulated 404 boundaries tested effectively.
- Interactions checked spanning desktop layouts downwards to constrained viewports.
