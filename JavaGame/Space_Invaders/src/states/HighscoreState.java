package states;

import javafx.scene.canvas.GraphicsContext;
import javafx.scene.input.KeyEvent;
import javafx.scene.input.MouseEvent;
import javafx.scene.paint.Color;

import javafx.scene.image.Image;
import javafx.scene.text.*;

import javafx.scene.shape.*;

import static constants.Constants.SCREEN_HEIGHT;
import static constants.Constants.SCREEN_WIDTH;

import java.io.FileInputStream;
import java.io.FileNotFoundException;

/**
 * This state shows tables of Highscores for level 1 and level 2 respectively.
 */

public class HighscoreState extends GameState {

	protected GameModel model;
	private String informationText;
	private String Title;
	private Color fontColor;
	private String highscores1;
	private String highscores2;
	private Image button;

	public Rectangle mainMenu = new Rectangle(SCREEN_WIDTH / 2 - 120, 600, 200, 45);
	public Polygon p = new Polygon(SCREEN_WIDTH / 2 + 10, SCREEN_HEIGHT / 3.5, SCREEN_WIDTH / 2,
			SCREEN_HEIGHT / 3.5 + 20, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 3.5 + 300, SCREEN_WIDTH / 2 + 10,
			SCREEN_HEIGHT / 3.5 + 320, SCREEN_WIDTH / 2 - 10, SCREEN_HEIGHT / 3.5 + 300, SCREEN_WIDTH / 2 - 10,
			SCREEN_HEIGHT / 3.5);

	private HighScoreTable hst;
	private GameState gameState;

	Font f0 = Font.font("Zapfino", FontWeight.BOLD, 45);
	Font f1 = Font.font("Zapfino", FontWeight.BOLD, 33);
	Font f2 = Font.font("Zapfino", FontWeight.BOLD, 70);
	Font f3 = Font.font("Zapfino", FontWeight.BOLD, 23);

	public HighscoreState(GameModel model, GameState state) {
		super(model);
		this.model = model;
		gameState = state;
		hst = new HighScoreTable(model);
		Title = "SPACE INVADERS";
		informationText = "Highscore";
		fontColor = Color.GOLD;

		hst.readfromfile(model.getFile1());
		highscores1 = hst.showSortedHighscore();
		hst.clearMap();
		hst.readfromfile(model.getFile2());
		highscores2 = hst.showSortedHighscore();

		try {
			button = new Image(new FileInputStream("button.png"));

		} catch (FileNotFoundException e) {
			System.out.println("Unable to find image-files!");
		}
	}

	public void showButtons(GraphicsContext g) {
		g.setFill(Color.TRANSPARENT);
		g.fillRect(mainMenu.getX(), mainMenu.getY(), mainMenu.getWidth(), mainMenu.getHeight());
		g.drawImage(button, mainMenu.getX(), mainMenu.getY(), mainMenu.getWidth(), mainMenu.getHeight());

		g.setFill(Color.GOLD);
		g.fillPolygon(
				new double[] { SCREEN_WIDTH / 2 - 27, SCREEN_WIDTH / 2 - 7 - 27, SCREEN_WIDTH / 2 - 7 - 27,
						SCREEN_WIDTH / 2 - 27, SCREEN_WIDTH / 2 + 7 - 27, SCREEN_WIDTH / 2 + 7 - 27 },
				new double[] { SCREEN_HEIGHT / 3.5 + 30, SCREEN_HEIGHT / 3.5 + 50, SCREEN_HEIGHT / 3.5 + 320,
						SCREEN_HEIGHT / 3.5 + 340, SCREEN_HEIGHT / 3.5 + 320, SCREEN_HEIGHT / 3.5 + 50, },
				6);
		g.setFont(f3);
		g.fillText("Main menu", mainMenu.getX() + 20, mainMenu.getY() + 30);
	}

	@Override
	public void draw(GraphicsContext g) {
		drawBg(g);
		showButtons(g);
		g.setFill(fontColor);
		g.setFont(f2); // Big letters
		g.fillText(Title, SCREEN_WIDTH / 5, SCREEN_HEIGHT / 6);
		g.setFont(f0);
		g.fillText(informationText, SCREEN_WIDTH / 2.5 - 29, SCREEN_HEIGHT / 3.5);
		g.setFont(f1);
		g.fillText("Level 1 \n" + highscores1, 100, 300);
		g.fillText("Level 2 \n" + highscores2, 700, 300);

	}

	public void mouseClicked(MouseEvent m, GameModel model) {
		if (mainMenu.contains(m.getX(), m.getY())) {
			model.switchState(gameState);
		}

	}

	public void mouseHovered(MouseEvent m, GameModel model) {
	}

	@Override
	public void keyPressed(KeyEvent key, GameModel model) {
	}

	@Override
	public void update(boolean right, boolean shot, GameModel model) {
	}

	@Override
	public void activate() {

	}

	@Override
	public void deactivate() {

	}

}
