interface ILoader {
  name: string;
  slug: string;
  date: Date;
  description?: string;
  component: React.ReactNode;
  preview: React.ReactNode;
}

interface IConfiguratorControl {
  [key: string]: {
    name: string;
    type: 'number' | 'color' | 'boolean' | 'bezier';
    group: string;
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
    forceUpdate?: boolean;
    affectLoaderSize?: boolean;
  };
}

interface IConfiguratorParam {
  [key: string]: number | string | boolean;
}

interface IUserSettings {
  backgroundColor: string;
  showFrame: boolean;
  language: 'html' | 'css' | 'svg';
}
