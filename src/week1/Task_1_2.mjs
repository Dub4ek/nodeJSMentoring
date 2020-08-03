import * as fs from 'fs';
import csv from 'csvtojson';

fs.createReadStream('./csv/data.csv')
  .on('error', (err) => console.log(err))
  .pipe(csv())
  .on('error', (err) => console.log(err))
  .pipe(fs.createWriteStream('data.txt'))
  .on('error', (err) => console.log(err))
