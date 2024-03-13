package states;

import javafx.scene.canvas.GraphicsContext;
import javafx.scene.input.MouseEvent;
import javafx.scene.paint.Color;
import javafx.scene.image.Image;
import javafx.scene.text.*;
import javafx.scene.shape.*;

import static constants.Constants.SCREEN_HEIGHT;
import static constants.Constants.SCREEN_WIDTH;

import java.io.FileInputStream;
import java.io.FileNotFoundException;

// * This state represents the menu where you choose between Level 1 or Level 2.
// */
public class ChooseLevel extends GameState {

	private String informationText;
	private String Title;
	private Color fontColor;
	public Rectangle level1 = new Rectangle(SCREEN_WIDTH / 2 - 120, 290, 200, 45);
	public Rectangle level2 = new Rectangle(SCREEN_WIDTH / 2 - 120, 360, 200, 45);
	public Rectangle mainmenu = new Rectangle(SCREEN_WIDTH / 2 - 120, 480, 200, 45);
	private Image button;

	// private font fonttext;
	// A PlayState, so we can change to the PlayState from the menu.
	private PlayState playState;
	private MenuState menuState;
	Font f1 = Font.font("Zapfino", FontWeight.BOLD, 33);
	Font f2 = Font.font("Zapfino", FontWeight.BOLD, 70);
	Font f3 = Font.font("Zapfino", FontWeight.BOLD, 23);

	public ChooseLevel(GameModel model, MenuState state) {
		super(model);
		playState = new PlayState(model);
		menuState = state;
		Title = "SPACE INVADERS";
		informationText = "Use Mouse to navigate the Menu";
		fontColor = Color.GOLD;
		try {
			button = new Image(new FileInputStream("button.png"));

		} catch (FileNotFoundException e) {
			System.out.println("Unable to find image-files!");
		}
	}

	public void showButtons(GraphicsContext g) {
		g.setFill(Color.TRANSPARENT);
		g.fillRect(level1.getX(), level1.getY(), level1.getWidth(), level1.getHeight());
		g.drawImage(button, level1.getX(), level1.getY(), level1.getWidth(), level1.getHeight());
		g.fillRect(level2.getX(), level2.getY(), level2.getWidth(), level2.getHeight());
		g.drawImage(button, level2.getX(), level2.getY(), level2.getWidth(), level2.getHeight());
		g.fillRect(mainmenu.getX(), mainmenu.getY(), mainmenu.getWidth(), mainmenu.getHeight());
		g.drawImage(button, mainmenu.getX(), mainmenu.getY(), mainmenu.getWidth(), mainmenu.getHeight());

		g.setFill(Color.GOLD);
		g.setFont(f3);
		g.fillText("Level 1", level1.getX() + 20, level1.getY() + 30);
		g.fillText("Level 2", level2.getX() + 20, level2.getY() + 30);
		g.fillText("Main menu", mainmenu.getX() + 20, mainmenu.getY() + 30);
	}

	/**
	 * Draws information text to the screen
	 */
	@Override
	public void draw(GraphicsContext g) {
		drawBg(g);
		showButtons(g);
		g.setFill(fontColor);
		g.setFont(f2); // Big letters
		g.fillText(Title, SCREEN_WIDTH / 5, SCREEN_HEIGHT / 6);
		g.setFont(f1);
		// Print the information text, centered on the canvas
		g.fillText(informationText, SCREEN_WIDTH / 4.1, SCREEN_HEIGHT / 3.5);

	}

	public void mouseClicked(MouseEvent m, GameModel model) {
		if (level1.contains(m.getX(), m.getY())) {
			model.reset();
			model.setMap(true);
			model.switchState(playState);
		}
		if (level2.contains(m.getX(), m.getY())) {
			model.reset();
			model.setMap(false);
			model.switchState(playState);
		}

		if (mainmenu.contains(m.getX(), m.getY())) {
			model.reset();
			model.switchState(menuState);
		}

	}

	/**
	 *
	 * @param key KeyEvent representing the pressed key
	 *
	 *            This function prints the pressed key to the console it's used to
	 *            show that a change of state has been made
	 *
	 *            For more information see GameState
	 */
//	@Override
//	public void keyPressed(KeyEvent key, GameModel model) {
//		System.out.println("Trycker på " + key.getCode() + " i MenuState");
//		if (key.getCode() == KeyCode.ENTER) {
//			model.reset();
//			model.switchState(playState);
//		} else if (key.getCode() == KeyCode.ESCAPE) {
//			System.mainmenu(0);
//		}
//	}

	/**
	 * We have nothing to update in the menu, no moving objects etc. so we leave the
	 * update method empty.
	 */
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