import JwtGenerator from './jwt.util';
import HashGenerator from './hash.util';
import { CodeGenerator } from './generator.util';

const jwtGenerator = new JwtGenerator();
const hashGenerator = new HashGenerator();
const codeGenerator = new CodeGenerator();

export { jwtGenerator, hashGenerator, codeGenerator };
