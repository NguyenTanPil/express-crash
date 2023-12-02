const Task = require('../models/task');
const asyncWrapper = require('../middlewares/async');

const getAllTasks = asyncWrapper(async (req, res) => {
	const tasks = await Task.find();
	return res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
	const task = await Task.create(req.body);
	res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
	const { id: taskId } = req.params;
	const task = await Task.findOne({ _id: taskId });

	if (task === null) {
		const error = new Error('Not Found');
		error.status = 404;
		return next(error);
		// return res.status(404).json({ msg: `No task with id: ${taskId}` });
	}

	return res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
	const { id: taskId } = req.params;

	const task = await Task.findByIdAndUpdate({ _id: taskId }, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});
	if (task === null) {
		return res.status(404).json({ msg: `No task with id: ${taskId}` });
	}
	res.status(200).json({ id: taskId, task });
});

const deleteTask = asyncWrapper(async (req, res) => {
	const { id: taskId } = req.params;
	const task = await Task.findOneAndDelete({ _id: taskId });

	if (task === null) {
		return res.status(404).json({ msg: `No task with id: ${taskId}` });
	}

	return res.status(201).json({ task });
});

const editTask = asyncWrapper(async (req, res) => {
	const { id: taskId } = req.params;

	const task = await Task.findByIdAndUpdate({ _id: taskId }, req.body, {
		new: true,
		runValidators: true,
		overwrite: true,
		useFindAndModify: false,
	});
	if (task === null) {
		return res.status(404).json({ msg: `No task with id: ${taskId}` });
	}
	res.status(200).json({ id: taskId, data: req.body });
});

module.exports = {
	getAllTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask,
	editTask,
};
