const http = require('http');
const fs = require('fs');
const invoke = require('./invoke.js');
const query = require('./query.js');

async function main() {
    dataQuery = await query;
    dataInvoke = await invoke;

    http.createServer((req, res) => {
      if (req.method === 'GET') {
        if (req.url === '/') {
          return fs.readFile('./rest-front.html', (err, data) => {
            if (err) {
              throw err;
            }
            res.end(data);
          });
        } else if (req.url === '/querys') {
          return res.end((JSON.stringify(dataQuery)));
        } else if (req.url === '/invokes') {
          return res.end(dataInvoke);
        }
        return fs.readFile(`.${req.url}`, (err, data) => {
          if (err) {
            res.writeHead(404, 'NOT FOUND');
            return res.end('NOT FOUND');
          }
          return res.end(data);
        });
      }
      res.writeHead(404, 'NOT FOUND');
      return res.end('NOT FOUND');
    }).listen(8085, () => {
        console.log('8085번 포트 열림');
      });
}

main();
