# Propgent (Real Estate Property Website)

A production-quality real estate property website built with Next.js 15, Tailwind CSS, and MongoDB. It strictly adheres to the provided Figma design to deliver a premium, fast, and responsive user experience.

## Features
- **No Authentication Required**: Public discovery website. No login, signup, or dashboards.
- **Figma Accurate**: Visually replicates the Figma design using custom tokens.
- **Dynamic Property Search**: Filter properties by location, type, price, etc., powered by MongoDB.
- **Property Enquiry System**: Users can submit an enquiry for a specific property without an account.
- **Responsive Design**: Works perfectly across Desktop, Tablet, and Mobile.
- **SEO & Performance**: Built with Next.js App Router for optimal SEO and speed.

## Technology Stack
- Next.js (App Router, Server Components)
- React
- TypeScript
- Tailwind CSS v4
- MongoDB (Mongoose)
- React Hook Form + Zod (Validation)

## Prerequisites
- Node.js (v18+)
- MongoDB connection URI

## Environment Variables

Create a `.env.local` file in the root of your project based on the `.env.example` file:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/propgent
MONGODB_DB=propgent
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Installation

```bash
npm install
```

## Database Seeding

To populate the database with realistic property data, run the seed script:

```bash
npm run seed
```

## Development

Run the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production Build

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Deployment

This project is perfectly optimized for deployment on **Vercel**.

### Vercel Dashboard Deployment (Recommended)
1. Push your code to a GitHub repository.
2. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New... > Project**.
3. Import your GitHub repository.
4. In the configuration settings, open the **Environment Variables** section and add the following:
   - `MONGODB_URI`: Your production MongoDB connection string.
   - `JWT_SECRET`: A secure random string for signing JWT tokens.
   - `ADMIN_USERNAME`: Your chosen admin username.
   - `ADMIN_PASSWORD`: Your chosen admin password.
   - `JWT_ACCESS_EXPIRY`: e.g. `15m`
   - `JWT_REFRESH_EXPIRY`: e.g. `7d`
5. Click **Deploy**. Vercel will automatically detect Next.js and deploy your application seamlessly!
