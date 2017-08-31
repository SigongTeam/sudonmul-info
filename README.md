# sudonmul-info
Gives information about tap water.

## Requirements
- Node.js v8.2.1
- MongoDB v3.4.6

## Usage
```bash
# install dependencies
$ npm install

# create .env file
echo 'MONGODB_URI=mongodb://hello.world:1234/wow' > .env

# create self-signed certificate
$ openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# development (hot module replacement enabled)
$ npm run dev

# production (back-end only)
$ npm start
```

## License
[MIT License](LICENSE)
