/**
 * Created by Arne on 19-11-2016.
 */

const QuizRepository = require('repositories/QuizRepository');
const QuizService = require('services/QuizService');

module.exports = (App) => {

    App.put('/api/team', (req, res) => res.status(200).send(QuizService.createTeam(req.query.name, req.query.table)));
    App.get('/api/team/list', (req, res) => res.status(200).send(QuizRepository.getAllTeams()));
    App.delete('/api/team/:team', (req, res) => res.status(200).send(QuizService.deleteTeam(req.params.team)));
    App.get('/api/team/:team/score/list', (req, res) => res.status(200).send(QuizRepository.getScoresForTeam(req.params.team)));
    App.post('/api/team/:team/tiebreaker', (req, res)=> res.status(200).send(QuizRepository.setTiebreaker(req.params.team, req.body.value)));
};