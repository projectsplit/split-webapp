import { ME_ID } from './constants';

export const fakeAccessToken = () => {
  const encode = (value: object) =>
    Buffer.from(JSON.stringify(value)).toString('base64url');
  return `${encode({ alg: 'none', typ: 'JWT' })}.${encode({
    sub: ME_ID,
    exp: 4_102_444_800,
  })}.e2e`;
};
