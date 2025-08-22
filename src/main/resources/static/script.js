const app = document.getElementById("app");

/* ---------------- LOBBY ---------------- */
function renderLobby() {
  app.innerHTML = `
    <div id="lobby-view">
      <h1>Tic Tac Toe</h1>
      <div class="button-container">
        <button onclick="renderMatch()">Singleplayer</button>
        <button onclick="renderMatch()">Multiplayer</button>
        <button onclick="renderProfile()">Profile</button>
        <button onclick="renderLeaderboard()">Leaderboard</button>
        <button onclick="quitGame()">Quit Game</button>
      </div>
    </div>
  `;
}

/* -------------------- MATCH ---------------------- */
async function renderMatch() {
  try {
    const playerInfo = await window.startSingleplayerGame();

    // Build player objects (names + ranks)
    const player1 = { name: playerInfo.player1Name, rank: playerInfo.player1Rank, color: 'blue' };
    const player2 = { name: playerInfo.player2Name, rank: playerInfo.player2Rank, color: 'red' };

    // Save so we don’t pass long strings through inline onclick
    window.currentPlayers = { player1, player2 };

    // Show the choose-first screen
    renderChooseFirst(player1, player2);
  } catch (error) {
    console.error('Error rendering match:', error);
    app.innerHTML = `<div class="error">Could not start the game. Try again later.</div>`;
  }
}

function renderChooseFirst(player1, player2) {
  app.innerHTML = `
    <div id="match-view">
      <div class="choose-header">
        <div class="choose-turn-info">Choose Who Starts First</div>

        <button class="player-info player-left" onclick="startMatch('player1')">
          <div class="player-name" style="color:${player1.color}">${player1.name}</div>
          <div class="player-rank" style="color:${player1.color}">${player1.rank}</div>
        </button>

        <button class="player-info player-right" onclick="startMatch('player2')">
          <div class="player-name" style="color:${player2.color}">${player2.name}</div>
          <div class="player-rank" style="color:${player2.color}">${player2.rank}</div>
        </button>
      </div>

      <div id="choose-first-tip">
        Starting second grants more ELO
      </div>
    </div>
  `;
}

async function startMatch(starterKey) {
  const { player1, player2 } = window.currentPlayers || {};
  if (!player1 || !player2) {
    console.error('Players not initialized');
    return renderLobby();
  }

  try {
    await window.sendStarterChoice(starterKey);

    const starter = starterKey === 'player1' ? player1 : player2;

    app.innerHTML = `
      <div id="match-view">
        <div class="match-header">
          <div class="player-info player-left">
            <div class="player-name" style="color:${player1.color}">${player1.name}</div>
            <div class="player-rank" style="color:${player1.color}">${player1.rank}</div>
          </div>

          <div class="turn-info">
            ${starter.name}'s Turn
          </div>

          <div class="player-info player-right">
            <div class="player-name" style="color:${player2.color}">${player2.name}</div>
            <div class="player-rank" style="color:${player2.color}">${player2.rank}</div>
          </div>
        </div>

        <div class="tic-tac-toe-board">
          <div class="cell" id="cell-0"></div>
          <div class="cell" id="cell-1"></div>
          <div class="cell" id="cell-2"></div>
          <div class="cell" id="cell-3"></div>
          <div class="cell" id="cell-4"></div>
          <div class="cell" id="cell-5"></div>
          <div class="cell" id="cell-6"></div>
          <div class="cell" id="cell-7"></div>
          <div class="cell" id="cell-8"></div>
        </div>

        <button class="surrender-button" onclick="renderLobby()">Surrender</button>
      </div>
    `;
  } catch (error) {
    console.error('Error starting match:', error);
    app.innerHTML = `<div class="error">Could not start the game. Try again later.</div>`;
  }
}

/* ---------------- PROFILE ---------------- */
function renderProfile() {
  app.innerHTML = `
    <div id="profile-view">
      <h2>Profile</h2>

      <div class="profile-name">Swag</div>

      <div class="profile-stats">
        <span>Wins: 15</span> |
        <span>Wins: 11</span> |
        <span>Ties: 3</span> |
        <span>Losses: 1</span>
      </div>

      <div class="profile-rank">
        <span class="rank-name">High Schooler</span>
      </div>

      <button onclick="renderLobby()">Back to Lobby</button>
    </div>
  `;
}

/* ---------------- LEADERBOARD ---------------- */
const players = [
    {
    name: "Swag",
    games: 15,
    wins: 11,
    ties: 3,
    losses: 1,
    rank: "High Schooler",
    elo: 1605
  },{
    name: "Simonsays",
    games: 9,
    wins: 8,
    ties: 0,
    losses: 1,
    rank: "Middle Schooler",
    elo: 1425
  },{
    name: "Banana",
    games: 12,
    wins: 1,
    ties: 9,
    losses: 2,
    rank: "Kindergartner",
    elo: 902
  },{
    name: "Sixisi",
    games: 3,
    wins: 0,
    ties: 3,
    losses: 0,
    rank: "Kindergartner",
    elo: 509
  },{
    name: "CaptainNick_CN",
    games: 21,
    wins: 0,
    ties: 11,
    losses: 10,
    rank: "Playground Kid",
    elo: 320
    },
  // Add more players here
];


function renderLeaderboard() {
  // Sort players by Elo descending
  const sortedPlayers = players.sort((a, b) => b.elo - a.elo);

  // Generate table rows dynamically with Ties before Losses and top 3 highlight
  const rows = sortedPlayers.map((player, index) => {
    let rankClass = "";
    if (index === 0) rankClass = "first-place";
    else if (index === 1) rankClass = "second-place";
    else if (index === 2) rankClass = "third-place";

    return `
      <tr class="${rankClass}">
        <td>${index + 1}</td>
        <td>${player.name}</td>
        <td>${player.games}</td>
        <td>${player.wins}</td>
        <td>${player.ties}</td>
        <td>${player.losses}</td>
        <td>${player.rank}</td>
        <td>${player.elo}</td>
      </tr>
    `;
  }).join('');

  app.innerHTML = `
    <div id="leaderboard-view">
      <h2>Leaderboard</h2>
      <div class="leaderboard-container">
        <table class="leaderboard-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Games</th>
              <th>Wins</th>
              <th>Ties</th>
              <th>Losses</th>
              <th>Rank</th>
              <th>Elo</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
      <button onclick="renderLobby()">Back to Lobby</button>
    </div>
  `;
}

/* ---------------- QUIT GAME ---------------- */
function quitGame() {
  app.innerHTML = `
    <div id="quit-view">
      <h2>Thanks for playing!</h2>
      <p>Refresh the page to play again.</p>
    </div>
  `;
}

/* ---------------- INITIAL LOAD ---------------- */
renderLobby();
