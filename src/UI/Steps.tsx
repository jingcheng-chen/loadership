export const Steps = () => {
  return (
    <section className='py-6 bg-white sm:py-16 lg:py-10'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='max-w-2xl mx-auto text-center'>
          <h2 className='text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-4xl'>How it works</h2>
          <p className='max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600'>Create and integrate loaders effortlessly in just three steps.</p>
        </div>

        <div className='relative mt-12 lg:mt-20'>
          <div className='absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28'>
            <img className='w-full' src='https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg' alt='' />
          </div>

          <div className='relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12'>
            <div>
              <div className='flex items-center justify-center w-16 h-16 mx-auto bg-lp border-2 border-dp rounded-full shadow'>
                <span className='text-xl font-semibold text-gray-700'> 1 </span>
              </div>
              <h3 className='mt-6 text-xl font-semibold leading-tight text-black md:mt-10'>Choose a loader</h3>
              <p className='mt-4 text-base text-gray-600'>Browse a diverse collection of loaders and pick the one that fits your design.</p>
            </div>

            <div>
              <div className='flex items-center justify-center w-16 h-16 mx-auto bg-lp border-2 border-dp rounded-full shadow'>
                <span className='text-xl font-semibold text-gray-700'> 2 </span>
              </div>
              <h3 className='mt-6 text-xl font-semibold leading-tight text-black md:mt-10'>Customize it</h3>
              <p className='mt-4 text-base text-gray-600'>Adjust colors, sizes, and animations to match your brand or project needs.</p>
            </div>

            <div>
              <div className='flex items-center justify-center w-16 h-16 mx-auto bg-lp border-2 border-dp rounded-full shadow'>
                <span className='text-xl font-semibold text-gray-700'> 3 </span>
              </div>
              <h3 className='mt-6 text-xl font-semibold leading-tight text-black md:mt-10'>Copy & Paste</h3>
              <p className='mt-4 text-base text-gray-600'>Simply copy the HTML/CSS or SVG and drop it into your project—done!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
