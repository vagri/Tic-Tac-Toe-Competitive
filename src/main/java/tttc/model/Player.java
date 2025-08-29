package tttc.model;

import jakarta.persistence.*;

@Entity
public class Player extends AbstractEntity {

    private String name;

    private int games;

    private int wins;

    private int ties;

    private int loses;

    private String rank;

    private int elo;

    // Default constructor (required by JPA)
    public Player() {}

    // Optional constructor for quick creation
    public Player(String name, String rank) {
        this.name = name;
        this.rank = rank;
    }

    // Getters & Setters
    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public int getGames() { return games; }

    public void setGames(int games) { this.games = games; }

    public int getWins() { return wins; }

    public void setWins(int wins) { this.wins = wins; }

    public int getTies() { return ties; }

    public void setTies(int ties) { this.ties = ties; }

    public int getLoses() { return loses; }

    public void setLoses(int loses) { this.loses = loses; }

    public String getRank() { return rank; }

    public void setRank(String rank) { this.rank = rank; }

    public int getElo() { return elo; }

    public void setElo(int elo) { this.elo = elo; }
}
