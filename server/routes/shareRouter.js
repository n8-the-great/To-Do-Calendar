const shareRouter   = require('express').Router();
const shareDB = require('../../database/pg.js');


shareRouter.route('/sharedWithUser').get((req, res) => {
  var email = req.query.email;
  console.log('email:', email);
  console.log('shared with user route');

  shareDB.getSharedWithUser(email).then((result) => {
    res.send(result.rows);
  })
  .catch((err) => {
    console.log('err 2 in query');
    res.sendStatus(500);
  })
});


shareRouter.route('/sharedByUser').get((req, res) => {
  var email = req.query.email;

  shareDB.getSharedByUser(email).then((result) => {
    res.send(result.rows);
  })
  .catch((err) => {
    res.sendStatus(500);
  })
});


shareRouter.route('/deleteFromShares').delete((req, res) => {
  var email = req.query.email;

  shareDB.getSharedByUser(email).then((result) => {
    console.log(result.rows);
    res.send(result.rows);
  })
  .catch((err) => {
    res.sendStatus(500);
  })
});


// shareRouter.get('/myShareList'), (req, res) => {

// }

// shareRouter.post('/myShareList'), (req, res) => {

// }

// shareRouter.delete('/myShareList'), (req, res) => {

// }



module.exports = shareRouter;