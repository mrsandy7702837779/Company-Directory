import { Company } from '../types';

// This is our mock database. In a real application, this data would come from a server.
const mockCompanies: Company[] = [
    { id: 1, logo: 'https://picsum.photos/seed/1/100/100', name: 'Innovate Inc.', industry: 'Technology', description: 'Pioneering new technologies for a better future.', location: 'Bangalore', employees: 1200, foundedYear: 2010 },
    { id: 2, logo: 'https://picsum.photos/seed/2/100/100', name: 'Healthful Goods', industry: 'Healthcare', description: 'Providing top-quality healthcare products and services.', location: 'Mumbai', employees: 850, foundedYear: 2005 },
    { id: 3, logo: 'https://picsum.photos/seed/3/100/100', name: 'Quantum Finance', industry: 'Finance', description: 'Secure and smart financial solutions for everyone.', location: 'Delhi', employees: 2500, foundedYear: 1998 },
    { id: 4, logo: 'https://picsum.photos/seed/4/100/100', name: 'GreenBuild Co.', industry: 'Construction', description: 'Sustainable construction for a greener planet.', location: 'Hyderabad', employees: 500, foundedYear: 2015 },
    { id: 5, logo: 'https://picsum.photos/seed/5/100/100', name: 'EduVerse', industry: 'Education', description: 'Revolutionizing learning with immersive experiences.', location: 'Chennai', employees: 300, foundedYear: 2018 },
    { id: 6, logo: 'https://picsum.photos/seed/6/100/100', name: 'RetailRight', industry: 'Retail', description: 'The future of personalized shopping experiences.', location: 'Gurgaon', employees: 5000, foundedYear: 2002 },
    { id: 7, logo: 'https://picsum.photos/seed/7/100/100', name: 'AutoMotion', industry: 'Automotive', description: 'Leading the charge in electric vehicle technology.', location: 'Pune', employees: 3200, foundedYear: 2012 },
    { id: 8, logo: 'https://picsum.photos/seed/8/100/100', name: 'FoodFusion', industry: 'Food & Beverage', description: 'Gourmet meals delivered to your doorstep.', location: 'Noida', employees: 750, foundedYear: 2016 },
    { id: 9, logo: 'https://picsum.photos/seed/9/100/100', name: 'ConnectSphere', industry: 'Technology', description: 'Connecting the world, one message at a time.', location: 'Bangalore', employees: 1800, foundedYear: 2011 },
    { id: 10, logo: 'https://picsum.photos/seed/10/100/100', name: 'BioGenetics', industry: 'Healthcare', description: 'Advanced genetic research for disease prevention.', location: 'Hyderabad', employees: 600, foundedYear: 2014 },
    { id: 11, logo: 'https://picsum.photos/seed/11/100/100', name: 'CapitalTrust', industry: 'Finance', description: 'Your trusted partner in investment banking.', location: 'Mumbai', employees: 4000, foundedYear: 1995 },
    { id: 12, logo: 'https://picsum.photos/seed/12/100/100', name: 'SkyHigh Homes', industry: 'Construction', description: 'Luxury living with an emphasis on quality.', location: 'Goa', employees: 450, foundedYear: 2008 },
    { id: 13, logo: 'https://picsum.photos/seed/13/100/100', name: 'LearnWell', industry: 'Education', description: 'Online courses taught by industry experts.', location: 'Online', employees: 150, foundedYear: 2020 },
    { id: 14, logo: 'https://picsum.photos/seed/14/100/100', name: 'ShopSmart', industry: 'Retail', description: 'AI-powered price comparison and deals.', location: 'Bangalore', employees: 200, foundedYear: 2019 },
    { id: 15, logo: 'https://picsum.photos/seed/15/100/100', name: 'EVOLVE Cars', industry: 'Automotive', description: 'Self-driving cars for a safer tomorrow.', location: 'Pune', employees: 900, foundedYear: 2017 },
    { id: 16, logo: 'https://picsum.photos/seed/16/100/100', name: 'FreshFarm', industry: 'Food & Beverage', description: 'Organic produce from local farms.', location: 'Chandigarh', employees: 250, foundedYear: 2013 },
    { id: 17, logo: 'https://picsum.photos/seed/17/100/100', name: 'CyberDefend', industry: 'Technology', description: 'Next-generation cybersecurity solutions for enterprise.', location: 'Bangalore', employees: 450, foundedYear: 2016 },
    { id: 18, logo: 'https://picsum.photos/seed/18/100/100', name: 'Nordic Energy', industry: 'Energy', description: 'Renewable energy solutions for a sustainable future.', location: 'Chennai', employees: 1100, foundedYear: 2009 },
    { id: 19, logo: 'https://picsum.photos/seed/19/100/100', name: 'SilkRoad Logistics', industry: 'Logistics', description: 'Streamlining global supply chains with AI.', location: 'Mumbai', employees: 3400, foundedYear: 2004 },
    { id: 20, logo: 'https://picsum.photos/seed/20/100/100', name: 'PixelPlay', industry: 'Gaming', description: 'Creating immersive worlds and unforgettable stories.', location: 'Gurgaon', employees: 600, foundedYear: 2012 },
    { id: 21, logo: 'https://picsum.photos/seed/21/100/100', name: 'LuxeMode', industry: 'Fashion', description: 'Defining modern elegance for the digital age.', location: 'Delhi', employees: 280, foundedYear: 2018 },
    { id: 22, logo: 'https://picsum.photos/seed/22/100/100', name: 'AeroSpace X', industry: 'Aerospace', description: 'Pushing the boundaries of atmospheric flight.', location: 'Hyderabad', employees: 5000, foundedYear: 1990 },
    { id: 23, logo: 'https://picsum.photos/seed/23/100/100', name: 'Urban Grow', industry: 'Agriculture', description: 'Vertical farming solutions for urban environments.', location: 'Pune', employees: 120, foundedYear: 2021 },
    { id: 24, logo: 'https://picsum.photos/seed/24/100/100', name: 'Streamline Media', industry: 'Media', description: 'Digital content distribution and analytics.', location: 'Mumbai', employees: 800, foundedYear: 2007 },
    { id: 25, logo: 'https://picsum.photos/seed/25/100/100', name: 'BlueWave Consulting', industry: 'Consulting', description: 'Strategic business advice for global markets.', location: 'Bangalore', employees: 1500, foundedYear: 2000 },
    { id: 26, logo: 'https://picsum.photos/seed/26/100/100', name: 'NanoHealth', industry: 'Healthcare', description: 'Nanotechnology applications in modern medicine.', location: 'Hyderabad', employees: 400, foundedYear: 2015 },
    { id: 27, logo: 'https://picsum.photos/seed/27/100/100', name: 'Solaris Power', industry: 'Energy', description: 'Harnessing the power of the sun efficiently.', location: 'Noida', employees: 950, foundedYear: 2011 },
    { id: 28, logo: 'https://picsum.photos/seed/28/100/100', name: 'RapidMove', industry: 'Logistics', description: 'Instant local delivery services.', location: 'Bangalore', employees: 2200, foundedYear: 2014 },
    { id: 29, logo: 'https://picsum.photos/seed/29/100/100', name: 'CryptoVault', industry: 'Finance', description: 'Secure cold storage for digital assets.', location: 'Mumbai', employees: 80, foundedYear: 2017 },
    { id: 30, logo: 'https://picsum.photos/seed/30/100/100', name: 'VirtualSpaces', industry: 'Real Estate', description: 'VR tours for luxury real estate properties.', location: 'Gurgaon', employees: 150, foundedYear: 2019 },
    { id: 31, logo: 'https://picsum.photos/seed/31/100/100', name: 'OceanClean', industry: 'Non-Profit', description: 'Cleaning our oceans one mile at a time.', location: 'Chennai', employees: 300, foundedYear: 2013 },
    { id: 32, logo: 'https://picsum.photos/seed/32/100/100', name: 'NextGen AI', industry: 'Technology', description: 'Artificial intelligence for business automation.', location: 'Pune', employees: 550, foundedYear: 2016 },
];

// Exporting constants derived from the mock data for use in filters.
export const MOCK_LOCATIONS = [...new Set(mockCompanies.map(c => c.location))].sort();
export const MOCK_INDUSTRIES = [...new Set(mockCompanies.map(c => c.industry))].sort();


/**
 * Simulates fetching company data from an API.
 * @returns A Promise that resolves with an array of Company objects.
 */
export const fetchCompanies = (): Promise<Company[]> => {
    return new Promise((resolve, reject) => {
        // Simulate a network delay of 1.5 seconds
        setTimeout(() => {
            // Simulate a potential API failure (e.g., 20% chance of error)
            if (Math.random() > 0.8) {
                console.error("API Error: Failed to fetch companies.");
                reject(new Error('Failed to connect to the server. Please check your connection and try again.'));
            } else {
                // On success, resolve the promise with the mock data
                resolve(mockCompanies);
            }
        }, 1500); 
    });
};