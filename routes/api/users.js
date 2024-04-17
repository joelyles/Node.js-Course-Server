// from employees api

const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/role_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(usersController.getAllUsers);
    // .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee)
    // .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
    // .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);

module.exports = router;