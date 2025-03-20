import { Line, Point3d, Vector3d } from 'open3d';
import { Configurator } from '../UI/Configurator';
import { generateShortID } from '../utils';
import { LoaderClass } from './Loader';

export class LoaderBlockGridScaleClass extends LoaderClass {
  public params: {
    paddingX: number;
    paddingY: number;
    loaderVersion: string;
    blockNum: number;
    blockSize: number;
    blockScale: number;
    blockOpacity: number;
    blockColor: string;
    blockGap: number;
    speed: number;
    pause: number;
    animationAngle: number;
    bezier: string;
  };

  constructor() {
    super();
    this.params = {
      paddingX: 0,
      paddingY: 0,
      loaderVersion: generateShortID(),
      blockNum: 3,
      blockSize: 18,
      blockScale: 0,
      blockOpacity: 1,
      blockGap: 0,
      blockColor: '#ffffff',
      speed: 0.9,
      pause: 1,
      animationAngle: 45,
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
        max: 10,
        step: 1,
      },
      blockSize: {
        name: 'Block size',
        type: 'number',
        group: 'Block',
        unit: 'px',
        min: 3,
        max: 50,
        step: 1,
      },
      blockGap: {
        name: 'Block gap',
        type: 'number',
        group: 'Block',
        unit: 'px',
        min: 0,
        max: 10,
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
      animationAngle: {
        name: 'Animation angle',
        type: 'number',
        group: 'Animation',
        unit: 'deg',
        min: 0,
        max: 360,
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
    return this.params.blockSize * this.params.blockNum + this.params.blockGap * (this.params.blockNum - 1) + this.params.paddingX * 2;
  }

  public override get height(): number {
    return this.params.blockSize * this.params.blockNum + this.params.blockGap * (this.params.blockNum - 1) + this.params.paddingY * 2;
  }

  public override get HTML(): JSX.Element {
    return (
      <div className={`loadership_${this.params.loaderVersion}`}>
        {Array(this.params.blockNum * this.params.blockNum)
          .fill(0)
          .map((_, i) => (
            <div key={i}></div>
          ))}
      </div>
    );
  }

  public override get CSS(): string {
    const tempStylesArray: string[] = [];
    const radian = (this.params.animationAngle * Math.PI) / 180;
    const origin = new Point3d(0, 0, 0);
    const p2 = new Point3d(1, Math.tan(radian), 0);
    const line = new Line(origin, p2).UnitDirection;
    const maxLength = Math.sqrt(2 * this.params.blockNum * this.params.blockNum);

    for (let i = 0; i < this.params.blockNum; i++) {
      for (let j = 0; j < this.params.blockNum; j++) {
        const index = i * this.params.blockNum + j;

        const point = new Vector3d(j, i, 0);
        const distance = Vector3d.DotProduct(point, line);

        const percent = distance / maxLength;

        tempStylesArray.push(
          `.loadership_${this.params.loaderVersion} div:nth-child(${index + 1}) {
            animation-delay: ${(this.params.speed * percent).toFixed(2)}s;
            top: ${this.params.paddingY + i * this.params.blockSize + (i - 1) * this.params.blockGap}px;
            left: ${this.params.paddingX + j * this.params.blockSize + (j - 1) * this.params.blockGap}px;
          }`
        );
      }
    }

    const tempStyles = tempStylesArray.join('\n');

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
          width: ${this.params.blockSize}px;
          height: ${this.params.blockSize}px;
          background: ${this.params.blockColor};
          animation: loadership_${this.params.loaderVersion}_scale ${this.params.speed + this.params.pause}s infinite, loadership_${this.params.loaderVersion}_fade ${
            this.params.speed + this.params.pause
          }s infinite;
          animation-timing-function: ${this.params.bezier};
        }
        
        ${tempStyles}
     
        @keyframes loadership_${this.params.loaderVersion}_scale {
          0%, ${actualAnimationPercent * 100}%, 100% {
            transform: scale(1);
          }
          ${actualAnimationPercent * 50}% {
            transform: scale(${this.params.blockScale});
          }
        }

        @keyframes loadership_${this.params.loaderVersion}_fade {
          0%, ${actualAnimationPercent * 100}%, 100% {
            opacity: 1;
          }
          ${actualAnimationPercent * 50}% {
            opacity: ${this.params.blockOpacity};
          }
        }
    
    `;
    return styles;
  }

  public override get SVG(): JSX.Element {
    const radian = (this.params.animationAngle * Math.PI) / 180;
    const origin = new Point3d(0, 0, 0);
    const p2 = new Point3d(1, Math.tan(radian), 0);
    const line = new Line(origin, p2).UnitDirection;
    const maxLength = Math.sqrt(2 * this.params.blockNum * this.params.blockNum);
    const actualAnimationPercent = this.params.speed / (this.params.speed + this.params.pause);

    const blocks = [];

    for (let i = 0; i < this.params.blockNum; i++) {
      for (let j = 0; j < this.params.blockNum; j++) {
        const point = new Vector3d(j, i, 0);
        const distance = Vector3d.DotProduct(point, line);
        const percent = distance / maxLength;
        const animationDelay = (this.params.speed * percent).toFixed(2);

        const x = this.params.paddingX + j * this.params.blockSize + (j - 1) * this.params.blockGap;
        const y = this.params.paddingY + i * this.params.blockSize + (i - 1) * this.params.blockGap;

        blocks.push(
          <rect key={`${i}-${j}`} x={x} y={y} width={this.params.blockSize} height={this.params.blockSize} fill={this.params.blockColor} opacity='1'>
            <animate
              attributeName='transform'
              attributeType='XML'
              type='scale'
              from='1'
              to={String(this.params.blockScale)}
              dur={`${this.params.speed + this.params.pause}s`}
              begin={`${animationDelay}s`}
              repeatCount='indefinite'
              keyTimes={`0;${actualAnimationPercent * 0.5};${actualAnimationPercent};1`}
              values={`1;${this.params.blockScale};1;1`}
              calcMode='spline'
              keySplines={this.getSVGBezier()}
            />
            <animate
              attributeName='opacity'
              from='1'
              to={String(this.params.blockOpacity)}
              dur={`${this.params.speed + this.params.pause}s`}
              begin={`${animationDelay}s`}
              repeatCount='indefinite'
              keyTimes={`0;${actualAnimationPercent * 0.5};${actualAnimationPercent};1`}
              values={`1;${this.params.blockOpacity};1;1`}
              calcMode='spline'
              keySplines={this.getSVGBezier()}
            />
          </rect>
        );
      }
    }

    return (
      <svg xmlns='http://www.w3.org/2000/svg' width={this.width} height={this.height} viewBox={`0 0 ${this.width} ${this.height}`}>
        {blocks}
      </svg>
    );
  }

  private getSVGBezier(): string {
    if (this.params.bezier === 'ease-in-out') {
      return '0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1';
    }

    const match = this.params.bezier.match(/cubic-bezier\(([\d.]+),\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)\)/);
    if (match) {
      const values = match.slice(1, 5).join(' ');
      return `${values}; ${values}; ${values}`;
    }

    return '0 0 1 1; 0 0 1 1; 0 0 1 1';
  }
}

const loader = new LoaderBlockGridScaleClass();
const name = 'Block Grid Scale';

export const LoaderBlockGridScale: ILoader = {
  name,
  slug: 'block_grid_scale',
  date: new Date('2023/12/05'),
  component: <Configurator loader={loader} name={name} />,
  preview: <Configurator loader={loader} preview />,
};
