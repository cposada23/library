const axios = require('axios').default;
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadsService');

const parser = new xml2js.Parser({ explicitArray: false });
function goodreadsService() {
  function getById() {
    return new Promise((resolve, reject) => {
      axios.get('https://www.goodreads.com/book/show/656.xml?key=XDiCA3EJ4SNYkzvk1tpeg')
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              debug(result);
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch((error) => {
          debug(error);
          reject(error);
        });
    });
  }

  return { getById };
}

module.exports = goodreadsService();
