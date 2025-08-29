package tttc;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import tttc.repository.PlayerRepository;

@Component
public class DataGenerator implements CommandLineRunner {

    private final PlayerRepository playerRepository;

    public DataGenerator(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if(playerRepository.findAll().size() != 0){
            return;
        }
        for(){

        }
        playerRepository.save();
    }
}
