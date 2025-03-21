import Prism from 'prismjs';
import 'prismjs/themes/prism-coy.min.css';
import * as prettier from 'prettier';
import htmlPlugin from 'prettier/plugins/html';
import cssPlugin from 'prettier/plugins/postcss';
import { useEffect, useState } from 'react';
import { Notification } from './Notification';

export const CodeDisplay: React.FC<{ html: string; css: string; svg: string; tab: 'html' | 'css' | 'svg'; setTab: (tab: 'html' | 'css' | 'svg') => void }> = ({ html, css, svg, tab, setTab }) => {
  const TabTitle = ({ title }: { title: 'html' | 'css' | 'svg' }) => (
    <li>
      <button
        onClick={() => setTab(title)}
        className={`inline-block w-full p-2 px-3 text-gray-600 hover:text-gray-800 bg-gray-100 border-r border-gray-200 ${tab === title ? 'bg-white border-b-0 rounded-t-md' : ''}`}
      >
        {title.toUpperCase()}
      </button>
    </li>
  );

  function copyToClipboard() {
    navigator.clipboard.writeText(tab === 'html' ? html : tab === 'css' ? css : svg);
    Notification.show('Copied to clipboard!');
  }

  return (
    <div className='relative border-gray-200 border-y border-x bg-gray-50 flex-grow'>
      <div className='grid w-full grid-cols-2 border-b border-gray-200 bg-gray-50 rounded-t-md'>
        <ul className='flex text-sm font-medium text-center text-gray-500'>
          <TabTitle title='html' />
          <TabTitle title='css' />
          <TabTitle title='svg' />
        </ul>
        <div className='flex justify-end'>
          <button
            onClick={copyToClipboard}
            type='button'
            data-copy-state='copy'
            className='flex items-center px-3 py-2 text-xs font-medium text-gray-600 bg-gray-100 border-l border-gray-200 hover:text-gray-800'
          >
            <svg className='w-3.5 h-3.5 mr-2' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 18 20'>
              <path d='M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z'></path>
              <path d='M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z'></path>
            </svg>{' '}
            <span>Copy to clipboard</span>
          </button>
        </div>
      </div>
      <div className='p-4 max-h-[700px] overflow-auto'>
        {tab === 'html' && <Code code={html} language='html' />}
        {tab === 'css' && <Code code={css} language='css' />}
        {tab === 'svg' && <Code code={svg} language='svg' />}
      </div>
    </div>
  );
};

const Code: React.FC<{ code: string; language: 'html' | 'css' | 'svg' }> = ({ code, language }) => {
  const [formattedCode, setFormattedCode] = useState<string>('');

  useEffect(() => {
    format();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, language]);

  async function format() {
    const parser = language === 'svg' ? 'html' : language;
    setFormattedCode(await prettier.format(code, { parser, plugins: [htmlPlugin, cssPlugin] }));
  }

  // Returns a highlighted HTML string
  const html = Prism.highlight(formattedCode, Prism.languages[language], language);

  return (
    <pre className='text-xs'>
      <code dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  );
};
