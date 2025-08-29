package tttc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tttc.model.Player;
import tttc.service.GameService;

import java.util.Map;

@RestController
@RequestMapping("/game")
public class GameController {

    @Autowired
    private GameService gameService;

    // ---------------- GET PLAYER INFO ----------------
    @PostMapping("/start")
    @ResponseBody
    public Map<String, Object> startGame() {
        gameService.initializePlayers();
        Player p1 = gameService.getPlayer1();
        Player p2 = gameService.getPlayer2();

        return Map.of(
                "player1Name", p1.getName(),
                "player1Rank", p1.getRank(),
                "player2Name", p2.getName(),
                "player2Rank", p2.getRank()
        );
    }

    // ---------------- SET STARTER AND START GAME ----------------
    @PostMapping("/starter")
    @ResponseBody
    public Map<String, String> setStarter(@RequestBody Map<String, String> payload) {
        String starterKey = payload.get("starter"); // "player1" or "player2"

        gameService.startGame(starterKey);

        return Map.of(
                "message", "Starter set successfully",
                "starter", starterKey
        );
    }

    // --------------- Get Profile Info ----------------------
    @GetMapping("/profile")
    @ResponseBody
    public Map<String, Object> getProfile() {
        long playerId = 2; // temporarily hardcoded

        Player player = gameService.getProfileById(playerId);
        if (player == null) {
            return Map.of("error", "Player not found");
        }

        return Map.of(
                "name", player.getName(),
                "games", player.getGames(),
                "wins", player.getWins(),
                "ties", player.getTies(),
                "loses", player.getLoses(),
                "rank", player.getRank()
        );
    }
}
