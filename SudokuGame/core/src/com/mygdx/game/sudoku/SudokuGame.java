package com.mygdx.game.sudoku;

import com.badlogic.gdx.Game;

public class SudokuGame extends Game {
    @Override
    public void create() {
        setScreen(new MainMenuScreen(this));
    }
}
