const { HOST = "0.0.0.0", PORT = 8000 } = process.env;

module.exports = {
  httpServer: {
    HOST,
    PORT,
  },
};
