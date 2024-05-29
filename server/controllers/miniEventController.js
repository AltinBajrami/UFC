const { StatusCodes } = require('http-status-codes');
const sql = require('../utils/db');
const { BadRequestError } = require('../errors');

const createMiniEvent = async (req, res) => {
  const { eventTypeName } = req.body;
  if (!eventTypeName) throw new BadRequestError('eventTypeName is required');

  const result = await sql`
          INSERT INTO MiniEvents (eventTypeName)
          VALUES (${eventTypeName})
          RETURNING *
        `;
  res.status(StatusCodes.OK).json(result[0]);
};

const getAllMiniEvents = async (req, res) => {
  try {
    const result = await sql`
          SELECT * FROM MiniEvents
        `;
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error('Error getting mini-events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getMiniEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sql`
          SELECT * FROM MiniEvents
          WHERE miniEventId = ${id}
        `;
    if (result.length === 0) {
      res.status(404).json({ error: 'Mini-event not found' });
    } else {
      res.json(result[0]);
    }
  } catch (error) {
    console.error('Error getting mini-event by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateMiniEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { eventTypeName } = req.body;
    const result = await sql`
          UPDATE MiniEvents
          SET eventTypeName = ${eventTypeName}
          WHERE miniEventId = ${id}
          RETURNING *
        `;
    if (result.length === 0) {
      res.status(404).json({ error: 'Mini-event not found' });
    } else {
      res.json(result[0]);
    }
  } catch (error) {
    console.error('Error updating mini-event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteMiniEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sql`
          DELETE FROM MiniEvents
          WHERE miniEventId = ${id}
          RETURNING *
        `;
    if (result.length === 0) {
      res.status(404).json({ error: 'Mini-event not found' });
    } else {
      res.json({ message: 'Mini-event deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting mini-event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createMiniEvent,
  getAllMiniEvents,
  getMiniEventById,
  updateMiniEvent,
  deleteMiniEvent,
};
