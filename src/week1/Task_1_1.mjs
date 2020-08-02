import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
});

const start = async () => {
  for await (const line of rl) {
    console.log(line.split('').reverse().join(''))
  }
}

start();





