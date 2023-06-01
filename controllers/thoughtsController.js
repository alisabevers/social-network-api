const { Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thought = await Thought.find();
            res.json(thought)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought
                .findOne({ _id: req.params.thoughtId })
                .select('-__v');
            if (!thought) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought
                .findOneAndUpdate(
                    { _id: req.params.thoughtId }
                );
            if (!thought) {
                return res.status(404).json({ message: 'no user iwht that id' })
            }
            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought
                .findOneAndDelete(
                    { _id: req.params.thoughtId },
                );
            if (!thought) {
                return res.status(404).json({ message: 'no user with that id' })
            }
            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async createReaction(req, res) {
        try {
            const reaction = await Thought.create(req.body);
            const thought = await Thought.findOneAndUpdate(
                { _id: req.body.thoughtId },
                { $addToSet: { reactions: reaction._id } },
                { new: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: 'a thought with that id was not found' });
            }

            res.json('Your thought was successfully created');

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

};