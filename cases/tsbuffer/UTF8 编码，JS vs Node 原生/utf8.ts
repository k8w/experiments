import { Utf8CoderJS } from './Utf8Coder';

console.log('字符串UTF8编码，JS VS NodeJS原生\n');

let str = 'a'.repeat(20);

const N = 10000;

console.time('Utf8CoderJS.measureLength');
for (let i = 0; i < N; ++i) {
  Utf8CoderJS.measureLength(str);
}
console.timeEnd('Utf8CoderJS.measureLength');

console.time('NodeJS measureLength');
for (let i = 0; i < N; ++i) {
  Buffer.byteLength(str);
}
console.timeEnd('NodeJS measureLength');
console.log('\n');

let length = Buffer.byteLength(str);
let toWrite = new Uint8Array(length);
console.time('Utf8CoderJS.write');
for (let i = 0; i < N; ++i) {
  Utf8CoderJS.write(str, toWrite, 0);
}
console.timeEnd('Utf8CoderJS.write');

console.time('NodeJS write');
for (let i = 0; i < N; ++i) {
  Buffer.from(toWrite.buffer, toWrite.byteOffset, toWrite.byteLength).write(
    str,
    'utf-8'
  );
}
console.timeEnd('NodeJS write');
console.log('\n');

let writedBuf = Buffer.from(str, 'utf-8');
console.time('Utf8CoderJS.read');
for (let i = 0; i < N; ++i) {
  Utf8CoderJS.read(writedBuf, 0, length);
}
console.timeEnd('Utf8CoderJS.read');

console.time('NodeJS read');
for (let i = 0; i < N; ++i) {
  writedBuf.toString('utf-8');
}
console.timeEnd('NodeJS read');
