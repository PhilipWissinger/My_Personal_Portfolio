package main;

import javafx.scene.image.Image;

public class Enemy extends OwnImage {

	private int health;

	public Enemy(Image image, double x, double y, double width, double height, int health) {
		super(image, x, y, width, height);
		this.health = health;
	}

	public int getHealth() {
		return health;
	}

	public void setHealth() {
		health -= 1;
	}

}
