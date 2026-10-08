import Image from 'next/image';
import Link from 'next/link';
import PropertySearch from '@/components/search/PropertySearch';
import PropertyCard from '@/components/property/PropertyCard';
import ContactForm from '@/components/ContactForm';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';
import { Building, Home, MapPin, Key } from 'lucide-react';
import { connection } from 'next/server';

async function getFeaturedProperties() {
  await connection(); // Opt into dynamic rendering (must be outside try/catch)
  try {
    await dbConnect();
    const properties = await Property.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();
    
    // Serialize object ids to strings
    return properties.map(p => ({
      ...p,
      _id: p._id.toString(),
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching featured properties:', error);
    return [];
  }
}

async function getPropertyTypeCounts() {
  try {
    await dbConnect();
    const [apartment, villa, house, commercial] = await Promise.all([
      Property.countDocuments({ propertyType: 'Apartment' }),
      Property.countDocuments({ propertyType: 'Villa' }),
      Property.countDocuments({ propertyType: 'House' }),
      Property.countDocuments({ propertyType: 'Commercial' }),
    ]);
    return { apartment, villa, house, commercial };
  } catch (error) {
    console.error('Error fetching property type counts:', error);
    return { apartment: 0, villa: 0, house: 0, commercial: 0 };
  }
}

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties();
  const typeCounts = await getPropertyTypeCounts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
            alt="Beautiful Home Exterior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/60 mix-blend-multiply" />
        </div>
        
        <div className="container relative z-10 text-center text-white mt-12">
          <h1 className="mb-6 mx-auto max-w-4xl font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-md">
            Welcome to <span className="text-accent">Propgent</span> Today
          </h1>
          <p className="mb-12 mx-auto max-w-2xl text-base md:text-lg font-medium text-white/90 drop-shadow-sm">
            Discover a wide range of premium properties tailored to your lifestyle. We make finding your perfect home effortless.
          </p>
          
          <div className="px-4">
            <PropertySearch />
          </div>
        </div>
      </section>

      {/* Property Types Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-primary mb-4">Explore Property Types</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Browse properties by category to find exactly what you're looking for.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Building, label: 'Apartment', count: typeCounts.apartment },
              { icon: Home, label: 'Villa', count: typeCounts.villa },
              { icon: MapPin, label: 'House', count: typeCounts.house },
              { icon: Key, label: 'Commercial', count: typeCounts.commercial },
            ].map((type, i) => (
              <Link key={i} href={`/properties?propertyType=${type.label}`} className="group bg-surface rounded-2xl p-8 border border-border text-center shadow-sm hover:shadow-xl hover:border-accent/50 transition-all duration-300">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <type.icon size={32} />
                </div>
                <h3 className="font-heading font-bold text-xl text-primary mb-2">{type.label}</h3>
                <p className="text-muted-foreground text-sm font-medium">{type.count} Properties</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-muted">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl font-heading font-extrabold text-primary mb-4">Featured Properties</h2>
              <p className="text-muted-foreground max-w-2xl">Handpicked premium properties for you.</p>
            </div>
            <Link href="/properties" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all shrink-0">
              View All Properties
            </Link>
          </div>

          {featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No featured properties found. Run the seed script to add some!</p>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop" 
                alt="About Propgent" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/10"></div>
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-100 max-w-xs">
                <p className="font-heading font-bold text-3xl text-primary mb-1">10+ Years</p>
                <p className="text-gray-600 font-medium">Of excellence in real estate</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-accent font-bold tracking-wider uppercase text-sm mb-3">About Propgent</h4>
                <h2 className="text-primary text-3xl md:text-4xl font-heading font-extrabold leading-tight mb-6">
                  We Help You Find Your Dream Home
                </h2>
                <p className="text-base text-gray-600 leading-relaxed mb-6">
                  At Propgent, we believe that finding the perfect home should be an exciting and seamless journey. With over a decade of experience in the premium real estate market, our dedicated team of professionals is committed to matching you with properties that perfectly align with your lifestyle and aspirations.
                </p>
                <p className="text-base text-gray-600 leading-relaxed">
                  Whether you're looking for a luxury villa, a modern apartment, or a lucrative commercial investment, we leverage our extensive network and market expertise to provide you with unparalleled service and exclusive listings.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                <div>
                  <p className="text-3xl font-bold text-primary mb-1">5K+</p>
                  <p className="text-gray-500 font-medium">Happy Customers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary mb-1">200+</p>
                  <p className="text-gray-500 font-medium">Exclusive Properties</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-primary text-primary-foreground mb-32">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container relative z-10 text-center max-w-3xl mx-auto pb-12">
          <h2 className="text-3xl font-heading font-extrabold text-white mb-6">Need Help Finding A Home?</h2>
          <p className="text-white/80 text-base mb-10">
            Our team of expert real estate agents is ready to assist you in finding the perfect property that matches your requirements and budget.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-bold text-accent-foreground hover:bg-white hover:text-primary active:scale-95 transition-all duration-300 shadow-xl hover:shadow-2xl">
            Contact Us Today
          </Link>
        </div>
      </section>
    </>
  );
}
