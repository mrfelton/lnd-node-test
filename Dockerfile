FROM node
COPY . lnd-node-test
RUN cd lnd-node-test && npm i