const Grammar = require('../models/Grammar');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const mongoose = require('mongoose');
const moment = require('moment');

const getAllGrammars = async (req, res) => {
  const { search, status, chude, searchLevel, sort, curriculum } = req.query;

  const queryObject = {
    // createdBy: req.user.userId,
  };

  if (search) {
    queryObject.hiragana = { $regex: search, $options: 'i' };
  }
  if (status && status !== 'all') {
    queryObject.status = status;
  }
  if (chude && chude !== 'all') {
    queryObject.chude = chude;
  }
  if (searchLevel && searchLevel !== 'all') {
    queryObject.grammarLevel = searchLevel;
  }
  if (curriculum && curriculum !== 'all') {
    queryObject.curriculum = curriculum;
  }
  let result = Grammar.find(queryObject);

  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }
  if (sort === 'a-z') {
    result = result.sort('hiragana');
  }
  if (sort === 'z-a') {
    result = result.sort('-hiragana');
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 30;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const grammars = await result;

  const totalGrammars = await Grammar.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalGrammars / limit);

  res.status(StatusCodes.OK).json({ grammars, numOfPages, totalGrammars });
};
const getGrammar = async (req, res) => {
  const {
    user: { userId },
    params: { id: grammarId },
  } = req;

  const grammar = await Grammar.findOne({
    _id: grammarId,
    createdBy: userId,
  });
  if (!grammar) {
    throw new NotFoundError(`No job with id ${grammarId}`);
  }
  res.status(StatusCodes.OK).json({ grammar });
};

const createGrammar = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const grammar = await Grammar.create(req.body);
  res.status(StatusCodes.CREATED).json({ grammar });
};

const updateGrammar = async (req, res) => {
  const {
    body: { kanji, hiragana, vn, },
    user: { userId },
    params: { id: grammarId },
  } = req;

  if (kanji === '' || hiragana === '' || vn === '') {
    throw new BadRequestError('kanji or hiragana fields cannot be empty');
  }
  const grammar = await Grammar.findByIdAndUpdate(
    { _id: grammarId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!grammar) {
    throw new NotFoundError(`No job with id ${grammarId}`);
  }
  res.status(StatusCodes.OK).json({ grammar });
};

const deleteGrammar = async (req, res) => {
  const {
    user: { userId },
    params: { id: grammarId },
  } = req;

  const grammar = await Grammar.findByIdAndRemove({
    _id: grammarId,
    createdBy: userId,
  });
  if (!grammar) {
    throw new NotFoundError(`No job with id ${grammarId}`);
  }
  res.status(StatusCodes.OK).send();
};

// const showStats = async (req, res) => {
//   let stats = await Vocab.aggregate([
//     { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
//     { $group: { _id: '$status', count: { $sum: 1 } } },
//   ]);

//   stats = stats.reduce((acc, curr) => {
//     const { _id: title, count } = curr;
//     acc[title] = count;
//     return acc;
//   }, {});

//   const defaultStats = {
//     public: stats.public || 0,
//     private: stats.private || 0,

//   };

//   let monthlyApplications = await Vocab.aggregate([
//     { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
//     {
//       $group: {
//         _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
//         count: { $sum: 1 },
//       },
//     },
//     { $sort: { '_id.year': -1, '_id.month': -1 } },
//     { $limit: 6 },
//   ]);

//   monthlyApplications = monthlyApplications.map((item) => {
//     const {
//       _id: { year, month },
//       count,
//     } = item;
//     const date = moment()
//       .month(month - 1)
//       .year(year)
//       .format('MMM Y');
//     return { date, count };
//   });

//   res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
// };

module.exports = {
  createGrammar,
  deleteGrammar,
  getAllGrammars,
  updateGrammar,
  getGrammar,
  // showStats,
};
