const shareRouter   = require('express').Router();
const shareDB = require('../../database/pg.js');


shareRouter.route('/sharedWithUser').get((req, res) => {
  var email = req.query.email;

  shareDB.getSharedWithUser(email)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('err 2 in query');
      res.sendStatus(500);
    })
});


shareRouter.route('/sharedByUser').get((req, res) => {
  var email = req.query.email;
  console.log('shared by user route');
  console.log(email);
  shareDB.getSharedByUser(email)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('err 2 in query');
      res.sendStatus(500);
    })
});


// shareRouter.get('/sharedByUser'), (req, res) => {
//   var email = '2@qq.com';
//   console.log('path');
//   var result = models.getSharedWithUser(email);
//   console.log(result);

//   res.send(200);
// }
// shareRouter.get('/myShareList'), (req, res) => {

// }

// shareRouter.post('/myShareList'), (req, res) => {

// }

// shareRouter.delete('/myShareList'), (req, res) => {

// }



module.exports = shareRouter;