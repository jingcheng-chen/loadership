export const AboutPage = () => {
  return (
    <section className='px-6 py-12 bg-white sm:px-6 sm:py-16 lg:px-20 lg:py-20 max-w-7xl flex-grow m-auto'>
      <div className='flex-col items-center justify-center'>
        <h1 className='text-3xl font-extrabold text-gray-900 sm:text-4xl'>About</h1>
        <div className='mt-6 text-base font-normal leading-7 text-gray-600 '>
          <p>
            <span className='font-extrabold'>Loadership</span> is a collection of CSS-only loader configurators. It aims to provide the cleanest interface to configure and generate stunning loaders
            for your website. Simply Copy & Paste without any installation or dependency hassle.
          </p>

          <div className='ml-6'>
            <h3 className='mt-12 text-xl font-bold text-gray-900'>Ownership</h3>
            Loadership is a side project of{' '}
            <a href='https://chen.works' target='_blank' className='text-[#827398]'>
              <strong>Jingcheng Chen</strong>
            </a>
            .
          </div>

          <div className='ml-6'>
            <h3 className='mt-12 text-xl font-bold text-gray-900'>Credits</h3>
            The UI controls are based on the work of <em>Flowbite</em>. The landing page is inspired by <em>Landingfolio</em>. Some of the loaders are based on the work of <em>loading.io</em>.
          </div>
        </div>
        <h1 id='license' className='text-3xl font-extrabold text-gray-900 sm:text-4xl mt-12'>
          Contribution
        </h1>
        <div className='mt-6 text-base font-normal leading-7 text-gray-600 '>
          <p>
            <span className='font-extrabold'>Loadership</span> has open-sourced its full code at{' '}
            <a href='https://github.com/jingcheng-chen/loadership' target='_blank' className='text-[#827398]'>
              <strong>Github</strong>
            </a>
            .
          </p>
          <p className='mt-3'>
            If you have any feedback or questions to ask, please utilize the Github repo's{' '}
            <a href='https://github.com/jingcheng-chen/loadership/issues' target='_blank' className='text-[#827398]'>
              <strong>issues</strong>
            </a>{' '}
            and{' '}
            <a href='https://github.com/jingcheng-chen/loadership/discussions' target='_blank' className='text-[#827398]'>
              <strong>discussions</strong>
            </a>{' '}
          </p>
        </div>
        <h1 id='license' className='text-3xl font-extrabold text-gray-900 sm:text-4xl mt-12'>
          License
        </h1>
        <div className='mt-6 text-base font-normal leading-7 text-gray-600 '>
          <p>
            <span className='font-extrabold'>Loadership</span> is licensed under a <strong>MIT License</strong>. You can read the complete license below.
          </p>

          <code className='max-w-4xl gap-2 flex flex-col text-sm mt-8 bg-gray-100 p-4 rounded-md'>
            <p>MIT License</p>

            <p>Copyright (c) {new Date().getFullYear()} Loadership</p>

            <p>
              Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without
              restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
              Software is furnished to do so, subject to the following conditions:
            </p>

            <p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>

            <p>
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
              NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
              FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
            </p>
          </code>
        </div>
      </div>
    </section>
  );
};
