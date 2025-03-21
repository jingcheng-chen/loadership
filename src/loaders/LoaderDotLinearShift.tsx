import { Configurator } from '../UI/Configurator';
import { generateShortID } from '../utils';
import { LoaderClass } from './Loader';

export class LoaderDotLinearShiftClass extends LoaderClass {
  public params: {
    paddingX: number;
    paddingY: number;
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
      paddingX: 0,
      paddingY: 0,
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
        min: 1,
        max: 15,
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
      dotDistance: {
        name: 'Dot distance',
        type: 'number',
        group: 'Dot',
        unit: 'px',
        min: 0,
        max: 100,
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
        min: 0.01,
        max: 5,
        step: 0.01,
        unit: 's',
      },
    };
  }

  public override get width(): number {
    return this.params.dotDistance * (this.params.dotNum - 1) + this.params.dotSize + this.params.paddingX * 2;
  }

  public override get height(): number {
    return this.params.dotSize + this.params.paddingY * 2;
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
              left: ${this.params.paddingX + i * this.params.dotDistance}px;
              animation: loadership_${this.params.loaderVersion}_translate ${this.params.speed}s infinite;
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
          width: ${this.params.dotSize}px;
          height: ${this.params.dotSize}px;
          border-radius: 50%;
          background: ${this.params.dotColor};
          top: ${this.params.paddingY}px;          
          animation-timing-function: ${this.params.bezier};
        }
        .loadership_${this.params.loaderVersion} div:nth-child(1) {
          left: ${this.params.paddingX}px;
          animation: loadership_${this.params.loaderVersion}_scale_up ${this.params.speed}s infinite;
        }
        ${tempStyles}
        .loadership_${this.params.loaderVersion} div:nth-child(${this.params.dotNum + 1}) {
          left: ${this.params.paddingX + (this.params.dotNum - 1) * this.params.dotDistance}px;
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

  public override get SVG(): JSX.Element {
    return (
      <svg width={this.width} height={this.height} viewBox={`0 0 ${this.width} ${this.height}`} xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <style>
            {`
              @keyframes scale_up_${this.params.loaderVersion} {
                0% {
                  transform: scale(0);
                }
                100% {
                  transform: scale(1);
                }
              }
              
              @keyframes scale_down_${this.params.loaderVersion} {
                0% {
                  transform: scale(1);
                }
                100% {
                  transform: scale(0);
                }
              }
              
              @keyframes translate_${this.params.loaderVersion} {
                0% {
                  transform: translate(0, 0);
                }
                100% {
                  transform: translate(${this.params.dotDistance}px, 0);
                }
              }
            `}
          </style>
        </defs>

        {/* First dot - scaling up */}
        <circle
          cx={this.params.paddingX + this.params.dotSize / 2}
          cy={this.params.paddingY + this.params.dotSize / 2}
          r={this.params.dotSize / 2}
          fill={this.params.dotColor}
          style={{
            animation: `scale_up_${this.params.loaderVersion} ${this.params.speed}s infinite`,
            animationTimingFunction: this.params.bezier,
            transformOrigin: `${this.params.paddingX + this.params.dotSize / 2}px ${this.params.paddingY + this.params.dotSize / 2}px`,
          }}
        />

        {/* Middle dots - translating */}
        {Array(this.params.dotNum - 1)
          .fill(0)
          .map((_, i) => {
            const posX = this.params.paddingX + i * this.params.dotDistance + this.params.dotSize / 2;
            const posY = this.params.paddingY + this.params.dotSize / 2;

            return (
              <circle
                key={i}
                cx={posX}
                cy={posY}
                r={this.params.dotSize / 2}
                fill={this.params.dotColor}
                style={{
                  animation: `translate_${this.params.loaderVersion} ${this.params.speed}s infinite`,
                  animationTimingFunction: this.params.bezier,
                }}
              />
            );
          })}

        {/* Last dot - scaling down */}
        <circle
          cx={this.params.paddingX + (this.params.dotNum - 1) * this.params.dotDistance + this.params.dotSize / 2}
          cy={this.params.paddingY + this.params.dotSize / 2}
          r={this.params.dotSize / 2}
          fill={this.params.dotColor}
          style={{
            animation: `scale_down_${this.params.loaderVersion} ${this.params.speed}s infinite`,
            animationTimingFunction: this.params.bezier,
            transformOrigin: `${this.params.paddingX + (this.params.dotNum - 1) * this.params.dotDistance + this.params.dotSize / 2}px ${this.params.paddingY + this.params.dotSize / 2}px`,
          }}
        />
      </svg>
    );
  }
}

const loader = new LoaderDotLinearShiftClass();
const name = 'Dot Linear Shift';

export const LoaderDotLinearShift: ILoader = {
  name,
  slug: 'dot_linear_shift',
  date: new Date('2023/11/10'),
  component: <Configurator loader={loader} name={name} />,
  preview: <Configurator loader={loader} preview />,
};
