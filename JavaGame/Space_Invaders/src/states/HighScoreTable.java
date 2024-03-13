package states;

import java.io.*;
import java.util.*;

/**
 * This class is used to add, sort and read from the Highscore text file.
 */

public class HighScoreTable {

	private HashMap<Integer, String> hList = new HashMap<Integer, String>();
	private GameModel model;

	public HighScoreTable(GameModel model) {

		this.model = model;
	}

	public void addtofile(Integer points, String name, File file) {

		hList.put(points, name);
		try {
			FileWriter writer = new FileWriter(file, false);
			for (Integer key : hList.keySet()) {
				writer.write(key + " " + hList.get(key) + "\n");
			}
			writer.close();
		} catch (IOException ioe) {
			ioe.printStackTrace();
		}

	}

	public void readfromfile(File file) {

		Scanner scanner;
		try {
			scanner = new Scanner(file);
			while (scanner.hasNext()) {
				int points = scanner.nextInt();
				String name = scanner.next();
				hList.put(points, name);
			}
			scanner.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}

	public HashMap<Integer, String> gethList() {
		return hList;
	}

	public String showSortedHighscore() {
		String tempString = "";
		List<Integer> sortedScores = new ArrayList<>(hList.keySet());
		Collections.sort(sortedScores);
		Collections.reverse(sortedScores);
		model.setHighscore(sortedScores.get(0));
		for (int i = 0; i < sortedScores.size(); i++) {
			tempString = tempString + "\n" + hList.get(sortedScores.get(i)) + "  " + sortedScores.get(i);
			if (i > 3) {
				break;
			}
		}
		return tempString;
	}

	public void clearMap() {
		hList.clear();
	}

}
