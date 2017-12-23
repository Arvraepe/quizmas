/**
 * Created by Arne on 19-11-2016.
 */

const UUID = require('node-uuid');
const QuizRepository = require('repositories/QuizRepository');

const setScoreForTeamForRound = (team, round, value) => {
    QuizRepository.setScoreForTeamForRound(team, round, value);
    QuizRepository.save();

    return QuizRepository.getScoresForTeam(team, round);
};

const deleteTeam = (teamId) => {

    QuizRepository.deleteTeam(teamId);
    QuizRepository.save();

    return QuizRepository.getAllTeams();

};

const createTeam = (name, table) => {

    const team = {
        id: UUID.v4(),
        table: table,
        name: name,
        tiebreaker: "0"
    };

    QuizRepository.createTeam(team);

    QuizRepository.save();

    return team;
};

const deleteRound = (roundId) => {

    QuizRepository.deleteRound(roundId);
    QuizRepository.save();

    return QuizRepository.getAllRounds();

};

const createRound = (name) => {

    const round = {
        id: UUID.v4(),
        name: name
    };

    QuizRepository.createRound(round);
    QuizRepository.save();

    return round;
};

const createBackup = (backup) => {
    return QuizRepository.saveToBackup(backup);
};

const getBackups = () => {
    return QuizRepository.getAllBackups();
};

const restoreToBackup = (name) => {
    return QuizRepository.restore(name);
};

module.exports = { setScoreForTeamForRound, createTeam, createRound, deleteTeam, deleteRound, createBackup, getBackups, restoreToBackup };