package states;

import javafx.scene.canvas.GraphicsContext;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import levels.Level1;
import levels.Level2;

/**
 * This state represents the Playing State of the Game The main responsibility
 * of this class is to; - create Game Objects - update Game Objects - draw Game
 * Objects Game Objects are for instance; players, enemies, npc's, etc...
 *
 * The PlayState can also be thought off as a blue print where data is loaded
 * into some container from a file or some other type of data storage.
 *
 * It can also be created by some class responsible for object creation and then
 * passed to the PlayState as a parameter. This means all the PlayState has to
 * do is receive a list of objects, store them in some container and then for
 * every object in that container update and render that object.
 *
 * This way you can let the user define different Levels based on what
 * parameters are passed into the PlayState.
 */
public class PlayState extends GameState {

	private String informationText;
	private Color fontColor;
	private boolean turnRight = true;
	private boolean shot = false;
	Font f1 = Font.font("Zapfino", FontWeight.BOLD, 25);
	Font f2 = Font.font("Zapfino", FontWeight.BOLD, 50);

	private Level1 onAction1;
	private Level2 onAction2;
	private GameModel myModel;

	public PlayState(GameModel model) {
		super(model);
		informationText = "Press Escape To Return To The Menu";

		fontColor = Color.GOLD;

		onAction1 = new Level1();
		onAction2 = new Level2();
		myModel = model;

	}

	/**
	 * Draws information text to the screen.
	 */
	@Override
	public void draw(GraphicsContext g) {
		drawBg(g);

		if (myModel.getGameOver()) {
			g.setFont(f2); // Big letters
			g.fillText("Game Over", 350, 300);
			g.fillText("Your Score: " + myModel.getScore(), 310, 400);
			g.fillText(informationText, 70, 500);

		} else if (myModel.getGameWon()) {
			g.setFont(f2); // Big letters
			g.fillText("Game Won", 360, 300);
			g.fillText("Your Score: " + myModel.getScore(), 310, 400);
			g.fillText(informationText, 70, 500);

		} else {

			g.setFill(fontColor);
			g.setFont(f1); // Big letters
			g.fillText("Score: " + model.getScore(), 40, 30);
			g.fillText("Highscore: " + model.getHighscore(), 200, 30);
			g.fillText("Lives: " + model.getLives(), 420, 30);
			g.fillText(informationText, 550, 30);

			if (myModel.getMap()) {
				onAction1.delegate(g);
			} else if (!myModel.getMap()) {
				onAction2.delegate(g);
			}
		}
	}

	@Override
	public void keyPressed(KeyEvent key, GameModel model) {

		shot = false;

		System.out.println("Trycker på " + key.getCode() + " i PlayState");
		if (key.getCode() == KeyCode.ESCAPE) {
			model.switchState(new MenuState(model));
		}
		if (!model.getGameOver()) {
			if (key.getCode() == KeyCode.A || key.getCode() == KeyCode.LEFT) {
				turnRight = false;
				model.setRight(turnRight);
			} else if (key.getCode() == KeyCode.D || key.getCode() == KeyCode.RIGHT) {
				turnRight = true;
				model.setRight(turnRight);
			} else if (key.getCode() == KeyCode.SPACE) {
				shot = true;
				model.setShot(shot);
			}
		}
	}

	@Override
	public void update(boolean right, boolean shot, GameModel model) {
		// Here one would probably instead move the player and any
		// enemies / moving obstacles currently active.
		if (model.getGameWon()) {
			model.setGameOver(true);
		}
		if (!model.getGameOver() || !model.getGameWon()) {
			if (model.getMap()) {
				onAction1.update(right, shot, model);
			} else if (!model.getMap()) {
				onAction2.update(right, shot, model);
			}
		}
		if (model.getGameWon()) {
			model.setGameOver(false);
		}
	}

	/**
	 * We currently don't have anything to activate in the PlayState so we leave
	 * this method empty in this case.
	 */
	@Override
	public void activate() {

	}

	/**
	 * We currently don't have anything to deactivate in the PlayState so we leave
	 * this method empty in this case.
	 */
	@Override
	public void deactivate() {

	}

}
