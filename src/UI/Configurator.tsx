import { useEffect, useState } from 'react';
import { NumberInput } from '../components/NumberInput';
import { CodeDisplay } from '../components/CodeDisplay';
import ReactDOMServer from 'react-dom/server';
import { ColorInput } from '../components/ColorInput';
import { Checkbox } from '../components/Checkbox';
import { getReverseColor } from '../utils';
import { Field } from '../components/Field';
import { LoaderClass } from '../loaders/Loader';
import { Bezier } from '../components/Bezier';

export const Configurator: React.FC<{ preview?: boolean; loader: LoaderClass; name?: string }> = ({ preview = false, loader, name }) => {
  const [backgroundColor, setBackgroundColor] = useState<string>('#d1d5db');
  const [showFrame, setShowFrame] = useState<boolean>(false);

  const [params, setParams] = useState<IConfiguratorParam>(loader.params);

  const controls = loader.controls;

  function updateParamValue(key: string, value: string | number | boolean) {
    loader.params[key] = value;
    setParams({ ...loader.params });
  }

  const forceUpdateParams = Object.keys(controls)
    .filter((p) => controls[p].forceUpdate)
    .map((p) => params[p]);

  useEffect(() => {
    loader.updateVersion();
    setParams({ ...loader.params });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, forceUpdateParams);

  if (preview) {
    return (
      <>
        <style>{loader.CSS}</style>
        <div>{loader.HTML}</div>
      </>
    );
  }

  const groups = Array.from(new Set(Object.values(controls).map((p) => p.group)));

  return (
    <>
      <style>{loader.CSS}</style>
      <section className='px-6 py-12 m-auto bg-white md:px-12 lg:px-16 max-w-7xl grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2 items-center w-full'>
        <section className='flex flex-col gap-6 w-full h-full border border-gray-200 bg-gray-100 rounded-t-xl md:rounded-s-xl md:border-r-0 md:rounded-none p-4'>
          <h2 className='text-2xl font-bold'>{name}</h2>
          {groups.map((group) => {
            const relaventControls: IConfiguratorControl = {};
            Object.keys(controls).forEach((c) => {
              const item = controls[c];
              if (item.group === group) relaventControls[c] = item;
            });
            return (
              <Field key={group} label={group}>
                {Object.keys(relaventControls).map((c) => {
                  const item = relaventControls[c];
                  if (item.type === 'number') {
                    return (
                      <NumberInput
                        key={c}
                        label={item.name}
                        value={params[c] as number}
                        onChange={(v) => {
                          updateParamValue(c, v);
                        }}
                        unit={item.unit}
                        min={item.min}
                        max={item.max}
                        step={item.step}
                      />
                    );
                  }
                  if (item.type === 'color') {
                    return (
                      <ColorInput
                        key={c}
                        label={item.name}
                        value={params[c] as string}
                        onChange={(v) => {
                          updateParamValue(c, v);
                        }}
                      />
                    );
                  }
                  if (item.type === 'boolean') {
                    return (
                      <Checkbox
                        key={c}
                        label={item.name}
                        value={params[c] as boolean}
                        onCheck={(v) => {
                          updateParamValue(c, v);
                        }}
                      />
                    );
                  }
                  if (item.type === 'bezier') {
                    return (
                      <Bezier
                        key={c}
                        value={params[c] as string}
                        onChange={(v: string) => {
                          updateParamValue(c, v);
                        }}
                      />
                    );
                  }
                })}
              </Field>
            );
          })}
        </section>
        <section className='flex flex-col w-full h-full mt-4 md:mt-0'>
          <div className='w-full px-4 py-1 border border-gray-200 bg-gray-100 md:rounded-tr-xl flex items-center gap-3 justify-end'>
            <Checkbox label='Show frame' value={showFrame} onCheck={setShowFrame} minimal />
            <ColorInput minimal label='Background color' value={backgroundColor} onChange={setBackgroundColor} />
          </div>
          <div style={{ backgroundColor }} className='flex justify-center items-center min-h-[300px] max-h-[500px] p-4 border-gray-200 bg-gradient-to-r border-x overflow-auto'>
            <div style={{ border: showFrame ? `dashed 1px ${getReverseColor(backgroundColor)}` : 'none' }}>{loader.HTML}</div>
          </div>
          <CodeDisplay css={loader.CSS} html={ReactDOMServer.renderToString(loader.HTML)} />
          <div className='w-full p-2 border border-gray-200 border-t-0 bg-gray-100 rounded-b-xl md:rounded-br-xl md:rounded-none'></div>
        </section>
      </section>
    </>
  );
};
