import { Configurator } from '../UI/Configurator';
import { generateShortID } from '../utils';
import { LoaderClass } from './Loader';

export class LoaderDotSquareGridClass extends LoaderClass {
  public params: {
    paddingX: number;
    paddingY: number;
    loaderVersion: string;
    dotNum: number;
    dotSize: number;
    dotScale: number;
    dotOpacity: number;
    dotDistance: number;
    dotColor: string;
    speed: number;
  };

  constructor() {
    super();
    this.params = {
      paddingX: 0,
      paddingY: 0,
      loaderVersion: generateShortID(),
      dotNum: 3,
      dotSize: 13,
      dotScale: 0.7,
      dotOpacity: 0.5,
      dotDistance: 20,
      dotColor: '#ffffff',
      speed: 1.2,
    };
    this.controls = {
      ...this.controls,
      dotNum: {
        name: 'Number of dots',
        type: 'number',
        group: 'Dot',
        forceUpdate: true,
        min: 1,
        max: 10,
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
      dotScale: {
        name: 'Dot minimal scale',
        type: 'number',
        group: 'Dot',
        min: 0,
        max: 1,
        step: 0.01,
      },
      dotOpacity: {
        name: 'Dot minimal opacity',
        type: 'number',
        group: 'Dot',
        min: 0,
        max: 1,
        step: 0.01,
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
        min: 0,
        max: 5,
        step: 0.01,
        unit: 's',
      },
    };
  }

  public override get width(): number {
    return (this.params.dotNum - 1) * this.params.dotDistance + this.params.dotSize + this.params.paddingX * 2;
  }

  public override get height(): number {
    return (this.params.dotNum - 1) * this.params.dotDistance + this.params.dotSize + this.params.paddingY * 2;
  }

  public override get HTML(): JSX.Element {
    return (
      <div className={`loadership_${this.params.loaderVersion}`}>
        {Array(this.params.dotNum * this.params.dotNum)
          .fill(0)
          .map((_, i) => (
            <div key={i}></div>
          ))}
      </div>
    );
  }

  public override get CSS(): string {
    const tempStyles = Array(this.params.dotNum * this.params.dotNum)
      .fill(0)
      .map(
        (_, i) =>
          `.loadership_${this.params.loaderVersion} div:nth-child(${i + 1}) {
              animation-delay: ${(-this.params.speed * Math.random()).toFixed(2)}s;
              top: ${this.params.paddingY + (i % this.params.dotNum) * this.params.dotDistance}px;
              left: ${this.params.paddingX + ((i - (i % this.params.dotNum)) / this.params.dotNum) * this.params.dotDistance}px;
            }`
      )
      .join('\n');

    const fadeAnimation = `
      @keyframes loadership_${this.params.loaderVersion}_fade {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: ${this.params.dotOpacity};
        }
      }    
      @keyframes loadership_${this.params.loaderVersion}_scale {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(${this.params.dotScale.toFixed(2)});
        }
      }    
    `;

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
          animation: loadership_${this.params.loaderVersion}_fade ${this.params.speed}s linear infinite, loadership_${this.params.loaderVersion}_scale ${this.params.speed}s linear infinite;
        }
        
        ${tempStyles}
     
        ${fadeAnimation}
    
    `;
    return styles;
  }

  public override get SVG(): JSX.Element {
    return (
      <svg width={this.width} height={this.height} viewBox={`0 0 ${this.width} ${this.height}`} xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <style>
            {`
              @keyframes scale_${this.params.loaderVersion} {
                0%, 100% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(${this.params.dotScale.toFixed(2)});
                }
              }
              
              @keyframes fade_${this.params.loaderVersion} {
                0%, 100% {
                  opacity: 1;
                }
                50% {
                  opacity: ${this.params.dotOpacity};
                }
              }
            `}
          </style>
        </defs>

        {Array(this.params.dotNum * this.params.dotNum)
          .fill(0)
          .map((_, i) => {
            const row = i % this.params.dotNum;
            const col = Math.floor(i / this.params.dotNum);

            const posX = this.params.paddingX + col * this.params.dotDistance;
            const posY = this.params.paddingY + row * this.params.dotDistance;
            const animationDelay = (-this.params.speed * Math.random()).toFixed(2);

            return (
              <circle
                key={i}
                cx={posX + this.params.dotSize / 2}
                cy={posY + this.params.dotSize / 2}
                r={this.params.dotSize / 2}
                fill={this.params.dotColor}
                style={{
                  animation: `scale_${this.params.loaderVersion} ${this.params.speed}s linear infinite, fade_${this.params.loaderVersion} ${this.params.speed}s linear infinite`,
                  animationDelay: `${animationDelay}s`,
                  transformOrigin: `${posX + this.params.dotSize / 2}px ${posY + this.params.dotSize / 2}px`,
                }}
              />
            );
          })}
      </svg>
    );
  }
}

const loader = new LoaderDotSquareGridClass();
const name = 'Dot Square Grid';

export const LoaderDotSquareGrid: ILoader = {
  name,
  slug: 'dot_square_grid',
  date: new Date('2023/11/22'),
  component: <Configurator loader={loader} name={name} />,
  preview: <Configurator loader={loader} preview />,
};
