package states;

import javafx.scene.canvas.GraphicsContext;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.*;

import javafx.scene.shape.*;

import static constants.Constants.SCREEN_HEIGHT;
import static constants.Constants.SCREEN_WIDTH;

//* This state represents the menu where you choose between Level 1 or Level 2.
//*/

public class NameChooser extends GameState {
	private GameModel mymodel;
	private String informationText;
	private String Title;
	private Color fontColor;
	private String playername = "";
	public Rectangle namebox = new Rectangle(SCREEN_WIDTH / 2 - 120, 290, 200, 45);
	private MenuState menuState;
	Font f1 = Font.font("Zapfino", FontWeight.BOLD, 33);
	Font f2 = Font.font("Zapfino", FontWeight.BOLD, 70);

	public NameChooser(GameModel model) {
		super(model);
		mymodel = model;
		menuState = new MenuState(model);
		Title = "SPACE INVADERS";
		informationText = "Choose your name";
		fontColor = Color.GOLD;

	}

	public void showButtons(GraphicsContext g) {
		g.setFill(Color.BLACK);
		g.fillRect(namebox.getX() - 70, namebox.getY(), namebox.getWidth() + 150, namebox.getHeight());
		g.setFill(Color.GOLD);
		g.fillText(playername, namebox.getX() - 68, namebox.getY() + 33);
	}

	@Override
	public void draw(GraphicsContext g) {
		drawBg(g);
		showButtons(g);
		g.setFill(fontColor);
		g.setFont(f2); // Big letters
		g.fillText(Title, SCREEN_WIDTH / 5, SCREEN_HEIGHT / 6);
		g.setFont(f1);
		g.fillText(informationText, SCREEN_WIDTH / 3, SCREEN_HEIGHT / 3.5);

	}

	@Override
	public void keyPressed(KeyEvent key, GameModel model) {
		if (playername.length() < 10) {
			playername = playername + key.getText();
		}

		System.out.println("Trycker på " + key.getCode() + " i MenuState");
		if (key.getCode() == KeyCode.ENTER) {
			model.reset();
			model.switchState(menuState);
		} else if (key.getCode() == KeyCode.ESCAPE) {
			System.exit(0);
		} else if (key.getCode() == KeyCode.BACK_SPACE) {
			try {
				playername = playername.substring(0, playername.length() - 1);
			} catch (StringIndexOutOfBoundsException siobe) {

			}
		}
	}

	@Override
	public void update(boolean right, boolean shot, GameModel model) {
		mymodel.setName(playername);
	}

	@Override
	public void activate() {

	}

	@Override
	public void deactivate() {

	}

}
