# **App Name**: ServiceConnect

## Core Features:

- User Authentication: User registration and login for customers and service providers with a two-step registration form.
- Job Posting: Post a new job request including service type, optional description, preferred date, and location.
- Quote Display: Display a list of quotes with service title, scheduled date, quoted price, and accept/decline buttons.
- Booking Management: List confirmed and completed jobs under the Bookings tab.
- Smart Pricing: AI-powered tool to suggest optimal pricing for service providers based on job details and market trends.

## Style Guidelines:

- Primary color: White or light grey for a clean background.
- Secondary color: Dark grey or black for text to ensure readability.
- Accent: Teal (#008080) for buttons and interactive elements.
- Clean and modern sans-serif typeface for all text elements.
- Use simple, line-based icons for navigation and actions.
- Consistent padding and margins to maintain visual balance.
- Subtle transitions and animations for a smooth user experience.

## Original User Request:
Here’s a clean, detailed prompt with all necessary information extracted from your FlutterFlow layout designs. It's structured for a React Native developer or team to implement the **SeekerPal** project effectively, without emojis, partitions, or image mentions.

---

**Project Prompt: SeekerPal – Service Booking App using React Native**

The goal is to develop a cross-platform mobile application named **SeekerPal** using React Native. The app connects customers with service providers for basic tasks such as carpentry, plumbing, electrical work, housekeeping, and more. Customers can post service requests, and service providers can submit quotes. The customer selects the most satisfactory quote, ideally the lowest, and that provider is booked for the job.

**Target Users and Roles:**

1. **Customer (Seeker)** – Individuals looking for basic services. They should be able to register, log in, submit service requests, receive quotes, and confirm bookings.

2. **Service Provider (Helper)** – Professionals offering services. They should be able to register, view available jobs, quote for them, and get hired based on customer selection.

**Authentication Flow:**

- Registration is a two-step form:
  - Step 1 collects Full Name, Phone Number, Business Name, and a dropdown for selecting service type (example: Tuition, Plumbing, etc.)
  - Step 2 collects Location, Password, and Confirm Password. Both password fields should have visibility toggle icons and proper validation.

- Login screen requires Phone Number and Password with a link to switch to registration for new users.

- Auth screens should use a modern gradient background, clean typography, and rounded input boxes with a consistent layout.

**Post-Login Interface (Customer View):**

- A welcome message should be displayed, followed by a list of service quotes.
- Each service card should display:
  - Service Title (e.g., Window Cleaning, Kitchen Cleaning)
  - Scheduled Date (e.g., 5 Dec, 24)
  - Quoted Price
  - Two buttons: Accept and Decline
- A “See all” link at the top should navigate to a detailed quotes view.
- Cards should follow a uniform design with an image placeholder, clear typography, and primary/secondary buttons styled distinctly.
- A bottom navigation bar should include tabs: Home, Bookings, Quotes, and Logout, with active and inactive states styled clearly.

**Core Functionalities for Customers:**

- Register and log in to the app
- Post a new job request (select service type, add optional description, preferred date and location)
- View quotes submitted by service providers
- Sort quotes by price (lowest first) and view provider details
- Accept or decline quotes
- View status of current and past bookings

**Core Functionalities for Service Providers:**

- Register with basic details, including business type and service category
- Log in to access available job requests
- View job requests relevant to their category
- Submit quotes for selected jobs
- Track status of quotes (pending, accepted, declined)
- Manage job bookings

**Navigation Structure:**

- Authentication Stack: Login, Register Step 1, Register Step 2
- Main App Stack (post-login):
  - Home: Displays available job requests and active interactions
  - Bookings: Shows confirmed and completed jobs
  - Quotes: List of quotes sent or received
  - Logout: Ends the session and redirects to login

**Technical Stack:**

- React Native for front-end development
- React Navigation for routing and screen transitions
- Firebase Authentication or a custom Node.js + Express backend for user management
- Firebase Firestore or MongoDB for storing job and user data
- Context API or Redux for state management
- Firebase Storage or Cloudinary if image uploads are later needed

**Optional Enhancements:**

- Real-time updates with WebSockets or Firestore listeners
- In-app messaging between customers and providers
- Ratings and reviews after job completion
- Push notifications for quote updates and booking confirmations
- Payment gateway integration for deposits or full payments

The app should focus on intuitive UX, clean and responsive UI, and reliable functionality. The UI design should match the minimalist, modern aesthetic as in the provided references, with smooth transitions and a user-friendly experience.
  