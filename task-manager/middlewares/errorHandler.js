const errorHandlerMiddleware = (error, req, res, next) => {
	return res.status(500).json({ error });
};

module.exports = errorHandlerMiddleware;
