package main;

import javafx.scene.image.Image;

public class MovementPowerUp extends PowerUp {

	public MovementPowerUp(Image image, double x, double y, double width, double height) {
		super(image, x, y, width, height);
	}
	
	@Override
	public int perform() {
		return 8; //increases the movement speed from 5 to 8 pixels per update
	}
}
