/**
 * Created by Arne on 19-11-2016.
 */

const QuizRepository = require('repositories/QuizRepository');
const QuizService = require('services/QuizService');

module.exports = (App) => {

    App.get('/api/display', (req, res) => res.status(200).send(QuizRepository.getDisplay()));

    App.get('/api/score/list', (req, res) => res.status(200).send(QuizRepository.getAllScores()));

    App.get('/api/ranking/list', (req, res) => res.status(304).send());

    App.get('/api/ranking/final', (req, res) => res.status(304).send());

    App.get('/api/quiz/everything', (req, res) => res.status(200).send(QuizRepository.everything()));

    App.post('/api/admin/score/team/:team/round/:round/score', (req, res) => res.status(200).send(QuizService.setScoreForTeamForRound(req.params.team, req.params.round, req.query.value)));

    App.post('/api/display', (req, res) => {
        QuizRepository.setDisplayMode(req.query.mode);
        res.status(200).send({ display: { mode: req.query.mode } });
    });

    App.put('/api/backup', (req, res) => res.status(200).send(QuizService.createBackup(req.body)));

    App.post('/api/backup/restore', (req, res) => res.status(200).send(QuizService.restoreToBackup(req.body.name)));

    App.get('/api/backup/list', (req, res) => res.status(200).send(QuizService.getBackups()));

};