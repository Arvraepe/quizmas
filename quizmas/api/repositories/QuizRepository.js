/**
 * Created by Arne on 19-11-2016.
 */

const fs = require('fs');

const Data = require('data/data.json');
const Lenses = require('helpers/Lenses');

Lenses.use(Data);

// Lenses
const scoresForTeamForRound = (team, round) => Lenses.create(['scores', team, round]);
const scoresForTeam = (team) => Lenses.create(['scores', team]);
const teams = () => Lenses.create(['teams']);
const rounds = () => Lenses.create(['rounds']);
const scores = () => Lenses.create(['scores']);
const display = () => Lenses.create(['display']);
const displayMode = () => Lenses.create(['display', 'mode']);

// Getters
const getAllTeams = () => teams().view();
const getAllRounds = () => rounds().view();
const getAllScores = () => scores().view();
const getScoresForTeam = (team) => scoresForTeam(team).view();
const getScoreForTeamForRound = (team, round) => scoresForTeamForRound(team, round).view();
const getDisplay = () => display().view();
const getDisplayMode = () => displayMode().view();

// Setters
const setTeams = (t) => teams().set(t);
const setRounds = (r) => rounds().set(r);
const setScores = (s) => scores().set(s);
const setScoreForTeamForRound = (team, round, value) => scoresForTeamForRound(team, round).set(value);
const setDisplayMode = (mode) => {
    displayMode().set(mode);
    save ();
    return { mode: mode };
};

// Creators
const createTeam = (team) => {
    const list = R.clone(teams().view());
    list.push(team);

    setTeams(list);
};
const createRound = (round) => {
    const list = R.clone(rounds().view());
    list.push(round);

    setRounds(list);
};

// Deleters
const deleteTeam = (id) => {
    const list = R.clone(teams().view());
    const filtered = list.filter((team) => team.id !== id);

    const scoresList = R.clone(scores().view());
    delete scoresList[id];

    setTeams(filtered);
    setScores(scoresList);
};
const deleteRound = (id) => {
    const list = R.clone(rounds().view());
    const filtered = list.filter((round) => round.id !== id);

    const scoresList = R.clone(scores().view());
    R.keys(scoresList).forEach((teamId) => {
        if (scoresList[teamId][id]) delete scoresList[teamId][id];
    });

    setRounds(filtered);
    setScores(scoresList);
};

// Administrative
const save = () => fs.writeFileSync(dir + '/api/data/data.json', JSON.stringify(Lenses.config()));


const getAllBackups = () => {
    return fs.readdirSync(dir + '/api/data/back-ups').map((f) => f.replace(/\.[^/.]+$/, ""));
};

const saveToBackup = (backup) => {
    fs.writeFileSync(dir + '/api/data/back-ups/'+backup.name+'.json', JSON.stringify(Lenses.config()));
    return backup;
};

const restore = (name) => {
    const backup = require('data/back-ups/'+name+'.json');

    Lenses.use(backup);

    save();
};

const setTiebreaker = (team, value) => {

    const list = R.clone(teams().view());

    setTeams(list.map((t) => {
        if (t.id == team) t.tiebreaker = value;
        return t;
    }));

    save();

};

// Exports
module.exports = {
    getAllTeams, getAllRounds, getAllScores, getScoresForTeam, getScoreForTeamForRound, getDisplay, getDisplayMode,
    setScoreForTeamForRound, setDisplayMode, setTiebreaker,
    save,
    createTeam, createRound,
    deleteTeam, deleteRound,
    everything: () => Lenses.config(),
    getAllBackups, saveToBackup, restore
};