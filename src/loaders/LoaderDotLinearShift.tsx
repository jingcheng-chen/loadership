import { Configurator } from '../UI/Configurator';
import { generateShortID } from '../utils';
import { LoaderClass } from './Loader';

export class LoaderDotLinearShiftClass extends LoaderClass {
  public params: {
    autoLoaderSize: boolean;
    loaderWidth: number;
    loaderHeight: number;
    loaderVersion: string;
    dotNum: number;
    dotSize: number;
    dotDistance: number;
    dotColor: string;
    speed: number;
    bezier: string;
  };

  constructor() {
    super();
    this.params = {
      autoLoaderSize: true,
      loaderWidth: 0,
      loaderHeight: 0,
      loaderVersion: generateShortID(),
      dotNum: 3,
      dotSize: 13,
      dotDistance: 24,
      dotColor: '#ffffff',
      speed: 0.6,
      bezier: 'cubic-bezier(0, 1, 1, 0)',
    };
    this.controls = {
      ...this.controls,
      dotNum: {
        name: 'Number of dots',
        type: 'number',
        group: 'Dot',
        forceUpdate: true,
        affectLoaderSize: true,
      },
      dotSize: {
        name: 'Dot size',
        type: 'number',
        group: 'Dot',
        unit: 'px',
        affectLoaderSize: true,
      },
      dotDistance: {
        name: 'Dot distance',
        type: 'number',
        group: 'Dot',
        unit: 'px',
        affectLoaderSize: true,
      },
      dotColor: {
        name: 'Dot color',
        type: 'color',
        group: 'Dot',
      },
      speed: {
        name: 'Speed',
        type: 'number',
        group: 'Speed',
        min: 0,
        max: 2,
        step: 0.05,
        unit: 's',
      },
    };
  }

  public override get PerfectWidth(): number {
    return this.params.dotDistance * (this.params.dotNum - 1) + this.params.dotSize;
  }

  public override get PerfectHeight(): number {
    return this.params.dotSize;
  }

  public override get HTML(): JSX.Element {
    return (
      <div className={`loadership_${this.params.loaderVersion}`}>
        {Array(this.params.dotNum + 1)
          .fill(0)
          .map((_, i) => (
            <div key={i}></div>
          ))}
      </div>
    );
  }

  public override get CSS(): string {
    const tempStyles = Array(this.params.dotNum - 1)
      .fill(0)
      .map(
        (_, i) =>
          `.loadership_${this.params.loaderVersion} div:nth-child(${i + 2}) {
              left: ${(this.params.loaderWidth - this.PerfectWidth) / 2 + i * this.params.dotDistance}px;
              animation: loadership_${this.params.loaderVersion}_translate ${this.params.speed}s infinite;
          }`
      )
      .join('\n');

    const styles = `
    .loadership_${this.params.loaderVersion} {
        display: flex;
        position: relative;
        width: ${this.params.loaderWidth}px;
        height: ${this.params.loaderHeight}px;
        }
        .loadership_${this.params.loaderVersion} div {
        position: absolute;
        top: ${(this.params.loaderHeight - this.PerfectHeight) / 2}px;
        width: ${this.params.dotSize}px;
        height: ${this.params.dotSize}px;
        border-radius: 50%;
        background: ${this.params.dotColor};
        animation-timing-function: ${this.params.bezier};
        }
        .loadership_${this.params.loaderVersion} div:nth-child(1) {
          left: ${(this.params.loaderWidth - this.PerfectWidth) / 2}px;
          animation: loadership_${this.params.loaderVersion}_scale_up ${this.params.speed}s infinite;
        }
        ${tempStyles}
        .loadership_${this.params.loaderVersion} div:nth-child(${this.params.dotNum + 1}) {
          left: ${(this.params.loaderWidth - this.PerfectWidth) / 2 + (this.params.dotNum - 1) * this.params.dotDistance}px;
          animation: loadership_${this.params.loaderVersion}_scale_down ${this.params.speed}s infinite;
        }
        @keyframes loadership_${this.params.loaderVersion}_scale_up {
          0% {
              transform: scale(0);
          }
          100% {
              transform: scale(1);
          }
        }
        @keyframes loadership_${this.params.loaderVersion}_scale_down {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0);
        }
        }
        @keyframes loadership_${this.params.loaderVersion}_translate {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(${this.params.dotDistance}px, 0);
        }
    }
    `;
    return styles;
  }
}

const loader = new LoaderDotLinearShiftClass();
const name = 'Loader Dot Linear Shift';

export const LoaderDotLinearShift: ILoader = {
  name,
  slug: 'loader_dot_linear_shift',
  date: new Date('2023/11/10'),
  component: <Configurator loader={loader} name={name} />,
  preview: <Configurator loader={loader} preview />,
};
