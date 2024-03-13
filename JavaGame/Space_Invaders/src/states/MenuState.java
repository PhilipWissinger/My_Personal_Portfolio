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

// * This state represents the menu of the Game The main responsibility of this
// * class is to allow the user to swap state to the PlayState
// */
public class MenuState extends GameState {

	private String informationText;
	private String Title;
//	private Color bgColor;
	private Color fontColor;
	private Image button;

	public Rectangle play = new Rectangle(SCREEN_WIDTH / 2 - 120, 290, 200, 45);
	public Rectangle highscore = new Rectangle(SCREEN_WIDTH / 2 - 120, 360, 200, 45);
	public Rectangle help = new Rectangle(SCREEN_WIDTH / 2 - 120, 420, 200, 45);
	public Rectangle exit = new Rectangle(SCREEN_WIDTH / 2 - 120, 480, 200, 45);

	// private font fonttext;
	// A PlayState, so we can change to the PlayState from the menu.
	private PlayState playState;
	private HighscoreState highscoreState;
	private HelpState helpState;
	private ChooseLevel chooseLevel;
	Font f0 = Font.font("Zapfino", FontWeight.BOLD, 23);
	Font f1 = Font.font("Zapfino", FontWeight.BOLD, 33);
	Font f2 = Font.font("Zapfino", FontWeight.BOLD, 70);

	public MenuState(GameModel model) {
		super(model);
		playState = new PlayState(model);
		highscoreState = new HighscoreState(model, this);
		helpState = new HelpState(model, this);
		chooseLevel = new ChooseLevel(model, this);
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
		g.fillRect(play.getX(), play.getY(), play.getWidth(), play.getHeight());
		g.drawImage(button, play.getX(), play.getY(), play.getWidth(), play.getHeight());
		g.fillRect(highscore.getX(), highscore.getY(), highscore.getWidth(), highscore.getHeight());
		g.drawImage(button, highscore.getX(), highscore.getY(), highscore.getWidth(), highscore.getHeight());
		g.fillRect(help.getX(), help.getY(), help.getWidth(), help.getHeight());
		g.drawImage(button, help.getX(), help.getY(), help.getWidth(), help.getHeight());
		g.fillRect(exit.getX(), exit.getY(), exit.getWidth(), exit.getHeight());
		g.drawImage(button, exit.getX(), exit.getY(), exit.getWidth(), exit.getHeight());

		g.setFont(f0);
		g.setFill(Color.GOLD);
		g.fillText("Play", play.getX() + 20, play.getY() + 30);
		g.fillText("Highscore", highscore.getX() + 20, highscore.getY() + 30);
		g.fillText("Help", help.getX() + 20, help.getY() + 30);
		g.fillText("Exit", exit.getX() + 20, exit.getY() + 30);
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
		if (play.contains(m.getX(), m.getY())) {
			model.reset();
			model.switchState(chooseLevel);
		}
		if (highscore.contains(m.getX(), m.getY())) {
			model.switchState(highscoreState);
		}
		if (help.contains(m.getX(), m.getY())) {
			model.switchState(helpState);
		}
		if (exit.contains(m.getX(), m.getY())) {
			System.exit(0);
		}

	}

	public void mouseHovered(MouseEvent m, GameModel model) {
		if (play.contains(m.getX(), m.getY())) {
			model.switchState(playState);
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
//			System.exit(0);
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
