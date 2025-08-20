package tttc.service;

import org.springframework.stereotype.Service;
import tttc.model.Board;
import tttc.model.Player;

@Service
public class GameService {

    private Player player1;
    private Player player2;

    private Board board;

    public GameService() {
        player1 = new Player("Player 1", "Novice");
        player2 = new Player("Player 2", "Novice");
        board = new Board();
    }

    public void startNewGame() {
        board.resetBoard();
    }

    public Board getBoard() {
        return board;
    }

    public Player getPlayer1() {
        return player1;
    }

    public Player getPlayer2() {
        return player2;
    }
}
