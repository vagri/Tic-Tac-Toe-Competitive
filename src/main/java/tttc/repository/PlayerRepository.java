package tttc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tttc.model.Player;

public interface PlayerRepository extends JpaRepository<Player, Long> {

}
