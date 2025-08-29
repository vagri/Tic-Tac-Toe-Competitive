package tttc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tttc.model.Board;
import tttc.model.Player;
import tttc.repository.PlayerRepository;

@Service
public class GameService {

    @Autowired
    private PlayerRepository playerRepository; // <-- inject repository

    private Player player1;
    private Player player2;
    private Player starter; // who goes first
    private Board board;

    public void initializePlayers() {
        player1 = new Player("Swag", "High Schooler");
        player2 = new Player("AI", "Easy");
        starter = null; // no starter chosen yet
        board = null;   // board not started yet
    }

    public void startGame(String starterKey) {
        if (player1 == null || player2 == null) {
            throw new IllegalStateException("Players not initialized");
        }

        board = new Board();
        board.resetBoard();

        starter = "player1".equals(starterKey) ? player1 : player2;
    }

    // ---------------- PROFILE ----------------
    public Player getProfileById(long id) {
        return playerRepository.findById(id).orElse(null); // returns null if not found
    }

    public Player getPlayer1() {
        return player1;
    }

    public Player getPlayer2() {
        return player2;
    }

    public Player getStarter() {
        return starter;
    }

    public Board getBoard() {
        return board;
    }
}
