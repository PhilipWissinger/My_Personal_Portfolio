package states;

import javafx.scene.canvas.GraphicsContext;
import javafx.scene.image.Image;
import javafx.scene.input.KeyEvent;
import javafx.scene.input.MouseEvent;

import static constants.Constants.SCREEN_HEIGHT;
import static constants.Constants.SCREEN_WIDTH;

import java.io.FileInputStream;
import java.io.FileNotFoundException;

/**
 * This class represents a state of the game. These states are different views
 * in the game, which contain their own separate logic.
 *
 * Examples of states are: menu, playing, paused, game over and many more
 *
 * This Class is an abstract class that defines a couple of general functions
 * that are used by the state machine to delegate work to the state.
 *
 * The responsibilities of a state are roughly speaking separated into three
 * categories: - Input from the user (keypresses, mouse clicks, etc.) - Internal
 * logic (move sprites, check for collision etc.) - Rendering (drawing objects
 * to the screen)
 *
 * These steps are represented by the functions: - keyPressed (input step) -
 * update (logic step) - draw (rendering step)
 *
 * To define a valid state, that state has to be derived from this class, and
 * needs to override the three functions mentioned above.
 */

public abstract class GameState {

	protected GameModel model;
	private Image space;

	public GameState(GameModel model) {
		this.model = model;
	}

	public abstract void update(boolean right, boolean shot, GameModel model);

	public abstract void draw(GraphicsContext g);

	/**
	 * This function is called for each keyPressed event which occurs on the
	 * GamePanel. It is the responsibility of the state to filter out any keys it is
	 * interested in, since no filtering is performed before calling this function.
	 *
	 * What this means is that if a state only wants to know if a certain key has
	 * been pressed, the state needs to check for that event inside this function.
	 */
	public void keyPressed(KeyEvent key, GameModel model) {

	}

	public void mouseClicked(MouseEvent m, GameModel model) {

	}

	public void mouseHovered(MouseEvent m, GameModel model) {

	}

	/**
	 *
	 * @param g     GraphicsContext object provided by the current state
	 * @param color The color of the background
	 *
	 *              This function is used in all states that want to draw a
	 *              background therefore it is moved to the super class. Having this
	 *              function in the super class instead of each state removes
	 *              redundancy.
	 */
	public void drawBg(GraphicsContext g) {
		// Here we can draw a background if we so desire.

		try {
			if (!model.getMap() && model.getCurrentState().getClass().getSimpleName().contains("PlayState")) {
				space = new Image(new FileInputStream("space2.jpg"));
			} else {
				space = new Image(new FileInputStream("space1.png"));

			}
		} catch (FileNotFoundException e) {
			System.out.println("Unable to find image-files!");
		}

		g.drawImage(space, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

	}

	/**
	 * This function is called whenever this state becomes the active one in the
	 * state machine.
	 *
	 * By default it does nothing, but can be useful sometimes. E.g. unpause, or
	 * load something.
	 */
	public abstract void activate();

	/**
	 * This function is called whenever this state is replaced with another state in
	 * the state machine.
	 * 
	 * Can be used to, for example, set a pause flag, save, etc.
	 */
	public abstract void deactivate();
}