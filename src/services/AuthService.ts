import { users } from '../users';

const secretKey = '123456';

export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
}

export  function login(username: string, password: string): string | null {
  try {
    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
      return null;
    }

    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };

    const payload = {
      userId: user.id,
      name: user.name,
    };

    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));

    const signature =  generateHmacSignature(`${encodedHeader}.${encodedPayload}`, secretKey);

    const token = `${encodedHeader}.${encodedPayload}.${signature}`;
    return token;
  } catch (error) {
    console.error(error);
    return null;
  }
}



export function getUserFromToken(token: string): string | null {
  const [encodedHeader, encodedPayload] = token.split('.');

  try {
    const header = JSON.parse(base64UrlDecode(encodedHeader));
    const payload = JSON.parse(base64UrlDecode(encodedPayload));

    if (header.alg !== 'HS256' || header.typ !== 'JWT') {
      throw new Error('Invalid token');
    }

    const { userId, name } = payload;
    const user = users.find((u) => u.id === userId);
    return user?.name || null;
  } catch {
    return null;
  }
}

 function base64UrlEncode(str: string): string {
  let base64 =  btoa(str);
  base64 = base64.replace('+', '-');
  base64 = base64.replace('/', '_');
  base64 = base64.replace(/=+$/, '');
  return base64;
}

function base64UrlDecode(str: string): string {
  let base64 = str;
  base64 = base64.replace('-', '+');
  base64 = base64.replace('_', '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
}

async function generateHmacSignature(data: string, key: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const keyBuffer = encoder.encode(key);

  const importedKey = await crypto.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign']
  );

  const signatureBuffer = await crypto.subtle.sign('HMAC', importedKey, dataBuffer);
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  const signatureString = await signatureArray.map((byte) => String.fromCharCode(byte)).join('');
  const result=await base64UrlEncode(signatureString);
  return result;
}


