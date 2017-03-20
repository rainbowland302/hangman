import Express from 'express'
import fs from 'fs'
import mongoose, { Schema } from 'mongoose'

import Train from '../models/Train'

export default () => {
  createTrainCollection()
}

const createTrainCollection = () => {
  fs.readFile('./server/resource/train.txt', 'utf8', (err, data) => {
    if (err) throw err
    let wordList = data.split('\n')

    console.log('start building train documents ')
    let trainDocuments = buildTrainDocuments(wordList)
    console.log('end building train documents')

    saveTrainDocuments(trainDocuments)
  })
}

const buildTrainDocuments = (wordList) => {
  let trainDocuments = {}
  for (let i = 0; i < wordList.length; i++) {
    let word = wordList[i]
    let length = word.length
    trainDocuments[length] = trainDocuments[length] || []
      //new word Schema
    let wordSchema = { word }
    word.split('').forEach((letter) => {
      wordSchema[letter] = true
    })

    trainDocuments[length].push(wordSchema)
  }
  return trainDocuments
}

const saveTrainDocuments = (trainDocuments) => {
  for (let key in trainDocuments) {
    console.log(key + ' ' + trainDocuments[key].length)
    let trainModel = new Train({
      trainList: trainDocuments[key],
      wordLength: key
    })
    trainModel.save(err => {
      if (err) throw err
      console.log('save')
    })
  }
}
