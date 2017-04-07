import Express from 'express';
import fs from 'fs';
import mongoose, { Schema } from 'mongoose';

import Train from '../models/Train';

/*
Request:
{
  "include":  ["a", "b"],
  "exclude" : ["c", "d"],
  "length": 5
  "position":  1 //first letter, optional
}
Response:
{
  "letter": "e"
}
*/

export default (req, res) => {
  const body = req.body;
  const include = body.include || [];
  const exclude = body.exclude || [];
  const length = body.length;
  const position = body.position || 0;
  Train.aggregate(getAggregateQuery({ length, position, include, exclude }), (err, group) => {
    if (err) throw err;
    const freObj = group[0];
    let letter, max = 0;
    for (let key in freObj) {
      if (freObj[key] > max) {
        max = freObj[key];
        letter = key;
      }
      console.log(key + ': ' + freObj[key]);
    }
    res.json({
      letter: letter || 'z'
    });
  });
}

const getAggregateQuery = ({ length, position, include, exclude }) => {
  return [
    { $match: { wordLength: length } },
    { $unwind: '$trainList' },
    { $match: getMatchQuery({ include, exclude }) },
    { $project: getProjectQuery([...include, ...exclude], position) },
    { $group: getGroupQuery([...include, ...exclude]) }
  ];
};
/*
  {
    'trainList.a': { $gt: 0 },
    'trainList.b': 0
  }
*/
const getMatchQuery = ({ include, exclude }) => {
  return exclude.reduce((a, b) => {
    a[`trainList.${b}`] = 0;
    return a;
  }, include.reduce((a, b) => {
    a[`trainList.${b}`] = { $gt: 0 };
    return a;
  }, {}));
};
/*
  {
     $cond: [{ $eq: ['$trainList.a', position] }, 1, 0],
  }
  or
  {
    $cond: [{ $gt: ['$trainList.a', position] }, 1, 0]
  }
*/
// depends on whether front-end has position in payload
const getProjectQuery = (ignoreArr, position) => {
  const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
  return ALPHABET.split('')
    .filter(c => ignoreArr.indexOf(c) < 0)
    .reduce((a, b) => {
      a[b] = {
        $cond: position ? [{ $eq: [`$trainList.${b}`, position] }, 1, 0] : [{ $gt: [`$trainList.${b}`, position] }, 1, 0]
      };
      return a
    }, {});
};
/*
  {
    _id: null,
    b: { $sum: '$trainList.b' }
  }
*/
const getGroupQuery = (ignoreArr) => {
  const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
  return ALPHABET.split('')
    .filter(c => ignoreArr.indexOf(c) < 0)
    .reduce((a, b) => {
      a[b] = {
        $sum: `$${b}`
      }
      return a
    }, { _id: null });
};
