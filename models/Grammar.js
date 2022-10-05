
const mongoose = require('mongoose');

const GrammarSchema = new mongoose.Schema(
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
      // required: [true, 'Please provide engliah'],
      maxlength: 100,
    },
    explain: {
      type: String,
      required: [true, 'Please provide vietnamese'],
      maxlength: 300,

    },
    howtouse: {
      type: String,
      required: [true, 'Please provide vietnamese'],
      maxlength: 300,

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
      // required: true,
    },
    chude: {
      type: String,
      enum: ["時間関係", "範囲の始まり・限度", "限定・日限定・付加", "例示", "関連・無関係", "様子", "付随行動", "逆接", "条件", "逆接条件", "目的・手段", "原因・理由", "可能・不可能・禁止", "話題・評価の基準", "比較対照", "結末・最終の状態", "強調", "主張・断定", "評価・感想", "心情・強制的思う"],
      default: '時間関係',
    },

    grammarLevel: {
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

module.exports = mongoose.model('Grammar', GrammarSchema);
