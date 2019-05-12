import { get as env } from 'env-var';

const parseEnvVar = (key: string, defaultValue: string) => env(key, defaultValue).asString();
export default parseEnvVar;