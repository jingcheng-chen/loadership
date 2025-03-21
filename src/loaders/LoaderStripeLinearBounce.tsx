import { Configurator } from '../UI/Configurator';
import { generateShortID } from '../utils';
import { LoaderClass } from './Loader';

export class LoaderStripeLinearBounceClass extends LoaderClass {
  public params: {
    paddingX: number;
    paddingY: number;
    loaderVersion: string;
    stripeWidth: number;
    stripeLength: number;
    stripeRadius: number;
    totalLength: number;
    stripeColor: string;
    stripeOpacity: number;
    speed: number;
    bezier: string;
  };

  constructor() {
    super();
    this.params = {
      paddingX: 0,
      paddingY: 0,
      loaderVersion: generateShortID(),
      stripeWidth: 8,
      stripeLength: 40,
      stripeRadius: 4,
      totalLength: 90,
      stripeColor: '#ffffff',
      stripeOpacity: 0.3,
      speed: 1,
      bezier: 'cubic-bezier(0.5, 0, 0.5, 1)',
    };
    this.controls = {
      ...this.controls,
      stripeWidth: {
        name: 'Stripe width',
        type: 'number',
        group: 'Stripe',
        unit: 'px',
        min: 1,
        max: 50,
        step: 1,
      },
      stripeLength: {
        name: 'Stripe length',
        type: 'number',
        group: 'Stripe',
        unit: 'px',
        min: 1,
        max: 500,
        step: 1,
      },
      stripeRadius: {
        name: 'Corner radius',
        type: 'number',
        group: 'Stripe',
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
      },
      totalLength: {
        name: 'Total length',
        type: 'number',
        group: 'Stripe',
        unit: 'px',
        min: 1,
        max: 500,
        step: 1,
      },
      stripeOpacity: {
        name: 'Stripe opacity',
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
      },
      bezier: {
        name: 'Bezier',
        type: 'bezier',
        group: 'Animation',
      },
    };
  }

  public override get width(): number {
    return this.params.totalLength + this.params.paddingX * 2;
  }

  public override get height(): number {
    return this.params.stripeWidth + this.params.paddingY * 2;
  }

  public override get HTML(): JSX.Element {
    return (
      <div className={`loadership_${this.params.loaderVersion}`}>
        <div></div>
        <div></div>
      </div>
    );
  }

  public override get CSS(): string {
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
          height: ${this.params.stripeWidth}px;
          border-radius: ${this.params.stripeRadius}px;
          background: ${this.params.stripeColor};
        }

        .loadership_${this.params.loaderVersion} div:nth-child(1) {
          width: ${this.params.totalLength}px;
          opacity: ${this.params.stripeOpacity};
        }

        .loadership_${this.params.loaderVersion} div:nth-child(2) {
          width: ${this.params.stripeLength}px;
          animation: loadership_${this.params.loaderVersion}_move alternate ${this.params.speed}s infinite;
          animation-timing-function: ${this.params.bezier};
        }

        @keyframes loadership_${this.params.loaderVersion}_move {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(${this.params.totalLength - this.params.stripeLength}px);
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
              @keyframes move_${this.params.loaderVersion} {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(${this.params.totalLength - this.params.stripeLength}px);
                }
              }
            `}
          </style>
        </defs>

        {/* Background stripe with reduced opacity */}
        <rect
          x={this.params.paddingX}
          y={this.params.paddingY}
          width={this.params.totalLength}
          height={this.params.stripeWidth}
          rx={this.params.stripeRadius}
          ry={this.params.stripeRadius}
          fill={this.params.stripeColor}
          opacity={this.params.stripeOpacity}
        />

        {/* Moving stripe */}
        <rect
          x={this.params.paddingX}
          y={this.params.paddingY}
          width={this.params.stripeLength}
          height={this.params.stripeWidth}
          rx={this.params.stripeRadius}
          ry={this.params.stripeRadius}
          fill={this.params.stripeColor}
          style={{
            animationName: `move_${this.params.loaderVersion}`,
            animationDuration: `${this.params.speed}s`,
            animationIterationCount: 'infinite',
            animationDirection: 'alternate',
            animationTimingFunction: this.params.bezier,
          }}
        />
      </svg>
    );
  }
}

const loader = new LoaderStripeLinearBounceClass();
const name = 'Stripe Linear Bounce';

export const LoaderStripeLinearBounce: ILoader = {
  name,
  slug: 'stripe_linear_bounce',
  date: new Date('2023/11/22'),
  component: <Configurator loader={loader} name={name} />,
  preview: <Configurator loader={loader} preview />,
};
