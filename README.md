FakeStore TypeScript Svelte App
===============================

This project is a single-page application (SPA) developed using Svelte, Tailwind, and TypeScript. It retrieves product data from the FakeStoreAPI and provides various features for users to browse and shop for products.

Features
--------

1.  **Product Display:** Products are displayed in a grid format, showing relevant information such as name, price, and image.

2.  **Product Filtering:** Users can filter products by category using a  clickable category links.

3.  **Pagination and Infinite Scrolling:** The product list supports both pagination and infinite scrolling for seamless browsing.

4.  **Product Details Page:** Clicking on a product shows detailed information about that product on a separate page.

5.  **Shopping Cart:** Users can add products to their shopping cart and remove them as needed. The shopping cart state is stored using local storage, ensuring persistent cart data even after page refresh.

6.  **Search Functionality:** A search bar allows users to search for products by name or description, providing a quick way to find specific items.

7.  **Advanced Filtering and Sorting:** Additional filtering options such as price range and rating, along with sorting options by price and popularity, enhance the browsing experience.

Development Process
-------------------

-   **Version Control:** Git was used throughout the development process, ensuring atomic commits and easy collaboration.

Deployment
----------

The project is deployed using Netlify and features a CI/CD pipeline set up through GitHub. Any changes pushed to the main branch automatically trigger deployment, ensuring seamless updates for users.

Getting Started
---------------

1.  Clone the repository:

    

    `git clone https://github.com/IamKishan08/fakestore.git`

2.  Install dependencies:

    

    

    `cd fakestore`
    `npm install`

3.  Run the development server:

    

    `npm run dev`

4.  Open your browser and navigate to `http://localhost:5173` to view the application.
