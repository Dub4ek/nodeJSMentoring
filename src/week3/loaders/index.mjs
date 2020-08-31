import expressLoader from './express.mjs';
import sequilize from './sequilize.mjs';

export default async function ({expressApp}) {
  await sequilize();
  await expressLoader(expressApp);
}