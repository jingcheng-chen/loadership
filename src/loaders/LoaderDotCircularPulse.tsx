import { Configurator } from '../UI/Configurator';
import { generateShortID } from '../utils';
import { LoaderClass } from './Loader';

export class LoaderDotCircularPulseClass extends LoaderClass {
  public params: {
    paddingX: number;
    paddingY: number;
    loaderVersion: string;
    loaderRadius: number;
    dotNum: number;
    dotSize: number;
    dotColor: string;
    speed: number;
    stackRate: number;
    bezier: string;
  };

  constructor() {
    super();
    this.params = {
      paddingX: 0,
      paddingY: 0,
      loaderVersion: generateShortID(),
      loaderRadius: 30,
      dotNum: 12,
      dotSize: 8,
      dotColor: '#ffffff',
      speed: 1.2,
      stackRate: 9 / 25,
      bezier: 'cubic-bezier(0.5, 0, 0.5, 1)',
    };
    this.controls = {
      ...this.controls,
      loaderRadius: {
        name: 'Loader radius',
        type: 'number',
        group: 'Loader',
        unit: 'px',
        min: 1,
        max: 100,
        step: 1,
      },
      dotNum: {
        name: 'Number of dots',
        type: 'number',
        group: 'Dot',
        forceUpdate: true,
        min: 1,
        max: 50,
        step: 1,
      },
      dotSize: {
        name: 'Dot size',
        type: 'number',
        group: 'Dot',
        unit: 'px',
        min: 3,
        max: 50,
        step: 1,
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
        max: 5,
        step: 0.01,
        unit: 's',
      },
      stackRate: {
        name: 'Stack rate',
        type: 'number',
        group: 'Speed',
        min: 0.01,
        max: 1,
        step: 0.01,
      },
      bezier: {
        name: 'Bezier',
        type: 'bezier',
        group: 'Animation',
      },
    };
  }

  public override get width(): number {
    return this.params.loaderRadius * 2 + this.params.dotSize + this.params.paddingX * 2;
  }

  public override get height(): number {
    return this.params.loaderRadius * 2 + this.params.dotSize + this.params.paddingY * 2;
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
              animation-delay: ${(((-this.params.speed * this.params.stackRate) / this.params.dotNum) * i).toFixed(2)}s;
            }
            .loadership_${this.params.loaderVersion} div:nth-child(${i + 1}):after {
              top: ${Math.round(this.params.loaderRadius * Math.cos((2 * Math.PI * i) / this.params.dotNum) + this.height / 2 - this.params.dotSize / 2)}px;
              left: ${Math.round(this.params.loaderRadius * Math.sin((2 * Math.PI * i) / this.params.dotNum) + this.width / 2 - this.params.dotSize / 2)}px;
            }
            
            `
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
          animation: loadership_${this.params.loaderVersion}_roller ${this.params.speed}s infinite;
          animation-timing-function: ${this.params.bezier};
          transform-origin: ${this.width / 2}px ${this.height / 2}px;
        }
        .loadership_${this.params.loaderVersion} div:after {
          content: " ";
          display: block;
          position: absolute;
          width: ${this.params.dotSize}px;
          height: ${this.params.dotSize}px;
          border-radius: 50%;
          background: ${this.params.dotColor};
        }
        
        ${tempStyles}
     
        @keyframes loadership_${this.params.loaderVersion}_roller {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
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
              @keyframes rotate_${this.params.loaderVersion} {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }
            `}
          </style>
        </defs>

        {Array(this.params.dotNum)
          .fill(0)
          .map((_, i) => {
            const centerX = this.width / 2;
            const centerY = this.height / 2;
            const angle = (2 * Math.PI * i) / this.params.dotNum;

            const dotX = Math.round(this.params.loaderRadius * Math.sin(angle) + centerX);
            const dotY = Math.round(this.params.loaderRadius * Math.cos(angle) + centerY);

            const animationDelay = (((-this.params.speed * this.params.stackRate) / this.params.dotNum) * i).toFixed(2);

            return (
              <circle
                key={i}
                cx={dotX}
                cy={dotY}
                r={this.params.dotSize / 2}
                fill={this.params.dotColor}
                style={{
                  animationName: `rotate_${this.params.loaderVersion}`,
                  animationDuration: `${this.params.speed}s`,
                  animationTimingFunction: this.params.bezier,
                  animationDelay: `${animationDelay}s`,
                  animationIterationCount: 'infinite',
                  transformOrigin: `${centerX}px ${centerY}px`,
                }}
              />
            );
          })}
      </svg>
    );
  }
}

const loader = new LoaderDotCircularPulseClass();
const name = 'Dot Circular Pulse';

export const LoaderDotCircularPulse: ILoader = {
  name,
  slug: 'dot_circular_pulse',
  date: new Date('2023/11/16'),
  component: <Configurator loader={loader} name={name} />,
  preview: <Configurator loader={loader} preview />,
};
