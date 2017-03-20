import mongoose, { Schema } from 'mongoose'
mongoose.Promise = global.Promise
  // Sub document for Train
const WordSchema = new Schema({
  word: String,
  a: { type: Boolean, default: false },
  b: { type: Boolean, default: false },
  c: { type: Boolean, default: false },
  d: { type: Boolean, default: false },
  e: { type: Boolean, default: false },
  f: { type: Boolean, default: false },
  g: { type: Boolean, default: false },
  h: { type: Boolean, default: false },
  i: { type: Boolean, default: false },
  j: { type: Boolean, default: false },
  k: { type: Boolean, default: false },
  l: { type: Boolean, default: false },
  m: { type: Boolean, default: false },
  n: { type: Boolean, default: false },
  o: { type: Boolean, default: false },
  p: { type: Boolean, default: false },
  q: { type: Boolean, default: false },
  r: { type: Boolean, default: false },
  s: { type: Boolean, default: false },
  t: { type: Boolean, default: false },
  u: { type: Boolean, default: false },
  v: { type: Boolean, default: false },
  w: { type: Boolean, default: false },
  x: { type: Boolean, default: false },
  y: { type: Boolean, default: false },
  z: { type: Boolean, default: false }
})

export default mongoose.model('Train', new Schema({
  trainList: [WordSchema],
  wordLength: Number
}))
