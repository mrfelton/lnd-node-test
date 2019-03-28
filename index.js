const fs = require("fs");
const protoLoader = require('@grpc/proto-loader');
// const grpc = require('@grpc/grpc-js');
const grpc = require('grpc');
// request works when using grpc
// but not when using @grpc/grpc-js

var lndCert = fs.readFileSync("tls.cert");
var credentials = grpc.credentials.createSsl(lndCert);

const grpcOptions = {
  keepCase: true,
  longs: Number,
  enums: String,
  defaults: true,
  oneofs: true,
}

const packageDefinition = protoLoader.loadSync("rpc.proto", grpcOptions);
const packageObject = grpc.loadPackageDefinition(packageDefinition);
// process.env.GRPC_SSL_CIPHER_SUITES = 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384'

// var mac = fs.readFileSync("admin.macaroon");
// const metadata = new grpc.Metadata()
// metadata.add('macaroon', mac.toString('hex'))
// meda = grpc.credentials.createFromMetadataGenerator((params, callback) => callback(null, metadata))
// const creds = grpc.credentials.combineChannelCredentials(credentials, meda)

var lightning = new packageObject.lnrpc.Lightning('api.thunderwallet.io:443', credentials);
console.log(lightning)

lightning.getInfo({}, function (err, response) {
  console.log('GetInfo:', response);
  console.log(err)
});