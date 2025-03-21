export const Footer = () => {
  return (
    <section className='bg-gray-50 sm:mt-16 lg:mt-24 pb-10'>
      <hr className='mb-6 border-gray-200 ' />
      <img className='mx-auto h-6 w-auto mb-4' src='/loadership_logo_text.svg' alt='Loadership' />
      <p className='text-xs md:text-sm text-center text-gray-600'>© Copyright {new Date().getFullYear()}</p>
    </section>
  );
};
