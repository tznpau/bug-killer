const Project = require('../models/Project');

const ProjectController = {
    createProject: async (req, res) => {
        try {
            const project = await Project.create(req.body);
            res.json(project);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAllProjects: async (req, res) => {
        try {
            const projects = await Project.findAll();
            res.json(projects);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getProjectById: async (req, res) => {
        const { id } = req.params;

        try {
            const project = await Project.findByPk(id);

            if (!project) {
                return res.status(404).json({ error: 'Project not found' });
            }

            res.json(project);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateProject: async (req, res) => {
        const { id } = req.params;

        try {
            const [updatedRowsCount] = await Project.update(req.body, {
                where: { id },
            });

            if (updatedRowsCount === 0) {
                return res.status(404).json({ error: 'Project not found' });
            }

            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteProject: async (req, res) => {
        const { id } = req.params;

        try {
            const deletedRowCount = await Project.destroy({
                where: { id },
            });

            if (deletedRowCount === 0) {
                return res.status(404).json({ error: 'Project not found' });
            }

            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = ProjectController;
