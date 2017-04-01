import Express from 'express';
import fs from 'fs';
import mongoose, { Schema } from 'mongoose';

import Train from '../models/Train';

export default () => {
  createTrainCollection();
}

const createTrainCollection = () => {
  fs.readFile('./server/resource/train.txt', 'utf8', (err, data) => {
    if (err) throw err;
    const wordList = data.split('\n');

    console.log('start building train documents ');
    const trainDocuments = buildTrainDocuments(wordList);
    console.log('end building train documents');

    saveTrainDocuments(trainDocuments);
  })
};

const buildTrainDocuments = (wordList) => {
  const trainDocuments = {};
  for (let i = 0; i < wordList.length; i++) {
    const word = wordList[i];
    const length = word.length;
    trainDocuments[length] = trainDocuments[length] || [];
      //new word Schema
    const wordSchema = { word };
    word.split('').forEach((letter, index) => {
      wordSchema[letter] = index + 1;
    });

    trainDocuments[length].push(wordSchema);
  }
  return trainDocuments;
}

const saveTrainDocuments = (trainDocuments) => {
  for (let key in trainDocuments) {
    console.log(key + ' ' + trainDocuments[key].length);
    const trainModel = new Train({
      trainList: trainDocuments[key],
      wordLength: key
    });
    trainModel.save(err => {
      if (err) throw err
      console.log('save')
    });
  }
};
