# Bean-Boutique

Bean-Boutique is a front-end coffee shop website showcasing a variety of coffee seeds, delicious coffee varieties, and coffee brewing machines. This project focuses on frontend logic and visualization, providing a rich user experience without backend support.

## Features

- Home page with featured coffee products and promotions
- Product listing and detailed product pages
- Shopping cart functionality
- Search functionality for products
- Event and booking pages for coffee-related events
- Contact and subscription pages
- Responsive design for desktop and mobile devices
- Interactive UI elements powered by JavaScript
- Image sliders/carousels using Swiper.js library

## Technologies Used

- HTML5 for page structure
- CSS3 for styling and responsive design
- JavaScript (ES6) for frontend logic and interactivity
- Swiper.js for image sliders and carousels
- Live-server for local development server

## Project Structure

```
Bean-Boutique/
│
├── assets/                 # Images, icons, and rating assets
├── data/                   # JSON data files (e.g., product data)
├── scripts/                # JavaScript files for various functionalities
│   ├── cart.js
│   ├── index.js
│   ├── main.js
│   ├── product.js
│   ├── products.js
│   ├── search.js
│   └── script.js
├── style.css               # Main stylesheet
├── home-page.html          # Home page
├── products.html           # Product listing page
├── product.html            # Product detail page
├── cart-page.html          # Shopping cart page
├── search-page.html        # Search results page
├── event.html              # Event information page
├── booking.html            # Booking page for events
├── contact-us.html         # Contact page
├── subscription.html       # Subscription page
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. Clone the repository or download the project files.
2. Navigate to the project directory in your terminal.
3. Install dependencies:

```bash
npm install
```

### Running the Project Locally

Start the local development server with:

```bash
npm run start
```

This will launch the site in your default browser, opening the home page (`home-page.html`).

### Development

- Modify HTML files to update page content and structure.
- Update `style.css` for styling changes.
- Edit JavaScript files in the `scripts/` folder to change frontend behavior.
- Add or update assets in the `assets/` folder as needed.
- Product and other data can be managed in `data/data.json`.

## Dependencies

- [Swiper.js](https://swiperjs.com/) - Used for image sliders and carousels.
- [Live-server](https://www.npmjs.com/package/live-server) - Development server for live reloading.

## License

This project is licensed under the ISC License.
