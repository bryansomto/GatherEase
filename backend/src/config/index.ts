import { devConfig } from './dev.config';
import { prodConfig } from './prod.config';

const appConfig = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;

export default appConfig;
