import { LoaderGrid } from './UI/LoaderGrid';
import { Steps } from './UI/Steps';
import { Features } from './UI/Features';

function App() {
  return (
    <section className='relative py-12 sm:py-14 lg:pt-16 xl:pb-0'>
      <div className='relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl'>
        <div className='max-w-3xl mx-auto text-center'>
          <p className='inline-flex px-4 py-2 text-base text-gray-900 border border-mp rounded-full font-pj bg-lp'>Made by Developers, for Developers</p>
          <h1 className='mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj'>Spin It Your Way</h1>
          <h1 className='mt-5 text-2xl font-bold leading-tight text-gray-900 sm:text-2xl sm:leading-tight lg:text-4xl lg:leading-tight font-pj'>Copy-Paste Loaders in Seconds</h1>
          <p className='max-w-4xl mx-auto mt-6 text-base leading-7 text-gray-600 font-inter'>
            Loadership is your go-to tool for generating and customizing loading spinners. Easily configure and copy-paste spinners in HTML/CSS, or SVG to enhance your web projects with smooth,
            professional loaders.
          </p>

          <div className='relative inline-flex mt-10 group'>
            <div className='absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt'></div>

            <a
              href='#configurator'
              title=''
              className='relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-lp transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
              role='button'
            >
              Get started
            </a>
          </div>
        </div>
      </div>

      <Features />
      <Steps />

      <div id='configurator' className='mt-16 md:mt-20'>
        <LoaderGrid />
      </div>
    </section>
  );
}

export default App;
