import { Link } from 'react-router';

const MenuItem: React.FC<{ title: string; href: string; important?: boolean }> = ({ title, href, important }) => {
  if (important)
    return (
      <Link
        className='px-5 py-2 lg:text-base font-semibold leading-7 text-gray-900 transition-all duration-200 bg-transparent border border-gray-900 rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white'
        to={href}
      >
        {title}
      </Link>
    );

  return (
    <Link
      className='text-sm lg:text-base font-medium text-dp transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-dp focus:ring-offset-2'
      to={href}
    >
      {title}
    </Link>
  );
};

export const Header = () => {
  return (
    <header className='relative py-4 md:py-6'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='relative flex items-center justify-between'>
          <div className='flex-shrink-0'>
            <Link to='/' className='flex rounded outline-none'>
              <img className='w-auto h-10 md:h-16' src='/loadership_logo_text.svg' alt='Loadership' />
            </Link>
          </div>

          {/* <div className='flex lg:hidden'>
            <button type='button' className='text-gray-900'>
              <svg className='w-7 h-7' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M4 6h16M4 12h16M4 18h16'></path>
              </svg>
            </button>
          </div> */}

          {/* <div className='hidden lg:absolute lg:inset-y-0 lg:flex lg:items-center lg:justify-center lg:space-x-12 lg:-translate-x-1/2 lg:left-1/2'>
            <MenuItem title='License' href='/license' />
          </div> */}

          <div className='flex lg:items-center lg:justify-center gap-2 lg:gap-4'>
            <MenuItem title='Github' href='https://github.com/jingcheng-chen/loadership' />
            <MenuItem title='About' href='/about' />
          </div>
        </div>
      </div>
    </header>
  );
};
