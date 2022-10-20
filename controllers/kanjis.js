const Kanji = require('../models/Kanji');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const mongoose = require('mongoose');
const moment = require('moment');


const getAllKanjis = async (req, res) => {
  const { search, status, chude, searchLevel, sort } = req.query;

  const queryObject = {
    // createdBy: req.user.userId,
  };

  if (search) {
    queryObject.bo = { $regex: search, $options: 'i' };
  }
  if (status && status !== 'all') {
    queryObject.status = status;
  }
  if (chude && chude !== 'all') {
    queryObject.chude = chude;
  }
  if (searchLevel && searchLevel !== 'all') {
    queryObject.searchLevel = searchLevel;
  }

  let result = Kanji.find(queryObject);

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

  const Kanjis = await result;

  const totalKanjis = await Kanji.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalKanjis / limit);

  res.status(StatusCodes.OK).json({ Kanjis, numOfPages, totalKanjis });
};
const getKanji = async (req, res) => {
  const {
    user: { userId },
    params: { id: KanjiId },
  } = req;

  const Kanji = await Kanji.findOne({
    _id: KanjiId,
    createdBy: userId,
  });
  if (!Kanji) {
    throw new NotFoundError(`No Kanji with id ${KanjiId}`);
  }
  res.status(StatusCodes.OK).json({ Kanji });
};

const createKanji = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const Kanji = await Kanji.create(req.body);
  res.status(StatusCodes.CREATED).json({ Kanji });
};

const updateKanji = async (req, res) => {
  const {
    body: { kanji, bo, amhan, },
    user: { userId },
    params: { id: KanjiId },
  } = req;

  if (kanji === '' || bo === '' || amhan === '') {
    throw new BadRequestError('kanji or bo fields cannot be empty');
  }
  const Kanji = await Kanji.findByIdAndUpdate(
    { _id: KanjiId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!Kanji) {
    throw new NotFoundError(`No Kanji with id ${KanjiId}`);
  }
  res.status(StatusCodes.OK).json({ Kanji });
};

const deleteKanji = async (req, res) => {
  const {
    user: { userId },
    params: { id: KanjiId },
  } = req;

  const Kanji = await Kanji.findByIdAndRemove({
    _id: KanjiId,
    createdBy: userId,
  });
  if (!Kanji) {
    throw new NotFoundError(`No job with id ${KanjiId}`);
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
  createKanji,
  deleteKanji,
  getAllKanjis,
  updateKanji,
  getKanji,
  // showStats,
};
