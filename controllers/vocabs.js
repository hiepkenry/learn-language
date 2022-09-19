const Vocab = require('../models/Vocab');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const mongoose = require('mongoose');
const moment = require('moment');

const getAllVocabs = async (req, res) => {
  const { search, status, vocabType, vocabTitle, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.hiragana = { $regex: search, $options: 'i' };
  }
  if (status && status !== 'all') {
    queryObject.status = status;
  }
  if (vocabType && vocabType !== 'all') {
    queryObject.vocabType = vocabType;
  }
  let result = Vocab.find(queryObject);

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
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const vocabs = await result;

  const totalVocabs = await Vocab.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalVocabs / limit);

  res.status(StatusCodes.OK).json({ vocabs, numOfPages, numOfPages });
};
const getVocab = async (req, res) => {
  const {
    user: { userId },
    params: { id: vocabId },
  } = req;

  const vocab = await Vocab.findOne({
    _id: vocabId,
    createdBy: userId,
  });
  if (!vocab) {
    throw new NotFoundError(`No job with id ${vocabId}`);
  }
  res.status(StatusCodes.OK).json({ vocab });
};

const createVocab = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const vocab = await Vocab.create(req.body);
  res.status(StatusCodes.CREATED).json({ vocab });
};

const updateVocab = async (req, res) => {
  const {
    body: { kanji, hiragana, vn, },
    user: { userId },
    params: { id: vocabId },
  } = req;

  if (kanji === '' || hiragana === '' || vn === '') {
    throw new BadRequestError('Company or Position fields cannot be empty');
  }
  const vocab = await Vocab.findByIdAndUpdate(
    { _id: vocabId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!vocab) {
    throw new NotFoundError(`No job with id ${vocabId}`);
  }
  res.status(StatusCodes.OK).json({ vocab });
};

const deleteVocab = async (req, res) => {
  const {
    user: { userId },
    params: { id: vocabId },
  } = req;

  const vocab = await Vocab.findByIdAndRemove({
    _id: vocabId,
    createdBy: userId,
  });
  if (!vocab) {
    throw new NotFoundError(`No job with id ${vocabId}`);
  }
  res.status(StatusCodes.OK).send();
};

const showStats = async (req, res) => {
  let stats = await Vocab.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    public: stats.public || 0,
    private: stats.private || 0,

  };

  let monthlyApplications = await Vocab.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications.map((item) => {
    const {
      _id: { year, month },
      count,
    } = item;
    const date = moment()
      .month(month - 1)
      .year(year)
      .format('MMM Y');
    return { date, count };
  });

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

module.exports = {
  createVocab,
  deleteVocab,
  getAllVocabs,
  updateVocab,
  getVocab,
  showStats,
};
