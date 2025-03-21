import { Link } from 'react-router';
import { useConfigStore } from '../state/state';

export const LoaderPreview: React.FC<{ loader: ILoader }> = ({ loader }) => {
  // if it is within a month of the loader's release date, show the "New" badge
  const isNew = (new Date().getTime() - loader.date.getTime()) / (1000 * 3600 * 24) < 10;
  const settings = useConfigStore().settings;

  return (
    <Link to={`/loaders/${loader.slug}`}>
      <div className='relative group cursor-pointer'>
        <div style={{ backgroundColor: settings.backgroundColor }} className='overflow-hidden aspect-w-1 aspect-h-1 bg-zinc-200 rounded-xl border border-mp'>
          <div className='object-cover w-full aspect-square transition-all duration-300 group-hover:scale-150 flex items-center justify-center content-center'>{loader.preview}</div>
        </div>
        {isNew && (
          <div className='absolute left-2 top-2 md:left-3 md:top-3'>
            <p className='sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-dp uppercase bg-white rounded-full'>New</p>
          </div>
        )}
        <div className='flex items-start justify-between mt-4 space-x-4'>
          <div>
            <h3 className='text-xs font-bold text-gray-900 sm:text-sm md:text-base transition-all duration-300 group-hover:indent-2'>{loader.name}</h3>
          </div>

          <div className='text-right'>
            <p className='text-xs font-bold text-gray-900 sm:text-sm md:text-base'></p>
          </div>
        </div>
      </div>
    </Link>
  );
};
