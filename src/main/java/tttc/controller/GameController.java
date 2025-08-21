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

    @PostMapping("/start")
    @ResponseBody
    public Map<String, Object> startGame() {
        gameService.startNewGame();
        Player p1 = gameService.getPlayer1();
        Player p2 = gameService.getPlayer2();

        return Map.of(
                "player1Name", p1.getName(),
                "player1Rank", p1.getRank(),
                "player2Name", p2.getName(),
                "player2Rank", p2.getRank()
        );
    }


}
