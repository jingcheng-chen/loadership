import { Configurator } from '../UI/Configurator';
import { convertOpacityToHex, generateShortID } from '../utils';
import { LoaderClass } from './Loader';

export class LoaderStripeCircularDualClass extends LoaderClass {
  public params: {
    paddingX: number;
    paddingY: number;
    loaderVersion: string;
    loaderRadius: number;
    stripeWidth: number;
    stripePercentage: number;
    stripeBackgroundOpacity: number;
    stripeColor: string;
    speed: number;
    bezier: string;
  };

  constructor() {
    super();
    this.params = {
      paddingX: 0,
      paddingY: 0,
      loaderVersion: generateShortID(),
      loaderRadius: 30,
      stripeWidth: 10,
      stripePercentage: 0.4,
      stripeBackgroundOpacity: 0.2,
      stripeColor: '#ffffff',
      speed: 1.6,
      bezier: 'linear',
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
      stripeWidth: {
        name: 'Stripe width',
        type: 'number',
        group: 'Stripe',
        unit: 'px',
        min: 1,
        max: 50,
        step: 1,
      },
      stripePercentage: {
        name: 'Stripe percentage',
        type: 'number',
        group: 'Stripe',
        min: 0,
        max: 1,
        step: 0.01,
      },
      stripeBackgroundOpacity: {
        name: 'Opacity',
        type: 'number',
        group: 'Stripe',
        min: 0,
        max: 1,
        step: 0.01,
      },
      stripeColor: {
        name: 'Stripe color',
        type: 'color',
        group: 'Stripe',
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
      bezier: {
        name: 'Bezier',
        type: 'bezier',
        group: 'Animation',
      },
    };
  }

  public override get width(): number {
    return this.params.loaderRadius * 2 + this.params.stripeWidth + this.params.paddingX * 2;
  }

  public override get height(): number {
    return this.params.loaderRadius * 2 + this.params.stripeWidth + this.params.paddingY * 2;
  }

  public override get HTML(): JSX.Element {
    return (
      <div className={`loadership_${this.params.loaderVersion}`}>
        <div />
        <div />
      </div>
    );
  }

  public override get CSS(): string {
    let clipPath = '';
    if (this.params.stripePercentage > 0.5) {
      clipPath = `polygon(0 0, 50% 50%, 0 ${200 - this.params.stripePercentage * 200}%, 0 100%, 100% 100%, 50% 50%, 100% ${this.params.stripePercentage * 200 - 100}%, 100% 0)`;
    } else {
      clipPath = `polygon(50% 50%, 0 ${100 - this.params.stripePercentage * 200}%, 0 100%, 50% 50%, 100% ${this.params.stripePercentage * 200}%, 100% 0)`;
    }

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
          left: ${this.params.paddingX}px;
          width: ${this.params.loaderRadius * 2 + this.params.stripeWidth}px;
          height: ${this.params.loaderRadius * 2 + this.params.stripeWidth}px;
          border: ${this.params.stripeWidth}px solid ${this.params.stripeColor}${convertOpacityToHex(this.params.stripeBackgroundOpacity)};
          border-radius: 50%;
        }

        .loadership_${this.params.loaderVersion} div:nth-child(1) {
          border: ${this.params.stripeWidth}px solid ${this.params.stripeColor};
          clip-path: ${clipPath};
          animation: loadership_${this.params.loaderVersion}_spin ${this.params.speed}s infinite;
          animation-timing-function: ${this.params.bezier};
        }

        @keyframes loadership_${this.params.loaderVersion}_spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
    
    `;
    return styles;
  }

  public override get SVG(): JSX.Element {
    const centerX = this.width / 2;
    const centerY = this.height / 2;

    // Create points for the clip path based on the same logic as the CSS version
    let svgPoints = [];

    if (this.params.stripePercentage > 0.5) {
      // The angle for the top and bottom points based on stripe percentage
      const percentage = this.params.stripePercentage;
      const topY = ((percentage * 200 - 100) / 100) * this.height;
      const bottomY = ((200 - percentage * 200) / 100) * this.height;

      svgPoints = [
        [0, 0], // Top-left corner
        [centerX, centerY], // Center point
        [0, bottomY], // Left edge at calculated position
        [0, this.height], // Bottom-left corner
        [this.width, this.height], // Bottom-right corner
        [centerX, centerY], // Center point again
        [this.width, topY], // Right edge at calculated position
        [this.width, 0], // Top-right corner
      ];
    } else {
      // The angle for the left and right points based on stripe percentage
      const percentage = this.params.stripePercentage;
      const rightY = ((percentage * 200) / 100) * this.height;
      const leftY = ((100 - percentage * 200) / 100) * this.height;

      svgPoints = [
        [centerX, centerY], // Center point
        [0, leftY], // Left edge at calculated position
        [0, this.height], // Bottom-left corner
        [centerX, centerY], // Center point again
        [this.width, rightY], // Right edge at calculated position
        [this.width, 0], // Top-right corner
      ];
    }

    // Convert points array to SVG path data
    const pathData =
      svgPoints
        .map((point, index) => {
          return `${index === 0 ? 'M' : 'L'}${point[0]},${point[1]}`;
        })
        .join(' ') + ' Z';

    return (
      <svg width={this.width} height={this.height} viewBox={`0 0 ${this.width} ${this.height}`} xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <clipPath id={`clipPath_${this.params.loaderVersion}`}>
            <path d={pathData} />
          </clipPath>
        </defs>

        {/* Background circle with opacity */}
        <circle
          cx={centerX}
          cy={centerY}
          r={this.params.loaderRadius}
          fill='none'
          stroke={`${this.params.stripeColor}${convertOpacityToHex(this.params.stripeBackgroundOpacity)}`}
          strokeWidth={this.params.stripeWidth}
        />

        {/* Foreground circle with clip path */}
        <circle
          cx={centerX}
          cy={centerY}
          r={this.params.loaderRadius}
          fill='none'
          stroke={this.params.stripeColor}
          strokeWidth={this.params.stripeWidth}
          clipPath={`url(#clipPath_${this.params.loaderVersion})`}
          style={{
            transformOrigin: `${centerX}px ${centerY}px`,
            animationName: `loadership_${this.params.loaderVersion}_spin`,
            animationDuration: `${this.params.speed}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: this.params.bezier,
          }}
        />

        <style>
          {`
            @keyframes loadership_${this.params.loaderVersion}_spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </svg>
    );
  }
}

const loader = new LoaderStripeCircularDualClass();
const name = 'Stripe Circular Dual';

export const LoaderStripeCircularDual: ILoader = {
  name,
  slug: 'stripe_circular_dual',
  date: new Date('2023/11/26'),
  component: <Configurator loader={loader} name={name} />,
  preview: <Configurator loader={loader} preview />,
};
