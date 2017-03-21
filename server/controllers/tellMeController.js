import Express from 'express'
import fs from 'fs'
import mongoose, { Schema } from 'mongoose'

import Train from '../models/Train'

/*
Request:
{
  "include":  ["a", "b"],
  "exclude" : ["c", "d"],
  "length": 5
}
Response:
{
  "letter": "e"
}
*/

export default (req, res) => {
  const body = req.body
  const include = body.include || []
  const exclude = body.exclude || []
  const length = body.length
  Train.aggregate(getAggregateQuery({ length, include, exclude }), (err, group) => {
    if (err) throw err
    const freObj = group[0]
    let letter, max = 0
    for (let key in freObj) {
      if (freObj[key] > max) {
        max = freObj[key]
        letter = key
      }
      console.log(key + ': ' + freObj[key])
    }
    res.json({
      letter: letter
    })
  })
}

const getAggregateQuery = ({ length, include, exclude }) => {
  return [
    { $match: { wordLength: length } },
    { $unwind: '$trainList' },
    { $match: getMatchQuery({ include, exclude }) },
    { $group: getGroupQuery([...include, ...exclude]) }
  ]
}

const getMatchQuery = ({ include, exclude }) => {
  return exclude.reduce((a, b) => {
    a[`trainList.${b}`] = 0
    return a
  }, include.reduce((a, b) => {
    a[`trainList.${b}`] = 1
    return a
  }, {}))
}

const getGroupQuery = (ignoreArr) => {
  const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
  return ALPHABET.split('')
    .filter(c => ignoreArr.indexOf(c) < 0)
    .reduce((a, b) => {
      a[b] = {
        $sum: `$trainList.${b}`
      }
      return a
    }, { _id: null })
}
