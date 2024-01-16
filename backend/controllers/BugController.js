const Bug = require('../models/Bug');

const BugController = {
    createBug: async (req, res) => {
        try {
            const bug = await Bug.create(req.body);
            res.json(bug);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAllBugs: async (req, res) => {
        try {
            const bugs = await Bug.findAll();
            res.json(bugs);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getBugById: async (req, res) => {
        const { id } = req.params;

        try {
            const bug = await Bug.findByPk(id);

            if (!bug) {
                return res.status(404).json({ error: 'Bug not found' });
            }

            res.json(bug);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateBug: async (req, res) => {
        const { id } = req.params;

        try {
            const [updatedRowsCount] = await Bug.update(req.body, {
                where: { id },
            });

            if (updatedRowsCount === 0) {
                return res.status(404).json({ error: 'Bug not found' });
            }

            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteBug: async (req, res) => {
        const { id } = req.params;

        try {
            const deletedRowCount = await Bug.destroy({
                where: { id },
            });

            if (deletedRowCount === 0) {
                return res.status(404).json({ error: 'Bug not found' });
            }

            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = BugController;
