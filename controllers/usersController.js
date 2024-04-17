// handle data from api - tutorial tested this using thunder client
// from employeesController

const User = require('../model/User');

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'no users found.' });
    res.json(users);
}

/* const createNewEmployee = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(400).json({ 'message': 'first and last names are required.' });
    }

    try {
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });

        res.status(201).json(result);
    } catch (err) {
        console.log(err);
    }
}

const updateEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const employee = await Employee.findOne({ _id: req.body.id }).exec();

    if (!employee) {
        return res.status(204).json({ 'message': `no employee matches ID ${req.body.id}` });
    }
    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.lastname = req.body.lastname;
    const result = await employee.save();
    res.json(result);
}

const deleteEmployee = async (req, res) => {
    if (req?.body?.id) return res.status(400).json({ 'message': 'Employee ID required.' });
    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ 'message': `no employee matches ID ${req.body.id}` });
    }
    const result = await employee.deleteOne({ _id: req.body.id });
    res.json(result);
} */

const getUser = async (req, res) => {
    if (req?.params?.id) return res.status(400).json({ 'message': 'Employee id required' });


    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(400).json({ 'message': `user ID ${req.params.id} not found` });
    }
    res.json(user);
} 

module.exports = {
    getAllUsers,
    getUser
}