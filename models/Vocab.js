
const mongoose = require('mongoose');

const TuvungSchema = new mongoose.Schema(
  {
    kanji: {
      type: String,
      required: [true, 'Please provide kanji'],
      maxlength: 50,
    },
    hiragana: {
      type: String,
      required: [true, 'Please provide hỉagana'],
      maxlength: 50,
    },
    vn: {
      type: String,
      required: [true, 'Please provide vietnamese'],
      maxlength: 100,
    },
    en: {
      type: String,
       required: [true, 'Please provide engliah'],
      maxlength: 100,
    },
    hantu: {
      type: String,
      // required: [true, 'Please provide position'],
      maxlength: 100,
    },
    vdjp: {
      type: [String],
      required: true,
    },
    vdvn: {
      type: [String],
      required: true,
    },
    vden: {
      type: [String],
      required: true,
    },
    chude: {
      type: String,
      enum: ["人と人の関係", "暮らし", "家", "学校", "会社", "私の町", "健康", "お気に入り", "世界", "自然", "ニュース", "様子", "その他"],
      default: '人と人の関係',
    },
    image: {
      type: String,
      required: true,
      default: '/uploads/example.jpeg',
    },
    wordType: {
      type: String,
      enum: ['名', '動'],
      default: '名',
    },
    wordLevel: {
      type: String,
      enum: ['n1', 'n2', 'n3', 'n4', 'n4'],
      default: 'n1',
    },
    status: {
      type: String,
      enum: ['public', 'private'],
      default: 'public',
    },
    curriculum: {
      type: String,
      enum: ['tango', 'mimikara', 'kikutan', 'try', 'somatome'],
      default: 'tango',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model('TangoN1', TuvungSchema);
