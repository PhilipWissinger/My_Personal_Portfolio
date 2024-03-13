package states;

import javafx.scene.canvas.GraphicsContext;

import javafx.scene.input.MouseEvent;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;

import javafx.scene.image.Image;
import javafx.scene.text.*;

import javafx.scene.shape.*;

import static constants.Constants.SCREEN_HEIGHT;
import static constants.Constants.SCREEN_WIDTH;

import java.io.FileInputStream;
import java.io.FileNotFoundException;

/*
 * This state shows the controls and options in game
 */

public class HelpState extends GameState {

	private String informationText;
	private String Title;
	private Color fontColor;
	private Image greenPowerUp;
	private Image redPowerUp;
	private Image button;

	public Rectangle mainmenu = new Rectangle(SCREEN_WIDTH / 2 - 120, 650, 200, 45);

	// private font fonttext;
	// A PlayState, so we can change to the PlayState from the menu.
	private GameState gameState;

	Font f0 = Font.font("Zapfino", FontWeight.BOLD, 20);
	Font f1 = Font.font("Zapfino", FontWeight.BOLD, 33);
	Font f2 = Font.font("Zapfino", FontWeight.BOLD, 70);
	Font f3 = Font.font("Zapfino", FontWeight.BOLD, 23);

	public HelpState(GameModel model, GameState state) {
		super(model);
		gameState = state;
		Title = "SPACE INVADERS";
		informationText = "Use Mouse to navigate the Menu";
		fontColor = Color.GOLD;
		try {
			redPowerUp = new Image(new FileInputStream("RedPowerUp.png"));
			greenPowerUp = new Image(new FileInputStream("GreenPowerUp.png"));
			button = new Image(new FileInputStream("button.png"));

		} catch (FileNotFoundException e) {
			System.out.println("Unable to find image-files!");
		}
	}

	public void showButtons(GraphicsContext g) {
		g.setFill(Color.TRANSPARENT);
		g.fillRect(mainmenu.getX(), mainmenu.getY(), mainmenu.getWidth(), mainmenu.getHeight());
		g.drawImage(button, mainmenu.getX(), mainmenu.getY(), mainmenu.getWidth(), mainmenu.getHeight());

		g.setFill(Color.GOLD);
		g.setFont(f3);
		g.fillText("Main menu", mainmenu.getX() + 20, mainmenu.getY() + 30);
		g.fillPolygon(new double[] { 80, 75, 75, 80, 85, 85 }, new double[] { 330, 335, 405, 410, 405, 335, }, 6);
		g.fillPolygon(new double[] { 920, 915, 915, 920, 925, 925 }, new double[] { 330, 335, 405, 410, 405, 335, }, 6);
		g.fillPolygon(new double[] { 80, 75, 75, 80, 85, 85 }, new double[] { 480, 485, 555, 560, 555, 485, }, 6);
		g.fillPolygon(new double[] { 920, 915, 915, 920, 925, 925 }, new double[] { 480, 485, 555, 560, 555, 485, }, 6);
	}

	/**
	 * Draws information text to the screen
	 */
	@Override
	public void draw(GraphicsContext g) {
		drawBg(g);
		g.setFill(fontColor);
		g.setFont(f2); // Big letters
		g.fillText(Title, SCREEN_WIDTH / 5, SCREEN_HEIGHT / 6);

		showButtons(g);
		g.setFont(f1);
		g.fillText(informationText, SCREEN_WIDTH / 4.1, SCREEN_HEIGHT / 3.5);
		g.fillText("Controls", 100, 310);
		g.fillText("PowerUps", 100, 460);

		g.setFont(f0);
		g.fillText(
				"Left_Arrow :                                                                    Move your spaceship to the left \n"
						+ "Right_Arrow :                                                                 Move your spaceship to the right \n"
						+ "Space_Bar :                                                                      Shoot lasers from your spaceship",
				100, 350);
		g.fillText(
				"Greatly increases your movement speed for a short period of time\n\nGreatly increases your shooting speed for a short period of time",
				140, 500);

		g.drawImage(greenPowerUp, 100, 480, 20, 30);
		g.drawImage(redPowerUp, 99, 530, 23, 33);

	}

	public void mouseClicked(MouseEvent m, GameModel model) {
		if (mainmenu.contains(m.getX(), m.getY())) {
			model.switchState(gameState);
		}
	}

	@Override
	public void update(boolean right, boolean shot, GameModel model) {
	}

	/**
	 * We currently don't have anything to activate in the MenuState so we leave
	 * this method empty in this case.
	 */
	@Override
	public void activate() {

	}

	/**
	 * We currently don't have anything to deactivate in the MenuState so we leave
	 * this method empty in this case.
	 */

	@Override
	public void deactivate() {

	}

}
