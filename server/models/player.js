import mongoose, { Schema } from 'mongoose'

import wordList from '../resource/wordList'

// Sub document for Player
const WordSchema = new Schema({
    word: String,
    wrongTimes: {
        type: Number,
        default: 0
    },
    result: String
})

export default mongoose.model('Player', new Schema({
    email: String,
    sessionId: String,
    totalWordCount: {
        type: Number,
        default: 0
    },
    gameStatus: {
        type: [WordSchema],
        default: () => {
            const res = []
            wordList.forEach((word) => {
                res.push({ word: word, result: word.replace(/\w/g, '*') })
            })
            return res
        }
    }
}))