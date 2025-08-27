const app = document.getElementById("app");

/* ---------------- LOBBY ---------------- */
function renderLobby() {
  app.innerHTML = `
    <div id="lobby-view">
      <h1>Tic Tac Toe</h1>

      <div class="matchSection">
        <h2>Singleplayer</h2>
        <select id="difficulty"
                onchange="this.style.color=this.options[this.selectedIndex].style.color"
                style="padding: 15px; font-size: 1.2rem; font-weight: bold; border-radius: 12px; width: 100%; color: black;">
          <option value="" disabled selected>Choose Difficulty</option>
          <option value="easy" style="color: green;">Easy</option>
          <option value="medium" style="color: yellow;">Medium</option>
          <option value="hard" style="color: orange;">Hard</option>
        </select>
        <button onclick="renderMatch()">Start</button>
      </div>

      <div class="matchSection">
        <h2>Multiplayer</h2>
        <button>Create Lobby</button>
        <h3>Room Code:</h3>
        <input type="text" placeholder="Enter code">
        <button>Join Lobby</button>
      </div>

      <div class="othersSection">
        <button onclick="renderProfile()">Profile</button>
        <button onclick="renderLeaderboard()">Leaderboard</button>
        <button onclick="signOut()">Sign Out</button>
      </div>
    </div>
  `;
}

/* ---------------- MATCH ---------------- */
async function renderMatch() {
    try {
        // ---------------- API CALL ----------------
        const response = await fetch('http://localhost:8080/game/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) throw new Error('Failed to start the game');

        const playerInfo = await response.json();

        // ---------------- PLAYER OBJECTS ----------------
        const player1 = { name: playerInfo.player1Name, rank: playerInfo.player1Rank };
        const player2 = { name: playerInfo.player2Name, rank: playerInfo.player2Rank };

        // ---------------- RENDER MATCH ----------------
        app.innerHTML = `
            <div id="match-view">
                <div class="match-header">
                    <div class="player-info player-left">
                        <div class="player-name" style="color:blue">${player1.name}</div>
                        <div class="player-rank" style="color:blue">${player1.rank}</div>
                    </div>

                    <div class="turn-info">
                        ${player1.name}'s Turn
                    </div>

                    <div class="player-info player-right">
                        <div class="player-name" style="color:red">${player2.name}</div>
                        <div class="player-rank" style="color:red">${player2.rank}</div>
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
        console.error('Error rendering match:', error);
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
        <span>Games: 15</span> |
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
function signOut() {
  app.innerHTML = `
    <div id="quit-view">
      <h2>Thanks for playing!</h2>
      <p>Refresh the page to play again.</p>
    </div>
  `;
}

/* ---------------- INITIAL LOAD ---------------- */
renderLobby();
