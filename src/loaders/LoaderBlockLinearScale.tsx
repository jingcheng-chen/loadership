import { Configurator } from '../UI/Configurator';
import { generateShortID } from '../utils';
import { LoaderClass } from './Loader';

export class LoaderBlockLinearScaleClass extends LoaderClass {
  public params: {
    paddingX: number;
    paddingY: number;
    loaderVersion: string;
    blockNum: number;
    blockWidth: number;
    blockHeight: number;
    blockScale: number;
    blockOpacity: number;
    blockColor: string;
    blockDistance: number;
    speed: number;
    pause: number;
    bezier: string;
  };

  constructor() {
    super();
    this.params = {
      paddingX: 0,
      paddingY: 0,
      loaderVersion: generateShortID(),
      blockNum: 5,
      blockWidth: 6,
      blockHeight: 20,
      blockScale: 3,
      blockOpacity: 1,
      blockDistance: 10,
      blockColor: '#ffffff',
      speed: 0.8,
      pause: 1.0,
      bezier: 'ease-in-out',
    };
    this.controls = {
      ...this.controls,
      blockNum: {
        name: 'Number of blocks',
        type: 'number',
        group: 'Block',
        forceUpdate: true,
        min: 1,
        max: 50,
        step: 1,
      },
      blockWidth: {
        name: 'Block width',
        type: 'number',
        group: 'Block',
        unit: 'px',
        min: 3,
        max: 50,
        step: 1,
      },
      blockHeight: {
        name: 'Block height',
        type: 'number',
        group: 'Block',
        unit: 'px',
        min: 3,
        max: 50,
        step: 1,
      },
      blockScale: {
        name: 'Block scale',
        type: 'number',
        group: 'Block',
        min: 1,
        max: 10,
        step: 0.01,
      },
      blockDistance: {
        name: 'Block distance',
        type: 'number',
        group: 'Block',
        unit: 'px',
        min: 0,
        max: 500,
        step: 1,
      },
      blockOpacity: {
        name: 'Block opacity',
        type: 'number',
        group: 'Block',
        min: 0,
        max: 1,
        step: 0.01,
      },
      blockColor: {
        name: 'Block color',
        type: 'color',
        group: 'Block',
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
      pause: {
        name: 'Pause time',
        type: 'number',
        group: 'Speed',
        min: 0,
        max: 5,
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
    return this.params.blockWidth + (this.params.blockNum - 1) * this.params.blockDistance + this.params.paddingX * 2;
  }

  public override get height(): number {
    return this.params.blockHeight * this.params.blockScale + this.params.paddingY * 2;
  }

  public override get HTML(): JSX.Element {
    return (
      <div className={`loadership_${this.params.loaderVersion}`}>
        {Array(this.params.blockNum)
          .fill(0)
          .map((_, i) => (
            <div key={i}></div>
          ))}
      </div>
    );
  }

  public override get CSS(): string {
    const tempStyles = Array(this.params.blockNum)
      .fill(0)
      .map(
        (_, i) =>
          `.loadership_${this.params.loaderVersion} div:nth-child(${i + 1}) {
              animation-delay: ${((this.params.speed / this.params.blockNum) * i).toFixed(2)}s;
              left: ${this.params.paddingX + i * this.params.blockDistance}px;
            }`
      )
      .join('\n');

    const actualAnimationPercent = this.params.speed / (this.params.speed + this.params.pause);

    const styles = `
       .loadership_${this.params.loaderVersion} {
          display: flex;
          position: relative;
          width: ${this.width}px;
          height: ${this.height}px;
        }

        .loadership_${this.params.loaderVersion} div {
          position: absolute;
          width: ${this.params.blockWidth}px;
          height: ${this.params.blockHeight}px;
          background: ${this.params.blockColor};
          top: ${this.params.paddingY + ((this.params.blockScale - 1) * this.params.blockHeight) / 2}px;
          animation: loadership_${this.params.loaderVersion}_scale ${this.params.speed + this.params.pause}s infinite, loadership_${this.params.loaderVersion}_fade ${
            this.params.speed + this.params.pause
          }s infinite;
          animation-timing-function: ${this.params.bezier};
        }
        
        ${tempStyles}
     
        @keyframes loadership_${this.params.loaderVersion}_scale {
          0%, ${actualAnimationPercent * 100}%, 100% {
            transform: scaleY(1);
          }
          ${actualAnimationPercent * 50}% {
            transform: scaleY(${this.params.blockScale});
          }
        }

        @keyframes loadership_${this.params.loaderVersion}_fade {
          0%, ${actualAnimationPercent * 100}%, 100% {
            opacity: ${this.params.blockOpacity};
          }
          ${actualAnimationPercent * 50}% {
            opacity: 1;
          }
        }
    
    `;
    return styles;
  }

  public override get SVG(): JSX.Element {
    const actualAnimationPercent = this.params.speed / (this.params.speed + this.params.pause);
    const duration = this.params.speed + this.params.pause;

    return (
      <svg width={this.width} height={this.height} viewBox={`0 0 ${this.width} ${this.height}`} xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <style>
            {`
              @keyframes scale_${this.params.loaderVersion} {
                0%, ${actualAnimationPercent * 100}%, 100% {
                  transform: scaleY(1);
                }
                ${actualAnimationPercent * 50}% {
                  transform: scaleY(${this.params.blockScale});
                }
              }
              
              @keyframes fade_${this.params.loaderVersion} {
                0%, ${actualAnimationPercent * 100}%, 100% {
                  opacity: ${this.params.blockOpacity};
                }
                ${actualAnimationPercent * 50}% {
                  opacity: 1;
                }
              }
            `}
          </style>
        </defs>

        {Array(this.params.blockNum)
          .fill(0)
          .map((_, i) => {
            const posX = this.params.paddingX + i * this.params.blockDistance;
            const posY = this.params.paddingY + ((this.params.blockScale - 1) * this.params.blockHeight) / 2;
            const animationDelay = ((this.params.speed / this.params.blockNum) * i).toFixed(2);

            return (
              <rect
                key={i}
                x={posX}
                y={posY}
                width={this.params.blockWidth}
                height={this.params.blockHeight}
                fill={this.params.blockColor}
                style={{
                  animationName: `scale_${this.params.loaderVersion}, fade_${this.params.loaderVersion}`,
                  animationDuration: `${duration}s, ${duration}s`,
                  animationIterationCount: 'infinite, infinite',
                  animationDelay: `${animationDelay}s, ${animationDelay}s`,
                  animationTimingFunction: this.params.bezier,
                  transformOrigin: `${posX + this.params.blockWidth / 2}px ${posY + this.params.blockHeight / 2}px`,
                }}
              />
            );
          })}
      </svg>
    );
  }
}

const loader = new LoaderBlockLinearScaleClass();
const name = 'Block Linear Scale';

export const LoaderBlockLinearScale: ILoader = {
  name,
  slug: 'block_linear_scale',
  date: new Date('2023/12/05'),
  component: <Configurator loader={loader} name={name} />,
  preview: <Configurator loader={loader} preview />,
};
