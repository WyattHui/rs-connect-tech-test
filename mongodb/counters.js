module.exports = {
  getNextSequenceValue: (db, sequenceName) => {
    return db.collection('counters').findOneAndUpdate(
      {_id: sequenceName},
      {$inc: {sequence_value: 1}},
      {returnOriginal: false}
    );
  }
};
