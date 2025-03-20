import { Configurator } from '../UI/Configurator';
import { generateShortID } from '../utils';
import { LoaderClass } from './Loader';

export class LoaderDotLinearMotionBlurClass extends LoaderClass {
  public params: {
    paddingX: number;
    paddingY: number;
    loaderVersion: string;
    dotSize: number;
    dotDistance: number;
    trailOpacity: number;
    trailScale: number;
    blurInterval: number;
    dotColor: string;
    speed: number;
    bezier: string;
    dotNum: number;
  };

  constructor() {
    super();
    this.params = {
      paddingX: 0,
      paddingY: 0,
      loaderVersion: generateShortID(),
      dotSize: 16,
      dotDistance: 80,
      trailOpacity: 0.3,
      trailScale: 0.25,
      blurInterval: 12,
      dotColor: '#ffffff',
      speed: 1.2,
      bezier: 'cubic-bezier(0.43, 0.03, 0.53, 0.93)',
      dotNum: 20,
    };
    this.controls = {
      ...this.controls,
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
        name: 'Travel distance',
        type: 'number',
        group: 'Dot',
        unit: 'px',
        min: 0,
        max: 500,
        step: 1,
      },
      trailOpacity: {
        name: 'Trail opacity',
        type: 'number',
        group: 'Dot',
        min: 0,
        max: 1,
        step: 0.01,
      },
      trailScale: {
        name: 'Trail scale',
        type: 'number',
        group: 'Dot',
        min: 0,
        max: 1,
        step: 0.01,
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
      blurInterval: {
        name: 'Blur interval',
        type: 'number',
        group: 'Speed',
        unit: 'ms',
        min: 0,
        max: 50,
        step: 1,
      },
      bezier: {
        name: 'Bezier',
        type: 'bezier',
        group: 'Animation',
      },
    };
  }

  public override get width(): number {
    return this.params.dotDistance + this.params.dotSize + this.params.paddingX * 2;
  }

  public override get height(): number {
    return this.params.dotSize + this.params.paddingY * 2;
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
    const tempStyles = Array(this.params.dotNum - 1)
      .fill(0)
      .map(
        (_, i) =>
          `.loadership_${this.params.loaderVersion} div:nth-child(${i + 2}) {
            animation-delay: ${(i + 1) * this.params.blurInterval}ms;
            opacity: ${(this.params.trailOpacity - (this.params.trailOpacity / this.params.dotNum) * i).toFixed(2)};
            width: ${this.params.dotSize * (1 - (i * this.params.trailScale) / this.params.dotNum)}px;
            height: ${this.params.dotSize * (1 - (i * this.params.trailScale) / this.params.dotNum)}px;
            top: ${(this.params.paddingY + (this.params.dotSize - this.params.dotSize * (1 - (i * this.params.trailScale) / this.params.dotNum)) / 2).toFixed(2)}px;
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
          top: ${this.params.paddingY.toFixed(2)}px;
          background: ${this.params.dotColor};
          animation: loadership_${this.params.loaderVersion}_move alternate ${this.params.speed}s infinite;
          animation-timing-function: ${this.params.bezier};
        }

        ${tempStyles}

        @keyframes loadership_${this.params.loaderVersion}_move {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(${this.params.dotDistance}px);
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
              @keyframes loadership_${this.params.loaderVersion}_move {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(${this.params.dotDistance}px);
                }
              }
            `}
          </style>
        </defs>

        {Array(this.params.dotNum)
          .fill(0)
          .map((_, i) => {
            const size = this.params.dotSize * (1 - (i * this.params.trailScale) / this.params.dotNum);
            return (
              <circle
                key={i}
                cx={this.params.paddingX + size / 2}
                cy={this.params.paddingY + (this.params.dotSize - size) / 2 + size / 2}
                r={size / 2}
                fill={this.params.dotColor}
                opacity={(this.params.trailOpacity - (this.params.trailOpacity / this.params.dotNum) * i).toFixed(2)}
                style={{
                  animationName: `loadership_${this.params.loaderVersion}_move`,
                  animationDuration: `${this.params.speed}s`,
                  animationTimingFunction: this.params.bezier,
                  animationIterationCount: 'infinite',
                  animationDirection: 'alternate',
                  animationDelay: `${i * this.params.blurInterval}ms`,
                  transformOrigin: `${this.params.paddingX + size / 2}px ${this.params.paddingY + (this.params.dotSize - size) / 2 + size / 2}px`,
                }}
              />
            );
          })}
      </svg>
    );
  }
}

const loader = new LoaderDotLinearMotionBlurClass();
const name = 'Dot Linear Motion Blur';

export const LoaderDotLinearMotionBlur: ILoader = {
  name,
  slug: 'dot_linear_motion_blur',
  date: new Date('2023/11/22'),
  component: <Configurator loader={loader} name={name} />,
  preview: <Configurator loader={loader} preview />,
};
