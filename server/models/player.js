import mongoose, { Schema } from 'mongoose';

// Sub document for Player
const WordSchema = new Schema({
  word: String,
  wrongTimes: {
    type: Number,
    default: 0
  },
  result: String
});

export default mongoose.model('Player', new Schema({
  email: String,
  sessionId: String,
  totalWordCount: {
    type: Number,
    default: 0
  },
  gameStatus: [WordSchema]
}));
