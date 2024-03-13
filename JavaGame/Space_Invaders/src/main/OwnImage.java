package main;

import javafx.scene.image.Image;

/**
 * This class is used to store properties for the images. Is used to draw the
 * images.
 */

public class OwnImage {

	private Image image;
	private double x;
	private double y;
	private double width;
	private double height;

	public OwnImage(Image image, double x, double y, double width, double height) {
		this.image = image;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

	}

	public Image getImage() {
		return image;
	}

	public double getX() {
		return x;
	}

	public void setX(int s) {
		x += s;
	}

	public double getY() {
		return y;
	}

	public void setY(int s) {
		y += s;
	}

	public double getWidth() {
		return width;
	}

	public double getHeight() {
		return height;
	}

}
