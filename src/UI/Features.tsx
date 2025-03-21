import customize from '../assets/customize.svg';
import free from '../assets/free.svg';
import instant from '../assets/instant.svg';
import no_dependencies from '../assets/no-dependency.svg';
import no_login from '../assets/no-user.svg';
import rich_collection from '../assets/rich-collection.svg';

type FeatureProps = {
  icon: string;
  title: string;
  description: string;
  borderClasses?: string;
};

const Feature = ({ icon, title, description, borderClasses = '' }: FeatureProps) => {
  return (
    <div className={`md:p-8 lg:p-14 ${borderClasses}`}>
      <img width={44} className='mx-auto' src={icon} alt='' />
      <h3 className='mt-12 text-xl font-bold text-gray-900 font-pj'>{title}</h3>
      <p className='mt-5 text-sm text-gray-600 font-pj'>{description}</p>
    </div>
  );
};

export const Features = () => {
  const featuresData = [
    {
      icon: rich_collection,
      title: 'Rich collection',
      description: 'Choose from a variety of loader styles, from spinners to progress bars, tailored for different design needs.',
    },
    {
      icon: no_login,
      title: 'No login required',
      description: 'Get started instantly—no account needed. Enjoy full access without signup or credentials.',
      borderClasses: 'md:border-l md:border-mp',
    },
    {
      icon: no_dependencies,
      title: 'No dependencies',
      description: 'Generate lightweight, HTML/CSS or SVG loaders that integrate seamlessly without extra dependencies.',
      borderClasses: 'md:border-l md:border-mp',
    },
    {
      icon: customize,
      title: 'Customizable loaders',
      description: 'Personalize colors, styles, and animations to match your brand and design effortlessly.',
      borderClasses: 'md:border-t md:border-mp',
    },
    {
      icon: free,
      title: 'Completely free',
      description: 'Enjoy all features without cost—no subscriptions, no hidden fees, just free and easy access.',
      borderClasses: 'md:border-l md:border-mp md:border-t',
    },
    {
      icon: instant,
      title: 'Realtime preview',
      description: 'See changes live as you customize your loader, making adjustments instantly.',
      borderClasses: 'md:border-l md:border-mp md:border-t',
    },
  ];

  return (
    <section className='py-12 bg-white sm:py-16 lg:py-16'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-4xl font-pj'>Why loadership</h2>
          <p className='mt-4 text-base leading-7 text-gray-600 sm:mt-8 font-pj'>The best tool to customize your own loaders without starting from scratch.</p>
        </div>

        <div className='grid grid-cols-1 mt-6 text-center sm:mt-6 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 md:gap-0 xl:mt-12'>
          {featuresData.map((feature, index) => (
            <Feature key={index} icon={feature.icon} title={feature.title} description={feature.description} borderClasses={feature.borderClasses} />
          ))}
        </div>
      </div>
    </section>
  );
};
