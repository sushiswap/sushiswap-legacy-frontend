# eccrypto-js [![npm version](https://badge.fury.io/js/eccrypto-js.svg)](https://badge.fury.io/js/eccrypto-js)

Elliptic curve cryptography library (NodeJS, Browser and Pure JS)

## Description

This library is a port from [eccrypto](https://github.com/bitchan/eccrypto) it makes use of native libraries on NodeJS and Browser enviroments with pure javascript fallbacks.

## Usage

### RandomBytes

```typescript
import * as eccryptoJS from 'eccrypto-js';

const length = 32;
const key = eccryptoJS.randomBytes(length);

// key.length === length
```

### AES

```typescript
import * as eccryptoJS from 'eccrypto-js';

const key = eccryptoJS.randomBytes(32);
const iv = eccryptoJS.randomBytes(16);

const str = 'test message to encrypt';
const msg = eccryptoJS.utf8ToBuffer(str);

const ciphertext = await eccryptoJS.aesCbcEncrypt(iv, key, msg);

const decrypted = await eccryptoJS.aesCbcDecrypt(iv, key, ciphertext);

// decrypted.toString() === str
```

### HMAC

```typescript
import * as eccryptoJS from 'eccrypto-js';

const key = eccryptoJS.randomBytes(32);
const iv = eccryptoJS.randomBytes(16);

const macKey = eccryptoJS.concatBuffers(iv, key);
const dataToMac = eccryptoJS.concatBuffers(iv, key, msg);

const mac = await eccryptoJS.hmacSha256Sign(macKey, dataToMac);

const result = await eccryptoJS.hmacSha256Verify(macKey, dataToMac, mac);

// result will return true if match
```

### SHA2

```typescript
import * as eccryptoJS from 'eccrypto-js';

// SHA256
const str = 'test message to hash';
const msg = eccryptoJS.utf8ToBuffer(str);
const hash = await eccryptoJS.sha256(str);

// SHA512
const str = 'test message to hash';
const msg = eccryptoJS.utf8ToBuffer(str);
const hash = await eccryptoJS.sha512(str);
```

### SHA3

```typescript
import * as eccryptoJS from 'eccrypto-js';

// SHA3
const str = 'test message to hash';
const msg = eccryptoJS.utf8ToBuffer(str);
const hash = await eccryptoJS.sha3(str);

// KECCAK256
const str = 'test message to hash';
const msg = eccryptoJS.utf8ToBuffer(str);
const hash = await eccryptoJS.keccak256(str);
```

### ECDSA

```typescript
import * as eccryptoJS from 'eccrypto-js';

const keyPair = eccryptoJS.generateKeyPair();

const str = 'test message to hash';
const msg = eccryptoJS.utf8ToBuffer(str);
const hash = await eccryptoJS.sha256(str);

const sig = await eccryptoJS.sign(keyPair.privateKey, hash);

await eccryptoJS.verify(keyPair.publicKey, msg, sig);

// verify will throw if signature is BAD
```

### ECDH

```typescript
import * as eccryptoJS from 'eccrypto-js';

const keyPairA = eccryptoJS.generateKeyPair();
const keyPairB = eccryptoJS.generateKeyPair();

const sharedKey1 = await eccryptoJS.derive(
  keyPairA.privateKey,
  keyPairB.publicKey
);

const sharedKey2 = await eccryptoJS.derive(
  keyPairB.privateKey,
  keyPairA.publicKey
);

// sharedKey1.toString('hex') === sharedKey2.toString('hex')
```

### ECIES

```typescript
import * as eccryptoJS from 'eccrypto-js';

const keyPair = eccryptoJS.generateKeyPair();

const str = 'test message to encrypt';
const msg = eccryptoJS.utf8ToBuffer(str);

const encrypted = await eccryptoJS.encrypt(keyPairB.publicKey, msg);

const decrypted = await eccryptoJS.decrypt(keyPairB.privateKey, encrypted);

// decrypted.toString() === str
```

## React-Native Support

This library is intended for use in a Browser or NodeJS environment, however it is possible to use in a React-Native environment if NodeJS modules are polyfilled with `react-native-crypto`, read more [here](https://github.com/tradle/react-native-crypto).

## License

[MIT License](LICENSE.md)
