package main;

import javafx.scene.image.Image;

public class ShootPowerUp extends PowerUp {

	public ShootPowerUp(Image image, double x, double y, double width, double height) {
		super(image, x, y, width, height);
	}
	
	@Override
	public int perform() {
		return -25; //increases the speed of the shot from 13 to 25 pixels per update
	}
}
