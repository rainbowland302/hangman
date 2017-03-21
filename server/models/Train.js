import mongoose, { Schema } from 'mongoose'
mongoose.Promise = global.Promise
  // Sub document for Train
const WordSchema = new Schema({
  word: String,
  a: { type: Number, default: 0 },
  b: { type: Number, default: 0 },
  c: { type: Number, default: 0 },
  d: { type: Number, default: 0 },
  e: { type: Number, default: 0 },
  f: { type: Number, default: 0 },
  g: { type: Number, default: 0 },
  h: { type: Number, default: 0 },
  i: { type: Number, default: 0 },
  j: { type: Number, default: 0 },
  k: { type: Number, default: 0 },
  l: { type: Number, default: 0 },
  m: { type: Number, default: 0 },
  n: { type: Number, default: 0 },
  o: { type: Number, default: 0 },
  p: { type: Number, default: 0 },
  q: { type: Number, default: 0 },
  r: { type: Number, default: 0 },
  s: { type: Number, default: 0 },
  t: { type: Number, default: 0 },
  u: { type: Number, default: 0 },
  v: { type: Number, default: 0 },
  w: { type: Number, default: 0 },
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
  z: { type: Number, default: 0 }
})

export default mongoose.model('Train', new Schema({
  trainList: [WordSchema],
  wordLength: Number
}))
