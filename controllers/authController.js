const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data }
}
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'username and password are required.' });
    const foundUser = userDB.users.fund(person => person.username === user);
    if (!foundUser) return res.sendStatus(401);
    // eval pwd
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        // here is where we would create JWTs (JSON web tokens)
        res.json({ 'success': `user ${user} is logged in!` });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };