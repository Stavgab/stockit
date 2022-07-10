import {readFileSync} from 'fs';
import * as yaml from 'js-yaml';

import {join} from 'path';

const ENV_FILE = '../../.env';

export default () => {
    return yaml.load(
        readFileSync(join(__dirname, ENV_FILE), 'utf8'),
    ) as Record<string, any>;
};
