import { Configurator } from '../UI/Configurator';
import { generateShortID } from '../utils';
import { LoaderClass } from './Loader';

export class LoaderDotLinearWaveClass extends LoaderClass {
  public params: {
    paddingX: number;
    paddingY: number;
    loaderVersion: string;
    dotNum: number;
    dotSize: number;
    dotDistance: number;
    dotColor: string;
    bounceHeight: number;
    speed: number;
    bezier: string;
  };

  constructor() {
    super();
    this.params = {
      paddingX: 0,
      paddingY: 0,
      loaderVersion: generateShortID(),
      dotNum: 8,
      dotSize: 9,
      dotDistance: 11,
      dotColor: '#ffffff',
      bounceHeight: 36,
      speed: 1.2,
      bezier: 'cubic-bezier(.56,-0.01,.48,1)',
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
      bounceHeight: {
        name: 'Wave height',
        type: 'number',
        group: 'Dot',
        unit: 'px',
      },
      speed: {
        name: 'Speed',
        type: 'number',
        group: 'Speed',
        min: 0,
        max: 3,
        step: 0.01,
        unit: 's',
      },
      bezier: {
        name: 'Bezier',
        type: 'bezier',
        group: 'Animation',
      },
    };
  }

  public override get width(): number {
    return this.params.dotDistance * (this.params.dotNum - 1) + this.params.dotSize + this.params.paddingX * 2;
  }

  public override get height(): number {
    return this.params.dotSize + this.params.bounceHeight + this.params.paddingY * 2;
  }

  public override get HTML(): JSX.Element {
    return (
      <div className={`loadership_${this.params.loaderVersion}`}>
        {Array(this.params.dotNum)
          .fill(0)
          .map((_, i) => (
            <div key={i}></div>
          ))}
      </div>
    );
  }

  public override get CSS(): string {
    const tempStyles = Array(this.params.dotNum)
      .fill(0)
      .map(
        (_, i) =>
          `.loadership_${this.params.loaderVersion} div:nth-child(${i + 1}) {
              animation-delay: ${((this.params.speed / this.params.dotNum) * i).toFixed(2)}s;
              left: ${this.params.paddingX + i * this.params.dotDistance}px;
          }`
      )
      .join('\n');

    const styles = `
        .loadership_${this.params.loaderVersion} {
          display: flex;
          position: relative;
          width: ${this.width}px;
          height: ${this.height}px;
        }

        .loadership_${this.params.loaderVersion} div {
          position: absolute;
          top: ${this.params.paddingY}px;
          width: ${this.params.dotSize}px;
          height: ${this.params.dotSize}px;
          border-radius: 50%;
          background: ${this.params.dotColor};
          animation: loadership_${this.params.loaderVersion}_wave alternate ${this.params.speed}s infinite;
          animation-timing-function: ${this.params.bezier};
        }

        ${tempStyles}


        @keyframes loadership_${this.params.loaderVersion}_wave {
          0%, 100% { 
            transform: translatey(0px);
          }
          50% { 
            transform: translatey(${this.params.bounceHeight}px);
          }
        }
    `;
    return styles;
  }

  public override get SVG(): JSX.Element {
    return (
      <svg width={this.width} height={this.height} viewBox={`0 0 ${this.width} ${this.height}`} xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <style>
            {`
              @keyframes loadership_${this.params.loaderVersion}_wave {
                0%, 100% { 
                  transform: translateY(0);
                }
                50% { 
                  transform: translateY(${this.params.bounceHeight}px);
                }
              }
            `}
          </style>
        </defs>

        {Array(this.params.dotNum)
          .fill(0)
          .map((_, i) => {
            const posX = this.params.paddingX + i * this.params.dotDistance;
            const animationDelay = ((this.params.speed / this.params.dotNum) * i).toFixed(2);

            return (
              <circle
                key={i}
                cx={posX + this.params.dotSize / 2}
                cy={this.params.paddingY + this.params.dotSize / 2}
                r={this.params.dotSize / 2}
                fill={this.params.dotColor}
                style={{
                  animationName: `loadership_${this.params.loaderVersion}_wave`,
                  animationDuration: `${this.params.speed}s`,
                  animationIterationCount: 'infinite',
                  animationDirection: 'alternate',
                  animationTimingFunction: this.params.bezier,
                  animationDelay: `${animationDelay}s`,
                  transformOrigin: 'center',
                }}
              />
            );
          })}
      </svg>
    );
  }
}

const loader = new LoaderDotLinearWaveClass();
const name = 'Dot Linear Wave';

export const LoaderDotLinearWave: ILoader = {
  name,
  slug: 'dot_linear_wave',
  date: new Date('2023/11/22'),
  component: <Configurator loader={loader} name={name} />,
  preview: <Configurator loader={loader} preview />,
};
