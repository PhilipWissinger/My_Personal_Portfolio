package states;

import java.io.File;

import javafx.scene.canvas.GraphicsContext;
import javafx.scene.input.KeyEvent;
import javafx.scene.input.MouseEvent;

/**
 * This class represents the current state of the game.
 *
 * This implementation of a state machine keeps a reference to the current state
 * (see /src/states/GameState).
 *
 * Please note: This is just one way to do it, there are several other ways and
 * none of them work for every case, so if you want to implement your own state
 * machine make sure that it can do all the operations that you need for your
 * project.
 *
 * To change state simply call the switchState(GameState nextState) function
 * passing a reference to some other gameState.
 *
 * Initial State: MenuState
 *
 */

public class GameModel {

	private GameState currentState;
	private boolean right = true;
	private boolean shot = false;
	private boolean gameOver = false;
	private boolean gameWon = false;
	private boolean map1 = false;
	private int score = 0;
	private int highscore = 0;
	private int lives = 3;
	private String name;
	private File myFile1 = new File("spaceinvaders_highscore1.txt");
	private File myFile2 = new File("spaceinvaders_highscore2.txt");

	public GameModel() {
		// We start out in the MenuState.
		this.currentState = new NameChooser(this);
	}

	/**
	 * Switch to a new state, stored in the 'state' reference.
	 *
	 * This will call 'deactivate' on the current state, then store the new state as
	 * the current state, and finally call 'activate' on the new current state.
	 */
	public void switchState(GameState nextState) {
		// currentState.deactivate();
		currentState = nextState;
		// currentState.activate();
	}

	/**
	 * Delegates the keyPress from GamePanel to the current state
	 * 
	 * @param key
	 */
	public void keyPressed(KeyEvent key, GameModel model) {
		currentState.keyPressed(key, this);
	}

	public void mouseClicked(MouseEvent m, GameModel model) {
//		if(play.contains(m.getX(), m.getY())) {
//			model.switchState(playState);
//		}
		currentState.mouseClicked(m, this);

	}

	public void mouseHovered(MouseEvent m, GameModel model) {
//		if(play.contains(m.getX(), m.getY())) {
//			model.switchState(playState);
//		}
		currentState.mouseHovered(m, this);

	}

	/**
	 * The update function is called every iteration of the game loop. it's usually
	 * used to update the games logic e.g. objects position, velocity, etc...
	 */
	public void update(boolean right, boolean shot) {
		currentState.update(right, shot, this);

	}

	public boolean getRight() {
		return right;
	}

	public boolean getShot() {
		return shot;
	}

	public boolean getGameOver() {
		return gameOver;
	}

	public GameState getCurrentState() {
		return currentState;
	}

	public boolean getGameWon() {
		return gameWon;
	}

	public void reset() {
		gameOver = false;
		gameWon = false;
		lives = 3;
		score = 0;
	}

	public int getScore() {
		return score;
	}

	public int getHighscore() {
		return highscore;
	}

	public int getLives() {
		return lives;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setScore(int score) {
		this.score += score;
	}

	public void setHighscore(int highscore) {
		this.highscore = highscore;
	}

	public void setLives() {
		this.lives -= 1;
	}

	public void setRight(boolean right) {
		this.right = right;
	}

	public void setShot(boolean shot) {
		this.shot = shot;
	}

	public void setGameOver(boolean x) {
		gameOver = x;
	}

	public void setGameWon(boolean x) {
		gameWon = x;
	}

	public void setMap(boolean x) {
		map1 = x;
	}

	public boolean getMap() {
		return map1;
	}

	public File getFile1() {
		return myFile1;
	}

	public File getFile2() {
		return myFile2;
	}

	/**
	 * @param g Graphics object passed from GamePanel This function delegates
	 *          drawing from the GamePanel to the current state
	 */
	public void draw(GraphicsContext g) {
		currentState.draw(g);
	}
}
