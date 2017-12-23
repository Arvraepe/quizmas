/**
 * Created by Arne on 19-11-2016.
 */
(function (parent) {

    parent.Quizmas = function () {

        function toJson (response) { return response.json(); }

        function getTeams () { return fetch('/api/team/list').then(toJson); }
        function createTeam (team, number) { return fetch('/api/team?name='+encodeURIComponent(team)+'&table='+encodeURIComponent(number), { method: 'put' }).then(toJson); }
        function deleteTeam (id) { return fetch('/api/team/'+id, { method: 'delete' }).then(toJson); }

        function getRounds () { return fetch('/api/round/list').then(toJson); }
        function createRound (round) { return fetch('/api/round?name='+encodeURIComponent(round), { method: 'put'}).then(toJson); }
        function deleteRound (id) { return fetch('/api/round/'+id, { method: 'delete' }).then(toJson); }

        function getRankings () { return fetch('/api/rankings/list').then(toJson);  }
        function getRankingsForFinal () { return fetch('/api/rankings/final').then(toJson); }
        function getScores () { return fetch('/api/admin/scores').then(toJson); }
        function updateTeamScore (team, round, value) {
            return fetch('/api/admin/score/team/'+team+'/round/'+round+'/score?value='+encodeURIComponent(value), { method: 'post' }).then(toJson);
        }

        // I'll fix everything later... sighs
        function getEverything () {
            return fetch('/api/quiz/everything').then(toJson);
        }

        function setDisplayMode (mode) {
            return fetch('/api/display?mode='+encodeURIComponent(mode), { method: 'post' }).then(toJson);
        }

        function getBackups () { return fetch('/api/backup/list').then(toJson); }
        function restoreToBackup (backup) { return fetch('/api/backup/restore', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: backup }) }); }
        function createBackup (name) { return fetch('/api/backup', { method: 'put', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name }) }); }

        function setTiebreakerForTeam (team, value) { return fetch('/api/team/'+team+'/tiebreaker', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value: value }) }); }

        return {
            getTeams: getTeams,
            createTeam: createTeam,
            deleteTeam: deleteTeam,
            getRounds: getRounds,
            createRound: createRound,
            deleteRound: deleteRound,
            getRankings: getRankings,
            getRankingsForFinal: getRankingsForFinal,
            getScores: getScores,
            updateTeamScore: updateTeamScore,
            getEverything: getEverything,
            setDisplayMode: setDisplayMode,
            getBackups:getBackups,
            restoreToBackup:restoreToBackup,
            createBackup:createBackup,
            setTiebreakerForTeam: setTiebreakerForTeam
        };
    }();

})(window);