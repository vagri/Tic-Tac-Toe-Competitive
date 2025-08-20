package tttc.model;

public class Player {

    private String name;
    private String rank;

    public Player(String name, String rank) {
        this.name = name;
        this.rank = rank;
    }

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }
}
