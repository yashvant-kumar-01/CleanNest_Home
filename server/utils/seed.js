const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const Review = require('../models/Review');
const Contact = require('../models/Contact');
const Article = require('../models/Article');

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cleannest');
};

const seedData = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB for seeding...');

    // Clear existing collections
    await User.deleteMany({});
    await Service.deleteMany({});
    await Booking.deleteMany({});
    await Review.deleteMany({});
    await Contact.deleteMany({});
    await Article.deleteMany({});

    console.log('Cleared existing data.');

    // 1. Create Users
    const adminUser = await User.create({
      name: 'Admin CleanNest',
      email: 'admin@cleannest.in',
      phone: '+91 98790 12345',
      password: 'Admin@123456',
      role: 'admin',
      address: {
        street: '402, Titanium Heights',
        area: 'SG Highway',
        city: 'Ahmedabad',
        pincode: '380015',
      },
    });

    const customerUser = await User.create({
      name: 'Rahul Patel',
      email: 'rahul.patel@gmail.com',
      phone: '+91 98250 88990',
      password: 'Customer@123456',
      role: 'customer',
      address: {
        street: 'B-402, Satellite Towers',
        area: 'Satellite',
        city: 'Ahmedabad',
        pincode: '380015',
      },
    });

    console.log('Created admin & customer users.');

    // 2. Create Services
    const servicesData = [
      {
        name: 'Home Deep Cleaning',
        slug: 'home-deep-cleaning',
        category: 'Home Cleaning',
        shortDescription: 'Complete, end-to-end deep sanitization and cleaning for your entire house or apartment in Ahmedabad.',
        description: 'Our flagship Home Deep Cleaning service transforms your home into a pristine, hygienic sanctuary. Our certified cleaning professionals use industrial-grade vacuums, eco-friendly steam sanitizers, and non-toxic solutions to eliminate deep grime, dust mites, grease, and allergens from every corner.',
        price: 2999,
        duration: '4 - 6 Hours',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80',
        includedItems: [
          'Deep scrubbing of floors, tiles, and skirting boards',
          'Dusting & wiping of walls, ceiling fans, light fixtures & switches',
          'Deep kitchen degreasing, cabinet cleaning & appliance exterior sanitization',
          'Bathroom descaling, anti-bacterial scrubbing & fixture polishing',
          'Window glass, frames, and grill cleaning',
          'Balcony deep wash & railing wiping',
        ],
        excludedItems: [
          'Interior of closed personal wardrobes/lockers unless requested',
          'Painting work or wall strain removal requiring chemical repainting',
          'Chandelier dismantling',
        ],
        packages: [
          {
            name: 'Basic (1 BHK / Studio)',
            price: 2499,
            duration: '3 - 4 Hours',
            features: ['1 Bedroom & Hall', '1 Kitchen', '1 Bathroom', 'Balcony Wash'],
          },
          {
            name: 'Standard (2 - 3 BHK)',
            price: 3499,
            duration: '4 - 5 Hours',
            features: ['Full 2/3 Bedrooms', 'Kitchen Degreasing', '2 Bathrooms', 'Fans & Windows'],
          },
          {
            name: 'Premium Villa (4+ BHK / Duplex)',
            price: 5499,
            duration: '6 - 7 Hours',
            features: ['Entire Large Villa/Duplex', 'Deep Steam Sanitization', '3+ Bathrooms', 'Terrace & Balcony'],
          },
        ],
        processSteps: [
          { stepNumber: 1, title: 'Inspection & Setup', description: 'Our team assesses your home space and sets up protective coverings for delicate furniture.' },
          { stepNumber: 2, title: 'Dry Dusting & Vacuuming', description: 'High-power HEPA vacuuming for ceilings, fans, cobwebs, and window tracks.' },
          { stepNumber: 3, title: 'Deep Scrubbing & Degreasing', description: 'Specialized chemical scrubbing for kitchen grease, oil marks, and bathroom hard-water stains.' },
          { stepNumber: 4, title: 'Floor Buffing & Mop', description: 'Single-disc floor polishing or machine scrubbing for tile sheen.' },
          { stepNumber: 5, title: 'Final Sanitization Audit', description: 'Supervisor walkthrough with homeowner to verify satisfaction.' },
        ],
        faqs: [
          { question: 'Do I need to supply cleaning tools?', answer: 'No! CleanNest brings all professional equipment including vacuums, mops, ladders, and eco-friendly chemicals.' },
          { question: 'Is the cleaning safe for pets and children?', answer: 'Yes, we use non-toxic, biodegradable chemicals that are completely safe for pets and infants.' },
        ],
        rating: 4.9,
        totalReviews: 48,
      },
      {
        name: 'Sofa & Upholstery Cleaning',
        slug: 'sofa-cleaning',
        category: 'Specialized Cleaning',
        shortDescription: 'Deep extraction sofa cleaning, stain removal, and odor elimination for fabric and leather sofas.',
        description: 'Revitalize your living room furniture with our professional sofa injection-extraction deep cleaning process. We remove stubborn tea/coffee spills, food stains, body oil marks, dust mites, and pet odors.',
        price: 999,
        duration: '1.5 - 2 Hours',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
        includedItems: [
          'High-suction dry vacuuming to extract deep dust and debris',
          'Eco-friendly foam application and targeted stain treatment',
          'Hot water injection extraction process',
          'Fabric conditioning and quick-dry blower treatment',
        ],
        excludedItems: [
          'Physical tear repair or re-upholstery work',
          'Permanent chemical burn restoration',
        ],
        packages: [
          {
            name: '3-Seater Sofa',
            price: 899,
            duration: '1 Hour',
            features: ['Dry Vacuuming', 'Stain Extraction', 'Deodorization'],
          },
          {
            name: '5-Seater Sofa Set (3+1+1)',
            price: 1399,
            duration: '1.5 Hours',
            features: ['Dry & Wet Extraction', 'Cushion Deep Clean', 'Antibacterial Spray'],
          },
          {
            name: 'L-Shape / 7-Seater Sofa',
            price: 1899,
            duration: '2 Hours',
            features: ['Full Sectional Clean', 'Leather/Fabric Polish', 'Stain Safeguard Treatment'],
          },
        ],
        processSteps: [
          { stepNumber: 1, title: 'Fabric Analysis', description: 'We test your sofa fabric to select the optimal PH-balanced solution.' },
          { stepNumber: 2, title: 'Pre-Vacuuming', description: 'Deep vacuuming to clear crumbs, dust, and loose particles.' },
          { stepNumber: 3, title: 'Shampoo Spray & Scrub', description: 'Gentle motorized brush agitation to break down tough oil and grease spots.' },
          { stepNumber: 4, title: 'Extraction & Drying', description: 'Powerful moisture extraction for fast 2-hour drying.' },
        ],
        faqs: [
          { question: 'How long does the sofa take to dry?', answer: 'With our extraction technology, your sofa will be ready for use within 2 to 3 hours.' },
        ],
        rating: 4.8,
        totalReviews: 35,
      },
      {
        name: 'Kitchen Deep Cleaning',
        slug: 'kitchen-cleaning',
        category: 'Home Cleaning',
        shortDescription: 'Hygienic kitchen degreasing, chimney exterior cleaning, tile descaling, and cabinet wiping.',
        description: 'The kitchen is the heart of your home in Ahmedabad. Our specialized Kitchen Deep Cleaning targets tough turmeric stains, oil splatter, charred stove residue, greasy cabinets, and drain odors.',
        price: 1499,
        duration: '2 - 3 Hours',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
        includedItems: [
          'Chimney filter degreasing & exterior wiper clean',
          'Gas stove, burner, and countertop steam scrub',
          'Modular cabinet exterior & handle sanitization',
          'Tile wall grout scrubbing and hard-water stain removal',
          'Sink drain line freshening and stainless steel polish',
          'Refrigerator exterior & microwave interior wipe',
        ],
        excludedItems: [
          'Chimney motor internal servicing (mechanical)',
          'Cleaning inside fully occupied cabinets unless emptied by owner',
        ],
        packages: [
          {
            name: 'Standard Kitchen',
            price: 1499,
            duration: '2 Hours',
            features: ['Counters & Tiles', 'Stove & Sink', 'Cabinet Exterior'],
          },
          {
            name: 'Premium Kitchen + Appliance Interior',
            price: 2199,
            duration: '3 Hours',
            features: ['Includes Fridge Interior', 'Microwave & Oven Interior', 'Deep Chimney Filter Clean'],
          },
        ],
        processSteps: [
          { stepNumber: 1, title: 'Degreasant Foam Spray', description: 'High-grade non-toxic degreasing foam applied to tiles & stove.' },
          { stepNumber: 2, title: 'Steam Scrubbing', description: 'High-temperature steam to melt stubborn ghee and oil deposits.' },
          { stepNumber: 3, title: 'Sink & Drain Care', description: 'Anti-bacterial flushing for fresh scent and hygiene.' },
        ],
        faqs: [
          { question: 'Do you clean inside the kitchen cabinets?', answer: 'Yes, if cabinets are emptied before our team arrives, we wipe and sanitize the interior shelves thoroughly!' },
        ],
        rating: 4.9,
        totalReviews: 52,
      },
      {
        name: 'Bathroom Deep Sanitization',
        slug: 'bathroom-cleaning',
        category: 'Home Cleaning',
        shortDescription: 'Tile descaling, toilet bowl sanitization, glass shower enclosure scrubbing, and tap polishing.',
        description: 'Hard water in Ahmedabad can leave stubborn yellow lime scale and soap scum on bathroom fittings. Our specialized acid-safe descaling treatment makes your bathroom shine like brand new.',
        price: 899,
        duration: '1 - 2 Hours',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
        includedItems: [
          'Tile wall & floor high-pressure scrub for yellow lime scale',
          'Toilet seat, bowl & flush tank antibacterial sanitization',
          'Shower glass enclosure & mirror water stain removal',
          'Chrome tap, showerhead & metal fixture shine polish',
          'Exhaust fan blades & ceiling light fixture dusting',
        ],
        excludedItems: [
          'Plumbing repair or pipe leak fixes',
          'Silicon re-grouting work',
        ],
        packages: [
          {
            name: 'Single Bathroom',
            price: 699,
            duration: '1 Hour',
            features: ['Full Scrubbing', 'Scale Removal', 'Chrome Polish'],
          },
          {
            name: 'Combo (2 Bathrooms)',
            price: 1299,
            duration: '2 Hours',
            features: ['Save 10%', 'Shower Glass Polish', 'Disinfectant Spray'],
          },
          {
            name: 'Deluxe (3 Bathrooms)',
            price: 1799,
            duration: '2.5 Hours',
            features: ['Save 15%', 'Steam Sanitization', 'Exhaust Fan Deep Clean'],
          },
        ],
        processSteps: [
          { stepNumber: 1, title: 'Scale Softening Treatment', description: 'Application of eco-friendly descaling agent to loosen hard-water deposits.' },
          { stepNumber: 2, title: 'Buffing & Tile Scrub', description: 'Motorized tile brush scrubbing for shiny floor and walls.' },
          { stepNumber: 3, title: 'Sanitization & Chrome Wipe', description: 'Microfiber polishing of chrome taps and mirrors.' },
        ],
        faqs: [
          { question: 'Can you remove old hard-water stains from shower glass?', answer: 'Yes! Our non-abrasive glass restoration scrub removes 90-95% of tough mineral spots.' },
        ],
        rating: 4.9,
        totalReviews: 60,
      },
      {
        name: 'Carpet & Rug Shampooing',
        slug: 'carpet-cleaning',
        category: 'Specialized Cleaning',
        shortDescription: 'Deep shampooing and high-suction extraction for living room carpets, runner rugs, and mats.',
        description: 'Carpets trap dust, pollen, pet hair, and dirt particles. Our carpet shampooing service cleans deep down to the carpet fibers, restoring fluffiness, color vibrance, and hygiene.',
        price: 1199,
        duration: '1.5 Hours',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
        includedItems: [
          'Industrial HEPA vacuuming to remove loose dirt',
          'PH-balanced active carpet shampooing',
          'Rotary brush fiber agitation',
          'Wet extraction to remove 90% water & dirt',
        ],
        excludedItems: [
          'Carpet fringe re-weaving',
        ],
        packages: [
          {
            name: 'Medium Carpet (Up to 50 sq ft)',
            price: 999,
            duration: '1 Hour',
            features: ['Spot Treatment', 'Deep Extraction'],
          },
          {
            name: 'Large Carpet (Up to 100 sq ft)',
            price: 1499,
            duration: '1.5 Hours',
            features: ['Double Pass Clean', 'Anti-Mite Spray'],
          },
        ],
        processSteps: [
          { stepNumber: 1, title: 'Dust Extraction', description: 'Heavy duty vacuuming.' },
          { stepNumber: 2, title: 'Shampoo & Extraction', description: 'Deep water injection extraction.' },
        ],
        faqs: [
          { question: 'Will my carpet shrink?', answer: 'No, we use low-moisture professional shampooing designed for all carpet types.' },
        ],
        rating: 4.7,
        totalReviews: 24,
      },
      {
        name: 'Move-In / Move-Out Deep Cleaning',
        slug: 'move-in-move-out-cleaning',
        category: 'Home Cleaning',
        shortDescription: 'Comprehensive vacant home deep cleaning for new homeowners or tenant handovers.',
        description: 'Moving into a new home in Bodakdev, Satellite, or SG Highway? Or handing over a rental unit to your landlord? CleanNest delivers 100% spotless move-in/move-out deep cleaning, ensuring every cabinet, drawer, fixture, and floor is dust-free.',
        price: 3499,
        duration: '5 - 7 Hours',
        image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1000&q=80',
        includedItems: [
          'Empty wardrobe & cabinet inside-out sanitization',
          'Deep scrubbing of kitchen, stove, chimney & pantry',
          'All bathrooms descaled & disinfected',
          'All doors, frames, switchboards, fan blades & glass windows',
          'Complete floor scrubbing and balcony washing',
        ],
        excludedItems: [
          'Debris removal exceeding standard garbage bags',
        ],
        packages: [
          {
            name: '2 BHK Move-In Clean',
            price: 3499,
            duration: '5 Hours',
            features: ['Vacant Flat Clean', 'All Cabinets Inside', '2 Bathrooms'],
          },
          {
            name: '3 BHK Move-In Clean',
            price: 4499,
            duration: '6 Hours',
            features: ['Complete 3 BHK', 'Kitchen & Balconies', '3 Bathrooms'],
          },
        ],
        processSteps: [
          { stepNumber: 1, title: 'Top-to-Bottom Dusting', description: 'Ceilings, lights, vents, and walls.' },
          { stepNumber: 2, title: 'Cabinet & Fixture Wipe', description: 'Disinfecting interior of empty closets.' },
          { stepNumber: 3, title: 'Floor Buff & Shine', description: 'High performance tile washing.' },
        ],
        faqs: [
          { question: 'Should the home be completely vacant?', answer: 'Yes, empty homes allow our crew to perform the deepest possible scrub in every nook and cranny.' },
        ],
        rating: 5.0,
        totalReviews: 31,
      },
      {
        name: 'Regular Home Maintenance Cleaning',
        slug: 'regular-home-cleaning',
        category: 'Home Cleaning',
        shortDescription: 'Recurring weekly or monthly upkeep cleaning to keep your home tidy, dust-free, and fresh.',
        description: 'Enjoy a consistently spotless home with our scheduled maintenance clean. Perfect for busy professionals and families in Ahmedabad who need reliable, recurring cleaning help.',
        price: 1199,
        duration: '2 - 3 Hours',
        image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1000&q=80',
        includedItems: [
          'Dusting all furniture, tabletops & electronics',
          'Vacuuming rugs and sofa surfaces',
          'Kitchen counter wipe down & sink cleaning',
          'Bathroom surface wipe & toilet sanitization',
          'Sweeping and damp mopping all room floors',
        ],
        excludedItems: [
          'Heavy scale removal (covered in Deep Cleaning)',
        ],
        packages: [
          {
            name: 'Single Visit Maintenance',
            price: 1199,
            duration: '2.5 Hours',
            features: ['Dusting & Mopping', 'Kitchen & Bathroom Maintenance'],
          },
          {
            name: 'Monthly Subscription (4 Visits)',
            price: 3999,
            duration: '4 Visits',
            features: ['1 Visit Every Week', 'Save 20%', 'Priority Slot Booking'],
          },
        ],
        processSteps: [
          { stepNumber: 1, title: 'Surface Dusting', description: 'Wiping tables, TV units, shelves.' },
          { stepNumber: 2, title: 'Floor Care', description: 'Vacuuming and aromatic damp mop.' },
        ],
        faqs: [
          { question: 'Can I assign a preferred day for weekly cleanings?', answer: 'Absolutely! Subscribers get dedicated weekly time slots and assigned team leads.' },
        ],
        rating: 4.8,
        totalReviews: 19,
      },
      {
        name: 'Office & Commercial Deep Cleaning',
        slug: 'office-cleaning',
        category: 'Commercial & Office',
        shortDescription: 'Professional workplace sanitization, workstation wiping, carpet extraction, and washroom care for Ahmedabad offices.',
        description: 'Create a clean, hygienic, and impressive environment for your staff and clients. We serve corporate offices, IT parks, retail showrooms, and clinics across SG Highway, Prahlad Nagar, and Ashram Road.',
        price: 3999,
        duration: '4 - 6 Hours',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
        includedItems: [
          'Desks, monitors, keyboards & chair sanitization',
          'Conference room table & glass board wiping',
          'Pantry counter, sink & coffee machine area clean',
          'Office carpet vacuuming & floor buffing',
          'Commercial washroom deep disinfectant wash',
          'Trash receptacle emptying & liner replacement',
        ],
        excludedItems: [
          'Server room cable unplugging',
        ],
        packages: [
          {
            name: 'Small Office (Up to 1,000 sq ft)',
            price: 3999,
            duration: '4 Hours',
            features: ['Up to 15 Workstations', 'Pantry & 1 Washroom', 'Carpet Vacuuming'],
          },
          {
            name: 'Medium Office (1,000 - 3,000 sq ft)',
            price: 7499,
            duration: '6 Hours',
            features: ['Up to 40 Workstations', 'Conference Room', '2 Washrooms & Glass Partition'],
          },
        ],
        processSteps: [
          { stepNumber: 1, title: 'After-Hours or Weekend Setup', description: 'Cleaning scheduled during off-hours to prevent workflow disruption.' },
          { stepNumber: 2, title: 'Workstation Sanitization', description: 'Microfiber anti-static wipe for screens & desks.' },
          { stepNumber: 3, title: 'Floor Buffing & Trash Care', description: 'Machine wash floors & replace garbage bags.' },
        ],
        faqs: [
          { question: 'Can you work outside office hours or on Sundays?', answer: 'Yes! We provide flexible night and weekend shifts for zero business disruption.' },
        ],
        rating: 4.9,
        totalReviews: 28,
      },
    ];

    const createdServices = await Service.insertMany(servicesData);
    console.log(`Created ${createdServices.length} services.`);

    // 3. Create Reviews
    const reviewsData = [
      {
        user: customerUser._id,
        service: createdServices[0]._id,
        serviceName: 'Home Deep Cleaning',
        location: 'Satellite, Ahmedabad',
        rating: 5,
        comment: 'CleanNest did an unbelievable job on our 3 BHK in Satellite! The kitchen chimney grease was completely gone and the bathrooms look brand new. Extremely professional team and punctual service.',
        status: 'approved',
      },
      {
        user: customerUser._id,
        service: createdServices[1]._id,
        serviceName: 'Sofa & Upholstery Cleaning',
        location: 'Prahlad Nagar, Ahmedabad',
        rating: 5,
        comment: 'I thought I would have to replace my 7-seater sofa due to severe stains from our dog. CleanNest team used their extraction machine and brought it back to original condition! Highly recommended in Ahmedabad.',
        status: 'approved',
      },
      {
        user: customerUser._id,
        service: createdServices[2]._id,
        serviceName: 'Kitchen Deep Cleaning',
        location: 'Bodakdev, Ahmedabad',
        rating: 4,
        comment: 'Very thorough kitchen cleaning. They took care of the hard oil stains around the gas stove and cleaned the tiles spotless. Great value for money!',
        status: 'approved',
      },
      {
        user: customerUser._id,
        service: createdServices[3]._id,
        serviceName: 'Bathroom Deep Sanitization',
        location: 'Vastrapur, Ahmedabad',
        rating: 5,
        comment: 'The hard water in Ahmedabad had ruined our glass shower enclosure. Their team used a specialized scale softener and made it crystal clear. Outstanding work!',
        status: 'approved',
      },
      {
        user: customerUser._id,
        service: createdServices[5]._id,
        serviceName: 'Move-In Deep Cleaning',
        location: 'SG Highway, Ahmedabad',
        rating: 5,
        comment: 'Booked them before moving into our flat near Karnavati Club. They sanitized every cabinet inside out. Smelled so fresh when we unlocked the doors. Super happy!',
        status: 'approved',
      },
      {
        user: customerUser._id,
        service: createdServices[7]._id,
        serviceName: 'Office Deep Cleaning',
        location: 'Navrangpura, Ahmedabad',
        rating: 5,
        comment: 'We hired CleanNest for our tech office in Navrangpura. They came on Sunday and deep cleaned 30 desks and the pantry. Our staff loved the clean environment on Monday morning.',
        status: 'approved',
      },
    ];

    await Review.insertMany(reviewsData);
    console.log('Created customer reviews.');

    // 4. Create Articles
    const articlesData = [
      {
        title: 'Essential Home Deep Cleaning Checklist for Festive Seasons in Gujarat',
        slug: 'festive-home-deep-cleaning-checklist-ahmedabad',
        category: 'Cleaning Guide',
        excerpt: 'Preparing your home in Ahmedabad for Diwali or Navratri? Here is a room-by-room deep cleaning checklist used by professional home cleaners.',
        content: `
# Essential Home Deep Cleaning Checklist for Festive Seasons in Gujarat

Festivals like Navratri, Diwali, and Uttarayan bring joy, family gatherings, and traditional celebrations across Ahmedabad. But before welcoming guests, preparing your house with a thorough deep clean is an age-old tradition.

Here is a room-by-room deep cleaning plan to get your home sparkling without the stress:

## 1. Kitchen Degreasing & Cabinet Organization
In Gujarati households, rich dishes and frying leave fine layers of oil on kitchen tiles and chimney filters over time.
- **Chimney & Exhaust:** Soak metal filters in warm water with vinegar and degreasing soap for 30 minutes.
- **Countertops:** Scrub tile grout with baking soda paste to remove yellow oil spots.
- **Pantry Cabinets:** Empty shelves, wipe with a damp microfiber cloth, and line with fresh parchment paper.

## 2. Bathroom Scale Removal
Ahmedabad borewell water often leaves whitish mineral deposits on shower glass and taps.
- Apply citric acid or vinegar foam solution to chrome taps for 15 minutes before light scrubbing.
- Scrub floor grout lines with a stiff bristle brush to prevent slippery algae buildup.

## 3. Sofa & Curtain Dust Extraction
Dust from SG Highway construction and dry weather accumulates in fabric couches and curtains.
- Vacuum sofas thoroughly using a crevice tool.
- For deep stains, consider an injection-extraction shampoo service to remove body oils and dust mites.

## 4. Ceiling Fans & Window Glass
Ceiling fans accumulate thick dust layers during summer months.
- Slide an old pillowcase over each fan blade to catch falling dust.
- Wipe window glass with a solution of 70% water and 30% isopropyl alcohol for streak-free clarity.

Need professional assistance? **CleanNest Home Services** provides complete 1-day home deep cleaning across Satellite, Bodakdev, Vastrapur, and all areas of Ahmedabad!
        `,
        featuredImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80',
        author: 'Priya Sharma (Senior Hygiene Specialist)',
        readTime: '5 min read',
        status: 'published',
      },
      {
        title: 'How to Remove Tough Hard-Water Stains in Ahmedabad Homes',
        slug: 'remove-hard-water-stains-ahmedabad',
        category: 'Stain Removal',
        excerpt: 'Hard water stains ruining your bathroom glass and chrome taps? Learn proven natural and professional techniques to restore mirror shine.',
        content: `
# How to Remove Tough Hard-Water Stains in Ahmedabad Homes

If you live in areas like Bopal, Prahlad Nagar, or Chandkheda, you are probably familiar with white calcium deposits on shower doors, taps, and tiles caused by groundwater hardness.

## Why Standard Soap Fails
Standard soaps react with calcium and magnesium minerals in hard water to form soap scum, which bonds to glass and porcelain surfaces.

## DIY Methods That Work:
1. **White Vinegar Spray:** Mix equal parts water and white vinegar in a spray bottle. Spray on shower glass and leave for 20 minutes before wiping with a microfiber towel.
2. **Baking Soda & Lemon Paste:** Form a paste and rub gently onto chrome fittings. Lemon acid neutralizes alkaline mineral deposits.

## When to Call Professionals
If stains have calcified into hard layers over months, abrasives can scratch glass. Professional cleaners use non-abrasive motorized polishers and specialized scale softeners to restore 95%+ clarity safely.
        `,
        featuredImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
        author: 'Amit Patel (CleanNest Expert)',
        readTime: '4 min read',
        status: 'published',
      },
      {
        title: '5 Secrets to Extend the Life of Your Fabric & Leather Sofa',
        slug: 'extend-sofa-life-tips',
        category: 'Furniture Care',
        excerpt: 'Simple weekly maintenance habits to prevent dust mite buildup, upholstery fading, and fabric sagging in your living room.',
        content: `
# 5 Secrets to Extend the Life of Your Fabric & Leather Sofa

Your living room sofa is the centerpiece of your home. Follow these expert tips from CleanNest upholstery specialists to keep your sofa looking brand new for years:

1. **Vacuum Weekly:** Don’t let abrasive dust particles sink into deep fabric weave. Vacuum seams and cushions every week.
2. **Rotate Cushions:** Swap left and right seat cushions monthly to ensure even foam compression and wear.
3. **Keep Away from Direct Sunlight:** Strong Ahmedabad sunlight through window panes can fade fabric dye and dry out leather. Use sheer curtains.
4. **Treat Spills Immediately:** Never rub a fresh liquid spill! Blot with a clean dry towel to absorb moisture.
5. **Schedule Professional Extraction Every 6 Months:** Professional hot-water extraction lifts deep oils, sweat, and micro-dust that domestic vacuums cannot reach.
        `,
        featuredImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
        author: 'CleanNest Team',
        readTime: '3 min read',
        status: 'published',
      },
      {
        title: 'Why Indoor Air Quality Matters for Family Health in Urban Areas',
        slug: 'indoor-air-quality-family-health',
        category: 'Health & Wellness',
        excerpt: 'Indoor air can be 2 to 5 times more polluted than outdoor air. Discover how deep cleaning reduces allergens and improves indoor breathing.',
        content: `
# Why Indoor Air Quality Matters for Family Health in Urban Areas

We spend nearly 80% of our time indoors. Dust mites, pet dander, mold spores, and dust trapped in AC vents and ceiling fan blades can trigger asthma, allergies, and morning sinus congestion.

## Key Steps to Refresh Indoor Air:
- Clean air conditioner filters once a month.
- Vacuum carpets and mattress tops with a sealed HEPA vacuum.
- Get professional home deep cleaning every 6 months to eliminate hidden dust reservoirs under beds, inside cabinets, and above high wardrobes.
        `,
        featuredImage: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1000&q=80',
        author: 'Dr. Kavita Mehta (Consultant)',
        readTime: '4 min read',
        status: 'published',
      },
    ];

    await Article.insertMany(articlesData);
    console.log('Created blog articles.');

    // 5. Create Sample Bookings
    const today = new Date().toISOString().split('T')[0];
    const sampleBookings = [
      {
        bookingId: 'CN-2026-9812',
        user: customerUser._id,
        service: createdServices[0]._id,
        package: 'Standard (2 - 3 BHK)',
        bookingDate: today,
        timeSlot: '11:00 AM',
        propertyType: 'Apartment',
        rooms: '3 BHK',
        address: {
          street: 'B-402, Satellite Towers',
          area: 'Satellite',
          city: 'Ahmedabad',
          pincode: '380015',
        },
        phone: '+91 98250 88990',
        instructions: 'Please pay special attention to kitchen chimney and master bathroom.',
        amount: 3499,
        status: 'Confirmed',
      },
      {
        bookingId: 'CN-2026-4432',
        user: customerUser._id,
        service: createdServices[1]._id,
        package: '5-Seater Sofa Set (3+1+1)',
        bookingDate: '2026-09-28',
        timeSlot: '03:00 PM',
        propertyType: 'Apartment',
        rooms: '2 BHK',
        address: {
          street: 'B-402, Satellite Towers',
          area: 'Satellite',
          city: 'Ahmedabad',
          pincode: '380015',
        },
        phone: '+91 98250 88990',
        instructions: 'Call 30 mins before arrival.',
        amount: 1399,
        status: 'Pending',
      },
    ];

    await Booking.insertMany(sampleBookings);
    console.log('Created sample bookings.');

    // 6. Create Sample Contact Enquiries
    const sampleEnquiries = [
      {
        name: 'Sanjay Shah',
        email: 'sanjay.shah@yahoo.com',
        phone: '+91 99090 11223',
        subject: 'Corporate Office Cleaning Query in Prahlad Nagar',
        message: 'Hi team, we have a 4500 sq ft office space near Corporate Road. Need weekend cleaning quotation.',
        status: 'new',
      },
      {
        name: 'Megha Trivedi',
        email: 'megha.trivedi@gmail.com',
        phone: '+91 97230 44556',
        subject: 'Deep cleaning quote for 4 BHK Villa in Thaltej',
        message: 'We are shifting into a duplex villa in Thaltej next month. Want move-in deep cleaning estimate.',
        status: 'in_progress',
      },
    ];

    await Contact.insertMany(sampleEnquiries);
    console.log('Created sample contact enquiries.');

    console.log('==================================================');
    console.log('DATABASE SEEDED SUCCESSFULLY!');
    console.log('Admin Credentials: admin@cleannest.in / Admin@123456');
    console.log('Customer Credentials: rahul.patel@gmail.com / Customer@123456');
    console.log('==================================================');

    process.exit(0);
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
