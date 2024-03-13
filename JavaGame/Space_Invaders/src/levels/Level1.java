package levels;

import javafx.scene.canvas.GraphicsContext;
import javafx.scene.image.Image;

import main.OwnImage;
import main.Enemy;
import main.MyShot;
import main.MyWall;
import main.ShootPowerUp;
import main.MovementPowerUp;
import main.MonsterShot;
import states.GameModel;
import states.HighScoreTable;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Random;

import static constants.Constants.SCREEN_HEIGHT;
import static constants.Constants.SCREEN_WIDTH;
import static constants.Constants.MONSTER_AMOUNT_PER_ROW;
import static constants.Constants.MONSTER_AMOUNT_TOTAL;

/**
 * This class is used for the first level.
 */
public class Level1 {
	// Internal class, mostly to show how it works in case you need it.
	public class Point {
		double x;
		double y;

		public Point(double x, double y) {
			this.x = x;
			this.y = y;
		}
	}

	private HighScoreTable hst;
	private Point position;
	private Point spaceshipPosition;

	private ArrayList<OwnImage> images;
	private ArrayList<Enemy> enemys;
	private ArrayList<MyShot> myShots;
	private ArrayList<MyWall> myWalls;
	private ArrayList<MonsterShot> monsterShots;
	private Image redAlien;
	private Image greenAlien;
	private Image spaceShip;
	private Image wall;
	private Image laser;
	private Image monsterShot;
	private Image redPowerUp;
	private Image greenPowerUp;
	private Image hitAnimation;
	private GameModel myModel;
	private boolean monstersLeft = false;
	private boolean redPowerUpTaken = false;
	private boolean greenPowerUpTaken = false;
	private boolean playerHit = false;
	private int updateCounter = 0;
	private int updateCounterGreen = 0;
	private int updateCounterRed = 0;
	private ShootPowerUp red;
	private MovementPowerUp green;

	public Level1() {
		images = new ArrayList<OwnImage>();
		enemys = new ArrayList<Enemy>();
		myShots = new ArrayList<MyShot>();
		myWalls = new ArrayList<MyWall>();
		monsterShots = new ArrayList<MonsterShot>();

		position = new Point(0, 0);
		spaceshipPosition = new Point(position.x + 455, position.y + 710);

		try {
			redAlien = new Image(new FileInputStream("red-alien.png"));
			greenAlien = new Image(new FileInputStream("green-alien.png"));
			spaceShip = new Image(new FileInputStream("spaceship.png"));
			laser = new Image(new FileInputStream("laser.png"));
			wall = new Image(new FileInputStream("wall.png"));
			monsterShot = new Image(new FileInputStream("monstershot.png"));
			redPowerUp = new Image(new FileInputStream("RedPowerUp.png"));
			greenPowerUp = new Image(new FileInputStream("GreenPowerUp.png"));
			hitAnimation = new Image(new FileInputStream("BossHitAnimation.png"));

		} catch (FileNotFoundException e) {
			System.out.println("Unable to find image-files!");
		}
		setWalls();
		setMonsterList();
	}

	public void setWalls() {

		myWalls.add(new MyWall(wall, 100 + 230 * 0, 650, 120.0, 40.0));
		myWalls.add(new MyWall(wall, 100 + 230 * 1, 650, 120.0, 40.0));
		myWalls.add(new MyWall(wall, 100 + 230 * 2, 650, 120.0, 40.0));
		myWalls.add(new MyWall(wall, 100 + 230 * 3, 650, 120.0, 40.0));
	}

	private static int randomInteger() {
		Random generator = new Random();
		return generator.nextInt(450);
	}

	public void monsterShotRandomizer() {
		for (Enemy enemy : enemys) {
			if (randomInteger() == 5) {
				monsterShots.add(new MonsterShot(monsterShot, enemy.getX() + 40 / 2 - 25 / 2, enemy.getY(), 25, 30));
			}
		}
	}

	public void setMonsterList() {
		for (int i = 0; i <= MONSTER_AMOUNT_TOTAL - 1; i++) {

			if ((i % 2 == 0) && (i <= 14)) {
				enemys.add(new Enemy(redAlien, 50 * i, 0, 40.0, 40.0, 2));
			} else if ((i % 2 != 0) && (i <= 14)) {
				enemys.add(new Enemy(greenAlien, 50 * i, 0, 40.0, 40.0, 1));
			} else if ((i % 2 == 0) && (i > 14) && (i <= 29)) {
				enemys.add(new Enemy(redAlien, 50 * (i - MONSTER_AMOUNT_PER_ROW), 40, 40.0, 40.0, 2));
			} else if ((i % 2 != 0) && (i > 14) && (i <= 29)) {
				enemys.add(new Enemy(greenAlien, 50 * (i - MONSTER_AMOUNT_PER_ROW), 40, 40.0, 40.0, 1));
			} else if ((i % 2 == 0) && (i > 29)) {
				enemys.add(new Enemy(redAlien, 50 * (i - 2 * MONSTER_AMOUNT_PER_ROW), 80, 40.0, 40.0, 2));
			} else if ((i % 2 != 0) && (i > 29)) {
				enemys.add(new Enemy(greenAlien, 50 * (i - 2 * MONSTER_AMOUNT_PER_ROW), 80, 40.0, 40.0, 1));
			}
		}
	}

	public void dropPowerUps(int updateCounter) {
		if (updateCounter % 420 == 0 || updateCounter == 130) {
			red = new ShootPowerUp(redPowerUp, spaceshipPosition.x, 0, 25.0, 30.0);

		} else if (updateCounter % 560 == 0 || updateCounter == 180) {
			green = new MovementPowerUp(greenPowerUp, spaceshipPosition.x, 0, 25.0, 30.0);
		}
	}

	public void catchPowerUps() {

		if (green != null) {
			if (green.getX() >= spaceshipPosition.x && green.getX() <= spaceshipPosition.x + 90
					&& green.getY() <= spaceshipPosition.y + 90 && green.getY() >= spaceshipPosition.y) {
greenPowerUpTaken = true;
green.setY(100);
			} else if (green.getY() <= 800 && !greenPowerUpTaken) {
				images.add(new OwnImage(green.getImage(), green.getX(), green.getY(), green.getWidth(), green.getHeight()));
				green.setY(6);
			}

		}

		if (red != null) {
			if (red.getX() >= spaceshipPosition.x && red.getX() <= spaceshipPosition.x + 90
					&& red.getY() <= spaceshipPosition.y + 90 && red.getY() >= spaceshipPosition.y) {
				redPowerUpTaken = true;
red.setY(100);
			} else if (red.getY() <= 800 && !redPowerUpTaken) {
				images.add(new OwnImage(red.getImage(), red.getX(), red.getY(), red.getWidth(), red.getHeight()));
				red.setY(6);
			}

		}
	}

	public void spaceshipMover(boolean right) {
		if (right && spaceshipPosition.x <= SCREEN_WIDTH - 90) {
			if (greenPowerUpTaken && updateCounterGreen < 90) {
				updateCounterGreen += 1;
				spaceshipPosition.x += green.perform();

			} else {
				spaceshipPosition.x += 5;
				greenPowerUpTaken = false;
				updateCounterGreen = 0;

			}
		} else if (!right && spaceshipPosition.x >= 0) {
			if (greenPowerUpTaken && updateCounterGreen < 90) {
				updateCounterGreen += 1;
				spaceshipPosition.x -= green.perform();

			} else {
				spaceshipPosition.x -= 5;
				greenPowerUpTaken = false;
				updateCounterGreen = 0;

			}
		}
	}

	public void monsterMover() {
		int jumpDown = 0;
		for (Enemy enemy : enemys) {
			if (enemy.getX() > SCREEN_WIDTH - 40) {
				monstersLeft = true;
			} else if (enemy.getX() < 0) {
				monstersLeft = false;

			}
		}

		for (Enemy enemy : enemys) {
			if (enemy.getX() > SCREEN_WIDTH - 40) {
				monstersLeft = true;
				for (Enemy enemy1 : enemys) {
					if (jumpDown == 0) {
						enemy1.setY(20);
					}
				}
				jumpDown += 1;
			} else if (enemy.getX() < 0) {
				monstersLeft = false;
				for (Enemy enemy1 : enemys) {
					if (jumpDown == 0) {
						enemy1.setY(20);
					}
				}
				jumpDown += 1;

			}
		}

		for (Enemy enemy : enemys) {

			if (!monstersLeft) {
				enemy.setX(3);
			} else {
				enemy.setX(-3);

			}

		}

	}

	public void shotMover(GameModel model) {
		for (MyShot myShot : myShots) {
			if (redPowerUpTaken && updateCounterRed < 120) {
				updateCounterRed += 1;
				myShot.setY(red.perform());

			} else if (myShot.getY() < 0) {
				myShots.remove(myShot);
				break;
			} else {
				myShot.setY(-13);
				redPowerUpTaken = false;
				updateCounterRed = 0;

			}
		}

		if (model.getShot()) {
			myShots.add(new MyShot(laser, spaceshipPosition.x + 90 / 2 - 25 / 2, spaceshipPosition.y, 25.0, 30.0));
			model.setShot(false);
		}

		images.addAll(myShots);
	}

	public void monsterShotMover() {
		for (MonsterShot monsterShot : monsterShots) {
			if (monsterShot.getY() > 800) {
				monsterShots.remove(monsterShot);
				break;
			} else {
				monsterShot.setY(8);
			}
		}
	}

	public void wallObstacle(GameModel model) {
		for (MyWall myWall : myWalls) {
			for (MyShot myShot : myShots) {
				if (myShot.getX() >= myWall.getX() - 25 && myShot.getX() <= myWall.getX() + 120
						&& myShot.getY() <= myWall.getY() + 40 && myShot.getY() >= myWall.getY()) {
					myShots.remove(myShot);
					break;
				}
			}
		}

		for (MyWall myWall : myWalls) {
			for (MonsterShot monsterShot : monsterShots) {
				if (monsterShot.getX() >= myWall.getX() - 25 && monsterShot.getX() <= myWall.getX() + 120 - 25
						&& monsterShot.getY() <= myWall.getY() + 40 && monsterShot.getY() >= myWall.getY()) {
					monsterShots.remove(monsterShot);
					break;
				}
			}
		}

	}

	public void playerHitIdentifier() {
		playerHit = false;

		for (MonsterShot monsterShot : monsterShots) {
			if (monsterShot.getX() >= spaceshipPosition.x && monsterShot.getX() <= spaceshipPosition.x + 90
					&& monsterShot.getY() <= spaceshipPosition.y + 90 && monsterShot.getY() >= spaceshipPosition.y) {
				playerHit = true;
				monsterShots.remove(monsterShot);
				break;
			}
		}

	}

	public void monsterHitIdentifier(GameModel model) {
		boolean breaker = false;
		for (Enemy enemy : enemys) {
			for (MyShot myShot : myShots) {
				if (myShot.getX() >= enemy.getX() && myShot.getX() <= enemy.getX() + 40
						&& myShot.getY() <= enemy.getY() + 40 && myShot.getY() >= enemy.getY()) {
					myShots.remove(myShot);
					images.add(new OwnImage(hitAnimation, enemy.getX() - 10, enemy.getY() - 10, 60, 60));
					if (enemy.getHealth() > 1) {
						enemy.setHealth();
						model.setScore(10);
						System.out.println(enemy.getHealth());
						break;
					} else {
						model.setScore(20);
						enemys.remove(enemy);
						breaker = true;
						break;
					}
				}

			}
			if (breaker) {
				break;
			}
			if (enemy.getY() >= 650) {
				model.setGameOver(true);
				hst = new HighScoreTable(model);
				hst.readfromfile(myModel.getFile1());
				hst.addtofile(model.getScore(), model.getName(), model.getFile1());
				break;
			}

			if (model.getScore() == 1130) { // max score
				model.setGameWon(true);
				hst = new HighScoreTable(model);
				hst.readfromfile(model.getFile1());
				hst.addtofile(model.getScore(), model.getName(),model.getFile1());
			}



		}

		if (model.getScore() == 1130) { // max score
			model.setGameWon(true);
			hst = new HighScoreTable(model);
			hst.readfromfile(model.getFile1());
			hst.addtofile(model.getScore(), model.getName(), model.getFile1());
		}

	}

	public void monsters(GameModel model) {
		images.addAll(enemys);
	}

	public void playerHitAction(GameModel model) {
		if (playerHit) {

			if (model.getLives() > 1) {
				model.setLives();
			} else {
				images.removeAll(images);
				model.setGameOver(true);
				myModel = model;
				hst = new HighScoreTable(model);
				hst.readfromfile(myModel.getFile1());
				hst.addtofile(model.getScore(), model.getName(), model.getFile1());
			}

		} else {
			images.add(new OwnImage(spaceShip, spaceshipPosition.x, spaceshipPosition.y, 90.0, 90.0));

		}

	}

	public void update(boolean right, boolean shot, GameModel model) {
		// We move the position for the images each "tick", or call from the timer.
		// Can be adjusted to accomodate how fast you wish to move.
		updateCounter += 1;
		images.removeAll(images);
		images.addAll(myWalls);
		images.addAll(monsterShots);
		dropPowerUps(updateCounter);

		catchPowerUps();

		spaceshipMover(right);

		monsterMover();

		shotMover(model);

		monsterShotRandomizer();

		monsterShotMover();

		wallObstacle(model);

		playerHitIdentifier();

		monsters(model);

		monsterHitIdentifier(model);

		playerHitAction(model);
	}

	public void delegate(GraphicsContext g) {
		if (g != null) {
			draw(g);
		}

	}

	private void draw(GraphicsContext g) {
		if (position.x >= SCREEN_WIDTH || position.y >= SCREEN_HEIGHT) {
			// The position is exiting the screen, so we reset it
			position.x = 0.0;
			position.y = 0.0;

		}

		for (OwnImage image : images) {
			g.drawImage(image.getImage(), image.getX(), image.getY(), image.getWidth(), image.getHeight());
		}

	}

}
