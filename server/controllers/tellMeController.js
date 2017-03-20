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
  const include = body.include
  const exclude = body.exclude
  let letter
  res.json({
    letter: letter
  })
}
