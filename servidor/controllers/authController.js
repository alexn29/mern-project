const User = require('../models/User');
const { messages } = require('../config/messages');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res) => {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    
    try {

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: messages.auth.userExist });
        }

        const isCorrectPassword = await bcryptjs.compare(password, user.password);
        if (!isCorrectPassword) {
            return res.status(400).json({ msg: messages.auth.incorrectPassword })
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;

            res.json({ token });
        });

    } catch (error) {
        console.error(error);
    }
}