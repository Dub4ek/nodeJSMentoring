import * as fs from 'fs';
import csv from 'csvtojson';

const csvConfig = {
  colParser:{
    "book": "string",
    "author": "string",
    "price": "number",
    "Amount": "omit"
  },
};

fs.createReadStream('./csv/data.csv')
  .on('error', (err) => console.log(err))
  .pipe(csv(csvConfig))
  .on('error', (err) => console.log(err))
  .pipe(fs.createWriteStream('data.txt'))
  .on('error', (err) => console.log(err))
