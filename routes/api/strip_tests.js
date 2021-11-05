const express = require('express');
const {
  readStripTestById,
  updateStripTest,
  deleteStripTest,
} = require('../../database/strip-tests/strip_tests');
const { authenticateToken } = require('../../middleware/auth');

const router = express.Router();

router.get('/:stripTestId', authenticateToken, async (req, res) => {
  const stripTest = await readStripTestById(
    req.params.stripTestId,
    req.user.id
  );
  res.status(200).json(stripTest);
});

router.put('/:stripTestId', authenticateToken, async (req, res) => {
  if (
    !req.body?.stripTestId ||
    !req.body?.testType ||
    !req.body?.units ||
    !req.body?.millivolts ||
    !req.body?.result ||
    !req.body?.milkFever ||
    !req.body?.followUpNum
  ) {
    return res.status(400).json({ message: 'Missing fields in request body' });
  }

  const stripTest = {
    stripTestId: req.body.stripTestId,
    testType: req.body.testType,
    units: req.body.units,
    millivolts: req.body.millivolts,
    result: req.body.result,
    milkFever: req.body.milkFever,
    followUpNum: req.body.followUpNum,
  };

  // TODO: Check if there was an error in updating
  const result = await updateStripTest(
    stripTest,
    req.params.stripTestId,
    req.user.id
  );

  res.status(201).json({ message: 'Successfully updated strip test' });
});

router.delete('/:stripTestId', authenticateToken, async (req, res) => {
  // TODO: Check if there was an error in deleting
  const result = await deleteStripTest(req.params.stripTestId, req.user.id);
  res.status(201).json({ message: 'Successfully deleted strip test' });
});

module.exports = router;
