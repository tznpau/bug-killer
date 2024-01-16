const User = require('../models/User');

const UserController = {
    createUser: async (req, res) => {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getUserById: async (req, res) => {
        const { id } = req.params;

        try {
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateUser: async (req, res) => {
        const { id } = req.params;

        try {
            const [updatedRowsCount] = await User.update(req.body, {
                where: { id },
            });

            if (updatedRowsCount === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;

        try {
            const deletedRowCount = await User.destroy({
                where: { id },
            });

            if (deletedRowCount === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = UserController;
