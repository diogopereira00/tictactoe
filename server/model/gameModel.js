const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  gameID: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  player1: {
    type: String,
    required: false,
    min: 3,
    max: 20,
    unique: false,
  },
  player2: {
    type: String,
    required: false,
    min: 3,
    max: 20,
    unique: false,
  },
  vencedor: {
    type: String,
    required: false,
    min: 3,
    max: 20,
    unique: false,
  },
  melhorde: {
    type: String,
    required: false,
    min: 3,
    max: 20,
    unique: false,
  },
  status: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: false,
  },
  createTime: {
    type: Date,
    required: false,
    unique: false,
  },
  endTime: {
    type: Date,
    required: false,
    unique: false,
  },
  public: {
    type: Boolean,
    required: false,
    default: false,
  },
});

module.exports = mongoose.model("Games", gameSchema);
