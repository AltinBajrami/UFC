const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const Fighter = require('../models/Fighter');
const Quote = require('../models/Quotes');

const getAll = async (req, res) => {
  const quotes = await Quote.find({}).populate('fighter');
  return res.status(StatusCodes.OK).json({ quotes });
};

const createQuote = async (req, res) => {
  const { quote, fighterId } = req.body;

  const fighterSchema = await Fighter.findById(fighterId);
  if (!fighterSchema) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Please provide a valid fighter ID' });
  }

  const newQuote = await Quote.create({
    quote,
    fighter: fighterSchema._id,
  });

  return res.status(StatusCodes.CREATED).json({ quote: newQuote });
};

const getSingleQuote = async (req, res) => {
  const { id } = req.params;
  const quote = await Quote.findById(id).populate('fighter');
  if (!quote) {
    throw new NotFoundError('quote not found!');
  }
  return res.status(StatusCodes.OK).json({ quote });
};

const updateQuote = async (req, res) => {
  const { id } = req.params;
  const { quote, fighterId } = req.body;

  const fighter = await Fighter.findById(fighterId);
  if (!fighter) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Please provide a valid fighter ID' });
  }
  const quoteSchema = await Quote.findById(id);
  if (!quoteSchema) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'quote not found' });
  }

  quoteSchema.quote = quote;
  quoteSchema.fighter = fighter._id;
  quoteSchema.createdAt = Data.now();
  await quoteSchema.save();
  return res.status(StatusCodes.OK).json({ quoteSchema });
};

const deleteQuote = async (req, res) => {
  const { id } = req.params;
  const quoteSchema = await Quote.findById(id);
  if (!quoteSchema) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'quote not found' });
  }
  await quoteSchema.deleteOne();
  return res.status(StatusCodes.OK).json({ msg: 'deleted' });
};

module.exports = {
  getAll,
  getSingleQuote,
  createQuote,
  updateQuote,
  deleteQuote,
};
