
const mongoose = require('mongoose');

const KanjiSchema = new mongoose.Schema(
  {
    kanji: {
      type: String,
      required: [true, 'Please provide kanji'],
      maxlength: 100,
    },
    amhan: {
      type: String,
      // required: [true, 'Please provide hỉagana'],
      maxlength: 100,
    },
    amOn: {
      type: String,
      // required: [true, 'Please provide hỉagana'],
      maxlength: 100,
    },
    amKun: {
      type: String,
      // required: [true, 'Please provide hỉagana'],
      maxlength: 100,
    },
    nghia: {
      type: String,
      required: [true, 'Please provide vietnamese'],
      maxlength: 200,
    },

    bo: {
      type: String,
      // required: [true, 'Please provide engliah'],
      maxlength: 200,
    },

    vd: {
      type: [String],
      required: true,
    },

    chude: {
      type: String,
      enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '10以上'],
      default: '2',
    },

    kanjiLevel: {
      type: String,
      enum: ['n1', 'n2', 'n3', 'n4', 'n4'],
      default: 'n1',
    },
    status: {
      type: String,
      enum: ['public', 'private'],
      default: 'public',
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model('Kanji', KanjiSchema);
