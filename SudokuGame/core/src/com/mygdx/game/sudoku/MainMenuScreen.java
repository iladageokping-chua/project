package com.mygdx.game.sudoku;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Input;
import com.badlogic.gdx.InputAdapter;
import com.badlogic.gdx.Screen;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.math.Vector3;
import com.badlogic.gdx.audio.Music;

public class MainMenuScreen implements Screen {
    private static final int BUTTON_WIDTH = 328; // ขยายความกว้างของปุ่ม
    private static final int BUTTON_HEIGHT = 164; // ขยายความสูงของปุ่ม
    private static final int BUTTON_SPACING = 20; // ระยะห่างระหว่างปุ่ม
    private static final int OFFSET_Y = -250;

    private SudokuGame game;
    private OrthographicCamera camera;
    private SpriteBatch batch;
    //private BitmapFont font;

    private Texture easyButtonTexture;
    private Texture mediumButtonTexture;
    private Texture hardButtonTexture;
    private Texture backgroundTexture;

    private Music backgroundMusic;
    private boolean musicOn = true;

    public MainMenuScreen(SudokuGame game) {
        this.game = game;
        camera = new OrthographicCamera();
        camera.setToOrtho(false, Gdx.graphics.getWidth(), Gdx.graphics.getHeight());
        batch = new SpriteBatch();
        //font = new BitmapFont();
        //font.getData().setScale(3);
        
        // โหลด ภาพ และนำมาใช้
        easyButtonTexture = new Texture(Gdx.files.internal("easy.png"));
        mediumButtonTexture = new Texture(Gdx.files.internal("medium.png"));
        hardButtonTexture = new Texture(Gdx.files.internal("hard.png"));
        backgroundTexture = new Texture(Gdx.files.internal("bg_start.jpg"));
        // โหลด เสียง และนำมาใช้
        backgroundMusic = Gdx.audio.newMusic(Gdx.files.internal("background_music.mp3"));
        backgroundMusic.setLooping(true);
        if (musicOn) {
            backgroundMusic.play();
        } else {
            backgroundMusic.pause();
        }
    }
    
    @Override
    public void show() {
    	// แสดงภาพ ข้อมูลบนหน้าจอ เช่น พวกปุ่ม Mode Easy, Medium, Hard
        Gdx.input.setInputProcessor(new InputAdapter() {
            @Override
            public boolean touchDown(int screenX, int screenY, int pointer, int button) {
                Vector3 touchPos = new Vector3(screenX, screenY, 0);
                camera.unproject(touchPos);
                
                int screenWidth = Gdx.graphics.getWidth();
                int screenHeight = Gdx.graphics.getHeight();

                float easyButtonY = (screenHeight / 2) + BUTTON_HEIGHT + BUTTON_SPACING + OFFSET_Y;
                float mediumButtonY = (screenHeight / 2) + OFFSET_Y;
                float hardButtonY = (screenHeight / 2) - BUTTON_HEIGHT - BUTTON_SPACING + OFFSET_Y;

                if (touchPos.x > (screenWidth - BUTTON_WIDTH) / 2 && touchPos.x < (screenWidth + BUTTON_WIDTH) / 2) {
                    if (touchPos.y > easyButtonY && touchPos.y < easyButtonY + BUTTON_HEIGHT) {
                        backgroundMusic.pause();
                        game.setScreen(new SudokuScreen(game, "Easy"));
                        playButtonClickSound();
                    } else if (touchPos.y > mediumButtonY && touchPos.y < mediumButtonY + BUTTON_HEIGHT) {
                        backgroundMusic.pause();
                        game.setScreen(new SudokuScreen(game, "Medium"));
                        playButtonClickSound();
                    } else if (touchPos.y > hardButtonY && touchPos.y < hardButtonY + BUTTON_HEIGHT) {
                        backgroundMusic.pause();
                        game.setScreen(new SudokuScreen(game, "Hard"));
                        playButtonClickSound();
                    }
                }
                return true;
            }
        });
    }

    private void playButtonClickSound() {
    	// คลิกปุ่มแล้วจะมีเสียง effect click button ดังขึ้น
        Music buttonClickSound = Gdx.audio.newMusic(Gdx.files.internal("button_click.mp3"));
        buttonClickSound.play();
    }


    @Override
    public void render(float delta) { // มีค่าประมาณ 1/60 วิ ต่อ เฟรม ช่วยในการควบคุมการเคลื่อนไหวภาพในเกม
    	
    	// กด ESC เพื่อปิดโปรแกรม
        if (Gdx.input.isKeyPressed(Input.Keys.ESCAPE)) {
            Gdx.app.exit();
        }

        Gdx.gl.glClearColor(1, 1, 1, 1); // สีพื้นหลัง
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
        camera.update();
        batch.setProjectionMatrix(camera.combined);

        batch.begin();

        int screenWidth = Gdx.graphics.getWidth();
        int screenHeight = Gdx.graphics.getHeight();

        // ทำให้พื้นหลังเต็มจอ
        batch.draw(backgroundTexture, 0, 0, screenWidth, screenHeight);

        // สร้างปุ่มต่างๆ
        float easyButtonY = (screenHeight / 2) + BUTTON_HEIGHT + BUTTON_SPACING + OFFSET_Y;
        float mediumButtonY = (screenHeight / 2) + OFFSET_Y;
        float hardButtonY = (screenHeight / 2) - BUTTON_HEIGHT - BUTTON_SPACING + OFFSET_Y;

        batch.draw(easyButtonTexture, (screenWidth - BUTTON_WIDTH) / 2, easyButtonY, BUTTON_WIDTH, BUTTON_HEIGHT);
        batch.draw(mediumButtonTexture, (screenWidth - BUTTON_WIDTH) / 2, mediumButtonY, BUTTON_WIDTH, BUTTON_HEIGHT);
        batch.draw(hardButtonTexture, (screenWidth - BUTTON_WIDTH) / 2, hardButtonY, BUTTON_WIDTH, BUTTON_HEIGHT);

        batch.end();
    }

    @Override
    public void resize(int width, int height) { // ปรับขนาดหน้าจอของเกม
        camera.setToOrtho(false, width, height);
    }

    @Override
    public void pause() {} // เพลงหยุด

    @Override
    public void resume() {} // เล่นเพลงต่อ

    @Override
    public void hide() {} // สมมติ พับจอ เพลงจะไม่เล่นต่อไรงี้

    @Override
    public void dispose() { // คืนค่าใน method
        batch.dispose();
        //font.dispose();
        easyButtonTexture.dispose();
        mediumButtonTexture.dispose();
        hardButtonTexture.dispose();
        backgroundTexture.dispose();
        backgroundMusic.dispose();
    }
}
