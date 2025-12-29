package com.mygdx.game.sudoku;
import com.badlogic.gdx.graphics.g2d.TextureRegion;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Input;
import com.badlogic.gdx.Input.Keys;
import com.badlogic.gdx.InputAdapter;
import com.badlogic.gdx.Screen;
import com.badlogic.gdx.audio.Music;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.GlyphLayout;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.graphics.glutils.ShapeRenderer;
import com.badlogic.gdx.math.Vector3;
import com.badlogic.gdx.utils.viewport.FitViewport;

import java.util.Random;

public class SudokuScreen implements Screen {
    private static final int GRID_SIZE = 9;
    private static final int CELL_SIZE = 80;
    private static final int PADDING = 10;
    private static final int TOP_PADDING = 60;

    private SudokuGame game;
    private SpriteBatch batch;
    private BitmapFont font;
    private OrthographicCamera camera;
    private ShapeRenderer shapeRenderer;
    private int[][] board;
    private boolean[][] fixed;
    private int[][] errors;
    private int selectedRow = -1;
    private int selectedCol = -1;
    private boolean isSolved = false;
    private Random random;

    private long startTime;
    private long elapsedTime;

    private Music backgroundMusic;

    private boolean isMusicOn = true; // ฟิลด์สำหรับเก็บสถานะของเสียง
    private Texture musicOnTexture;
    private Texture musicOffTexture;
    private Texture restartTexture; // เพิ่มตัวแปรสำหรับเก็บเท็กซ์เจอร์ของปุ่มรีสตาร์ท

    private Texture backButtonTexture;

    private Texture backgroundTexture;
    private FitViewport viewport;
    
    private Texture solveButtonTexture;

    private boolean gameFinished = false;
    private boolean isTimePaused = false;

    private Music winSound;
    
    boolean hasPlayedWinSound = false;
    
    private int hintCount = 3; // เพิ่มฟิลด์สำหรับเก็บจำนวน Hint ที่เหลือ
    private boolean isTouchProcessed = false; 
    
    private int[][] solveBoard = new int[GRID_SIZE][GRID_SIZE];
    
    public SudokuScreen(SudokuGame game, String difficulty) {
        this.game = game;
        batch = new SpriteBatch();
        font = new BitmapFont();
        font.getData().setScale(2);
        camera = new OrthographicCamera();
        camera.setToOrtho(false, Gdx.graphics.getWidth(), Gdx.graphics.getHeight());
        shapeRenderer = new ShapeRenderer();
        board = new int[GRID_SIZE][GRID_SIZE];
        fixed = new boolean[GRID_SIZE][GRID_SIZE];
        errors = new int[GRID_SIZE][GRID_SIZE];
        random = new Random();
        restartTexture = new Texture(Gdx.files.internal("restart.png"));

        initializeBoard(difficulty);

        Gdx.input.setInputProcessor(new SudokuInputAdapter());

        // โหลดไฟล์เพลง
        backgroundMusic = Gdx.audio.newMusic(Gdx.files.internal("background_music.mp3"));
        backgroundMusic.setLooping(true);
        backgroundMusic.play();
        winSound = Gdx.audio.newMusic(Gdx.files.internal("youwin.mp3"));

        // โหลดเท็กซ์เจอร์ของปุ่มเสียง
        musicOnTexture = new Texture(Gdx.files.internal("on_music.png"));
        musicOffTexture = new Texture(Gdx.files.internal("off_music.png"));
        
        backButtonTexture = new Texture(Gdx.files.internal("back.png"));
        
        backgroundTexture = new Texture(Gdx.files.internal("bg_main2.jpg"));

        solveButtonTexture = new Texture(Gdx.files.internal("solve.png"));

    }

    private void drawSolveButton() {
        batch.begin();
        float buttonWidth = 328; 
        float buttonHeight = 164; 
        float buttonX = Gdx.graphics.getWidth() - buttonWidth - 20; // ตำแหน่ง X ของปุ่ม
        float buttonY = Gdx.graphics.getHeight() - buttonHeight - PADDING - 500; // ตำแหน่ง Y ของปุ่ม

        batch.draw(solveButtonTexture, buttonX, buttonY, buttonWidth, buttonHeight);
        batch.end();

        if (Gdx.input.isTouched()) { // ไว้ตรวจสอบ การ click หรือ แตะที่ปุ่มรูปภาพที่เราสร้างขึ้นมา
            if (!isTouchProcessed) {
                Vector3 touchPos = new Vector3(Gdx.input.getX(), Gdx.input.getY(), 0);
                camera.unproject(touchPos);
                if (touchPos.x >= buttonX && touchPos.x <= buttonX + buttonWidth &&
                    touchPos.y >= buttonY && touchPos.y <= buttonY + buttonHeight) {
                    solveSudoku();
                    isTouchProcessed = true;
                }
            }
        } else {
            isTouchProcessed = false;
        }
    }

    private void solveSudoku() {
        isTimePaused = true; // หยุดการนับเวลา
        clearBoard(); // clear ตัวเลขบนตาราง
        // ไว้เช็คความถูกต้อง ของเลขบนตาราง
        for (int row = 0; row < GRID_SIZE; row++) {
            for (int col = 0; col < GRID_SIZE; col++) {
                board[row][col] = solveBoard[row][col];
            }
        }
        isSolved = true;
        updateTime(); // อัพเดทเวลา
        winSound.play(); // เล่นเสียง sound effect " You win "
        backgroundMusic.stop(); // เพลงประกอบพื้นหลังหยุด
    }

    private void updateTime() {
        if (!isTimePaused) { // ตรวจสอบว่าเวลาไม่ถูกหยุด
            elapsedTime = System.currentTimeMillis() - startTime;
            // ทำการอัพเดทเวลาที่ผ่านไปตั้งแต่เริ่มต้นหรือเวลาล่าสุดที่หยุด
        }
    }


    private void drawMusicButton() {
        batch.begin();
        float buttonWidth = 100; // กำหนดความกว้างของปุ่ม
        float buttonHeight = 100; // กำหนดความสูงของปุ่ม
        float buttonX = Gdx.graphics.getWidth() - buttonWidth - 50; // ตำแหน่ง X ของปุ่ม
        float buttonY = Gdx.graphics.getHeight() - buttonHeight - PADDING - 220; // ตำแหน่ง Y ของปุ่ม

        if (isMusicOn) { // ไว้ตรวจสอบว่า เสียงเปิดหรือปิด จะได้ แสดงภาพ on off ได้ถูกต้อง
            batch.draw(musicOnTexture, buttonX, buttonY, buttonWidth, buttonHeight);
        } else {
            batch.draw(musicOffTexture, buttonX, buttonY, buttonWidth, buttonHeight);
        }
        batch.end();

        if (Gdx.input.isTouched()) { // ไว้ตรวจสอบ การ click หรือ แตะที่ปุ่มรูปภาพที่เราสร้างขึ้นมา
            if (!isTouchProcessed) { 
                Vector3 touchPos = new Vector3(Gdx.input.getX(), Gdx.input.getY(), 0);
                camera.unproject(touchPos);
                if (touchPos.x >= buttonX && touchPos.x <= buttonX + buttonWidth &&
                    touchPos.y >= buttonY && touchPos.y <= buttonY + buttonHeight) {
                    handleMusicButton();
                    isTouchProcessed = true;
                }
            }
        } else {
            isTouchProcessed = false;
        }
    }

    private void handleMusicButton() {
        isMusicOn = !isMusicOn; // สลับค่าของตัวแปร isMusicOn เพื่อเปิดหรือปิดเสียง
        if (backgroundMusic != null) { // ตรวจสอบว่ามีเสียงพื้นหลังหรือไม่
            if (isMusicOn) { // ถ้า isMusicOn เป็น true ให้เล่นเสียงพื้นหลัง
                backgroundMusic.play();
            } else { // ถ้า isMusicOn เป็น false ให้หยุดเล่นเสียงพื้นหลัง
                backgroundMusic.pause();
            }
        }
    }
    
    private void playButtonClickSound() { // ใช้สำหรับเล่นเสียงเมื่อมีการคลิกปุ่มในเกม
        Music buttonClickSound = Gdx.audio.newMusic(Gdx.files.internal("button_click.mp3"));
        buttonClickSound.play();
    }
    
    private void drawHintButton() {
        batch.begin();
        Texture hintButtonTexture = new Texture(Gdx.files.internal("hint.png"));
        float buttonWidth = 100; // กำหนดความกว้างของปุ่ม
        float buttonHeight = 100; // กำหนดความสูงของปุ่ม
        float buttonX = Gdx.graphics.getWidth() - buttonWidth - 200; // ตำแหน่ง X ของปุ่ม
        float buttonY = Gdx.graphics.getHeight() - buttonHeight - PADDING -220; // ตำแหน่ง Y ของปุ่ม
        batch.draw(hintButtonTexture, buttonX, buttonY, buttonWidth, buttonHeight);
        batch.end();

        if (Gdx.input.isTouched()) { // ไว้ตรวจสอบ การ click หรือ แตะที่ปุ่มรูปภาพที่เราสร้างขึ้นมา
            if (!isTouchProcessed) { 
                Vector3 touchPos = new Vector3(Gdx.input.getX(), Gdx.input.getY(), 0);
                camera.unproject(touchPos);
                if (touchPos.x >= buttonX && touchPos.x <= buttonX + buttonWidth &&
                    touchPos.y >= buttonY && touchPos.y <= buttonY + buttonHeight) {
                    if (hintCount > 0) { // ตรวจสอบว่ายังมี Hint ที่ใช้งานได้อยู่
                        useHint();
                        hintCount--; // ลดจำนวน Hint ที่เหลือ
                    } else {
                        System.out.println("No more hints available!");
                    }
                    isTouchProcessed = true; 
                }
            }
        } else {
            isTouchProcessed = false; 
        }
    }

    private void useHint() {
        if (hintCount > 0) { // ตรวจสอบว่ายังมี Hint ที่ใช้งานได้อยู่
            int hintRow = -1;
            int hintCol = -1;
            for (int row = 0; row < GRID_SIZE; row++) {
                for (int col = 0; col < GRID_SIZE; col++) {
                    if (board[row][col] == 0) {
                        hintRow = row;
                        hintCol = col;
                        break;
                    }
                }
                if (hintRow != -1 && hintCol != -1) {
                    break;
                }
            }

            // ใช้เลขสุ่มที่ถูกต้องในตารางที่ว่าง
            if (hintRow != -1 && hintCol != -1) {
                int num = random.nextInt(GRID_SIZE) + 1;
                while (!isValid(hintRow, hintCol, num)) {
                    num = random.nextInt(GRID_SIZE) + 1;
                }
                board[hintRow][hintCol] = num;
            }
        } else {
            System.out.println("No more hints available!");
        }
    }

    private void drawHintCount() {
        batch.begin();
        font.setColor(Color.BLACK);
        GlyphLayout layout = new GlyphLayout(font, "Hint: " + hintCount); // แสดงจำนวน Hint ที่เหลือ
        font.draw(batch, layout, PADDING, Gdx.graphics.getHeight() - 200); // ปรับตำแหน่งและระยะห่างของข้อความ
        batch.end();
    }

    private void drawBackButton() {
        batch.begin();
        float buttonWidth = 328; // กำหนดความกว้างของปุ่ม
        float buttonHeight = 164; // กำหนดความสูงของปุ่ม
        float buttonX = PADDING; // ตำแหน่ง X ของปุ่ม
        float buttonY = Gdx.graphics.getHeight() - buttonHeight - PADDING; // ตำแหน่ง Y ของปุ่ม

        batch.draw(backButtonTexture, buttonX, buttonY, buttonWidth, buttonHeight);
        batch.end();

        if (Gdx.input.isTouched()) {
            Vector3 touchPos = new Vector3(Gdx.input.getX(), Gdx.input.getY(), 0);
            camera.unproject(touchPos);
            if (touchPos.x >= buttonX && touchPos.x <= buttonX + buttonWidth &&
                touchPos.y >= buttonY && touchPos.y <= buttonY + buttonHeight) {
                game.setScreen(new MainMenuScreen(game)); // กลับไปยังหน้า Main Menu
                playButtonClickSound(); // เล่นเสียงปุ่มคลิก
                backgroundMusic.stop(); // หยุดเพลงพื้นหลัง
            }
        }
    }

    private void drawRestartButton() {
        batch.begin();
        float buttonWidth = 328; // กำหนดความกว้างของปุ่ม
        float buttonHeight = 164; // กำหนดความสูงของปุ่ม
        float buttonX = Gdx.graphics.getWidth() - buttonWidth - 20; // ตำแหน่ง X ของปุ่ม
        float buttonY = Gdx.graphics.getHeight() - buttonHeight - PADDING - 350; // ตำแหน่ง Y ของปุ่ม

        batch.draw(restartTexture, buttonX, buttonY, buttonWidth, buttonHeight);
        batch.end();

        if (Gdx.input.isTouched()) { // ไว้ตรวจสอบ การ click หรือ แตะที่ปุ่มรูปภาพที่เราสร้างขึ้นมา
            if (!isTouchProcessed) { 
                Vector3 touchPos = new Vector3(Gdx.input.getX(), Gdx.input.getY(), 0);
                camera.unproject(touchPos);
                if (touchPos.x >= buttonX && touchPos.x <= buttonX + buttonWidth &&
                    touchPos.y >= buttonY && touchPos.y <= buttonY + buttonHeight) {
                    restartGame("Medium"); // ส่งค่า difficulty ไปยังเมทอด restartGame()
                    isTouchProcessed = true; 
                }
            }
        } else {
            isTouchProcessed = false; 
        }
    }


    private void restartGame(String difficulty) {
        initializeBoard(difficulty); // เริ่มกระดานใหม่ที่ความยากระดับที่กำหนด
        isSolved = false;
        hintCount = 3; // รีเซ็ตจำนวน Hint ที่เหลือ
        isTimePaused = false; // เริ่มนับเวลาใหม่
        startTime = System.currentTimeMillis(); // รีเซ็ตเวลาเริ่มต้นใหม่
        elapsedTime = 0; // รีเซ็ตเวลาที่ผ่านไปให้เป็น 0
        gameFinished = false; // รีเซ็ตสถานะเกมเป็นยังไม่เสร็จสิ้น
        hasPlayedWinSound = false; // รีเซ็ตการเล่นเสียง "You Win"
        
        if (isMusicOn) {
            backgroundMusic.play(); // เริ่มเล่นเพลงพื้นหลังอีกครั้ง
        } else {
            backgroundMusic.stop(); // หยุดเพลงถ้าสถานะเสียงเป็นปิด
        }
    }

    private void resizeButtons() {
        float screenWidth = Gdx.graphics.getWidth();
        float screenHeight = Gdx.graphics.getHeight();

        // ปรับขนาดปุ่มเพลง
        float musicButtonSize = 60;
        float musicButtonX = screenWidth - musicButtonSize - PADDING;
        float musicButtonY = screenHeight - musicButtonSize - PADDING - 220;
        float musicButtonWidth = musicButtonSize;
        float musicButtonHeight = musicButtonSize;

        // ปรับขนาดปุ่ม Hint
        float hintButtonWidth = 100;
        float hintButtonHeight = 100;
        float hintButtonX = PADDING + 1550 * (screenWidth / 1050); // ปรับตำแหน่ง X ตามขนาดหน้าจอปัจจุบัน
        float hintButtonY = screenHeight - hintButtonHeight - PADDING - 220;

        // ปรับขนาดปุ่ม Restart
        float restartButtonWidth = 328;
        float restartButtonHeight = 164;
        float restartButtonX = PADDING + 1360 * (screenWidth / 1050); // ปรับตำแหน่ง X ตามขนาดหน้าจอปัจจุบัน
        float restartButtonY = screenHeight - restartButtonHeight - PADDING - 350;

        // ปรับขนาดปุ่ม Back
        float backButtonWidth = 328;
        float backButtonHeight = 164;
        float backButtonX = PADDING;
        float backButtonY = screenHeight - backButtonHeight - PADDING;

        // สร้าง TextureRegion และกำหนดค่าเริ่มต้น
        Texture musicOnTexture = new Texture(Gdx.files.internal("on_music.png"));
        Texture musicOffTexture = new Texture(Gdx.files.internal("off_music.png"));
        Texture hintButtonTexture = new Texture(Gdx.files.internal("hint.png"));
        Texture restartTexture = new Texture(Gdx.files.internal("restart.png"));
        Texture backButtonTexture = new Texture(Gdx.files.internal("back.png"));

        TextureRegion musicOnTextureRegion = new TextureRegion(musicOnTexture);
        TextureRegion musicOffTextureRegion = new TextureRegion(musicOffTexture);
        TextureRegion hintButtonTextureRegion = new TextureRegion(hintButtonTexture);
        TextureRegion restartTextureRegion = new TextureRegion(restartTexture);
        TextureRegion backButtonTextureRegion = new TextureRegion(backButtonTexture);

        // กำหนด Region และขนาดของ TextureRegion
        musicOnTextureRegion.setRegion(musicButtonX, musicButtonY, musicButtonWidth, musicButtonHeight);
        musicOffTextureRegion.setRegion(musicButtonX, musicButtonY, musicButtonWidth, musicButtonHeight);
        hintButtonTextureRegion.setRegion(hintButtonX, hintButtonY, hintButtonWidth, hintButtonHeight);
        restartTextureRegion.setRegion(restartButtonX, restartButtonY, restartButtonWidth, restartButtonHeight);
        backButtonTextureRegion.setRegion(backButtonX, backButtonY, backButtonWidth, backButtonHeight);

    }

    private void initializeBoard(String difficulty) {
        generateFullBoard(); // สร้างตารางเต็ม
        copySolvedBoard(); // คัดลอกตารางที่เติมตัวเลขถูกต้องเพื่อใช้ในการตรวจสอบ
        removeCells(difficulty); // ลบตัวเลขในช่องตามระดับความยาก
        isSolved = false; // ตั้งค่าว่ายังไม่ได้แก้ปัญหา
        startTime = System.currentTimeMillis(); // เก็บเวลาเริ่มต้นการเล่น
    }

    private void copySolvedBoard() { // เพื่อคัดลอกตารางที่เติมตัวเลขถูกต้องลงในตารางอื่น เพื่อใช้ในการตรวจสอบว่าผู้เล่นสามารถแก้ปัญหาได้หรือไม่
        for (int row = 0; row < GRID_SIZE; row++) {
            for (int col = 0; col < GRID_SIZE; col++) {
                solveBoard[row][col] = board[row][col]; // คัดลอกค่าจากตารางที่เติมตัวเลขถูกต้องลงในตารางอื่น
            }
        }
    }

    private void generateFullBoard() { //สร้างตารางซูโดกุที่เต็มไปด้วยตัวเลขที่ถูกต้อง
        clearBoard();
        solve();
    }

    private void removeCells(String difficulty) { //ลบตัวเลขในช่อง ตารางตามระดับความยากที่กำหนด
        int cellsToRemove;
        switch (difficulty) {
            case "Easy":
                cellsToRemove = 30; // ลบ 30 ช่องสำหรับความยากระดับง่าย
                break;
            case "Medium":
                cellsToRemove = 40; // ลบ 40 ช่อง
                break;
            case "Hard":
                cellsToRemove = 50; // ลบ 50 ช่อง
                break;
            default:
                cellsToRemove = 30; // ค่าเริ่มต้นคือ 30 ช่อง
                break;
        }
        
        // ลบช่องตามจำนวนที่กำหนด
        for (int i = 0; i < cellsToRemove; i++) {
            int row, col;
            // สุ่มตำแหน่งช่องที่จะลบ
            do {
                row = random.nextInt(GRID_SIZE);
                col = random.nextInt(GRID_SIZE);
            } while (board[row][col] == 0); // ตรวจสอบว่าช่องที่สุ่มยังไม่ได้ลบ
            board[row][col] = 0; // ลบช่อง
            fixed[row][col] = false; // ช่องนี้ไม่ใช่เซลล์คงที่
        }
        // กำหนดช่องที่เหลืออยู่ให้เป็นเซลล์คงที่
        for (int row = 0; row < GRID_SIZE; row++) {
            for (int col = 0; col < GRID_SIZE; col++) {
                if (board[row][col] != 0) {
                    fixed[row][col] = true; // ช่องที่มีตัวเลขจะเป็นเซลล์คงที่
                }
            }
        }
    }

    private void clearBoard() { //ล้างตารางซูโดกุทั้งหมด
        for (int row = 0; row < GRID_SIZE; row++) {
            for (int col = 0; col < GRID_SIZE; col++) {
                board[row][col] = 0; // ตั้งค่าช่องเป็น 0 (ว่าง)
                fixed[row][col] = false; // ช่องไม่ใช่ช่องคงที่
                errors[row][col] = 0; // เคลียข้อผิดพลาด
            }
        }
    }

    private boolean isValid(int row, int col, int num) {
    	// ตรวจสอบแถวและคอลัมน์
        for (int i = 0; i < GRID_SIZE; i++) {
        	// ถ้าพบค่าที่ซ้ำกันในแถวหรือคอลัมน์เดียวกัน ให้คืนค่า false
            if (board[row][i] == num || board[i][col] == num) {
                return false;
            }
        }
        // คำนวณตำแหน่งเริ่มต้นของบล็อก 3x3 ที่ตำแหน่ง (row, col) อยู่ในนั้น
        int startRow = (row / 3) * 3;
        int startCol = (col / 3) * 3;
        // ตรวจสอบภายในบล็อก 3x3
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
            	
            	// ถ้าพบค่าที่ซ้ำกันในบล็อก 3x3 ให้คืนค่า false
                if (board[startRow + i][startCol + j] == num) {
                    return false;
                }
            }
        }
        return true;
    }

    private boolean solve() {
        for (int row = 0; row < GRID_SIZE; row++) {
            for (int col = 0; col < GRID_SIZE; col++) {
            	// ตรวจสอบว่าตำแหน่งปัจจุบันว่าง (มีค่าเป็น 0) หรือไม่
                if (board[row][col] == 0) {
                    for (int num = 1; num <= GRID_SIZE; num++) {
                        if (isValid(row, col, num)) {
                            board[row][col] = num; // ถ้าถูกต้อง ให้ใส่ค่านี้ลงในตำแหน่งปัจจุบัน
                            if (solve()) {
                                return true; // ถ้า solve() สำเร็จ ให้คืนค่า true
                            } else {
                                board[row][col] = 0; // ถ้า solve() ล้มเหลว ให้รีเซ็ตตำแหน่งปัจจุบันกลับเป็น 0
                            }
                        }
                    }
                    return false; // ถ้าลองทุกค่าที่เป็นไปได้แล้วไม่สำเร็จ ให้คืนค่า false
                }
            }
        }
        return true; // ถ้าทุกตำแหน่งในตารางถูกเติมเต็มแล้ว ให้คืนค่า true
    }

    private boolean checkSolution() {
        boolean hasError = false; // ไว้เช็คข้อผิดพลาด ว่ามีข้อผิดพลาดหรือไม่
        clearErrors(); // เคลียข้อผิดพลาดทั้งหมดก่อนทำการตรวจสอบ
        for (int row = 0; row < GRID_SIZE; row++) {
            for (int col = 0; col < GRID_SIZE; col++) {
                int num = board[row][col];
                board[row][col] = 0;
                if (!isValid(row, col, num)) { // ตรวจสอบว่าตัวเลขในตำแหน่งนี้ถูกต้องหรือไม่
                    board[row][col] = num; // ถ้าตัวเลขไม่ถูกต้อง ให้นำค่ากลับมา
                    errors[row][col] = 1; // ตั้งค่าข้อผิดพลาดในตำแหน่งนี้
                    hasError = true; // มีข้อผิดพลาด
                }
                board[row][col] = num; // นำค่าตัวเลขกลับมาในตำแหน่งเดิม
            }
        }
        return !hasError; // ถ้าไม่มีข้อผิดพลาด return true, ถ้ามีข้อผิดพลาด return false
    }
   
    private void clearErrors() {
        for (int row = 0; row < GRID_SIZE; row++) {
            for (int col = 0; col < GRID_SIZE; col++) {
                errors[row][col] = 0; // ตั้งค่าข้อผิดพลาดในตำแหน่งนี้เป็น 0 (ไม่มีข้อผิดพลาด)
            }
        }
    }

    @Override
    public void show() {
        batch = new SpriteBatch(); // สร้างออบเจกต์ spritebatch เพื่อใช้ในการสาดสไปรท์
        viewport = new FitViewport(1920, 1080); // สร้างออบเจกต์ FitViewport โดยใช้ขนาดหน้าจอ 1920x1080
    }
    
    private void drawGrid() {
        // ตาราง ไว้คำนวณ ตำแหน่งบนตาราง ทั้งแนวนอน และ แนวตั้ง (x , y)
        float startX = (Gdx.graphics.getWidth() - GRID_SIZE * CELL_SIZE) / 2;
        float startY = (Gdx.graphics.getHeight() - GRID_SIZE * CELL_SIZE) / 9 + TOP_PADDING;

        shapeRenderer.begin(ShapeRenderer.ShapeType.Filled);
        // ให้ตารางเป็นสีเทาอ่อน
        shapeRenderer.setColor(Color.LIGHT_GRAY);
        for (int row = 0; row < GRID_SIZE; row++) {
            for (int col = 0; col < GRID_SIZE; col++) {
            	// ลงสีในตาราง สลับเป็น เลขคู่
                if ((row + col) % 2 == 0) {
                    shapeRenderer.rect(startX + col * CELL_SIZE, startY + row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                }
            }
        }
        shapeRenderer.end();

        shapeRenderer.begin(ShapeRenderer.ShapeType.Line); // ไว้วาดเส้นขอบบนตาราง
        shapeRenderer.setColor(Color.BLACK);
        for (int row = 0; row < GRID_SIZE; row++) {
            for (int col = 0; col < GRID_SIZE; col++) {
            	// วาดสี่เหลี่ยมที่มีขอบสีดำในทุกช่องของตาราง
                shapeRenderer.rect(startX + col * CELL_SIZE, startY + row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
        // ลูปเพื่อสร้างเส้นตารางที่แบ่งตารางออกเป็นบล็อก 3x3
        for (int i = 0; i <= GRID_SIZE; i++) {
            if (i % 3 == 0) {
            	// วาดเส้นหนาเพื่อแบ่งบล็อก 3x3
                shapeRenderer.rectLine(startX, startY + i * CELL_SIZE, startX + GRID_SIZE * CELL_SIZE, startY + i * CELL_SIZE, 3);
                shapeRenderer.rectLine(startX + i * CELL_SIZE, startY, startX + i * CELL_SIZE, startY + GRID_SIZE * CELL_SIZE, 3);
            } else {
            	// วาดเส้นบางเพื่อแบ่งแต่ละช่อง
                shapeRenderer.rectLine(startX, startY + i * CELL_SIZE, startX + GRID_SIZE * CELL_SIZE, startY + i * CELL_SIZE, 1);
                shapeRenderer.rectLine(startX + i * CELL_SIZE, startY, startX + i * CELL_SIZE, startY + GRID_SIZE * CELL_SIZE, 1);
            }
        }
        shapeRenderer.end();
    }

    private void drawNumbers() {
        batch.begin();   
        //ลูปตัวเลขในตาราง
        for (int row = 0; row < GRID_SIZE; row++) {
            for (int col = 0; col < GRID_SIZE; col++) {
            	// รับค่าตัวเลขในตำแหน่งปัจจุบันของตาราง
                int num = board[row][col];
                if (num != 0) {
                	// ถ้าตำแหน่งนี้มีตัวเลขซ้ำกันตามกฏของ Sudoku ให้ตั้งค่าสีฟอนต์เป็นสีแดง
                    if (errors[row][col] == 1) {
                        font.setColor(Color.RED);
                    } else {
                    	// ถ้าไม่มีข้อผิดพลาด ให้ตั้งค่าสีฟอนต์เป็นสีดำ
                        font.setColor(Color.BLACK);
                    }
                    GlyphLayout layout = new GlyphLayout(font, String.valueOf(num));
                    // ไว้คำนวณตำแหน่ง ที่จะวางตัวเลข ที่พิมพ์ลงไป
                    float x = (Gdx.graphics.getWidth() - GRID_SIZE * CELL_SIZE) / 2 + col * CELL_SIZE + (CELL_SIZE - layout.width) / 2;
                    float y = (Gdx.graphics.getHeight() - GRID_SIZE * CELL_SIZE) / 5 + TOP_PADDING + row * CELL_SIZE + (CELL_SIZE + layout.height) / 5;
                    font.draw(batch, layout, x, y);
                }
            }
        }
        batch.end();
    }

    private void drawStatusAndTime() {
        batch.begin(); // ไว้เริ่มต้น วาด spritebatch
        font.setColor(Color.BLACK);
        GlyphLayout layout = new GlyphLayout(font, "");
        font.draw(batch, layout, (GRID_SIZE * CELL_SIZE - layout.width) / 2, GRID_SIZE * CELL_SIZE + 170);
        
        // ถ้าเกมถูกแก้ปัญหาแล้ว (isSolved)
        if (isSolved) {
            font.setColor(Color.RED); // กำหนดสีเป็นแดง
            layout.setText(font, "You Won !!!"); //แสดงข้อความ "You Won !!!"
            font.draw(batch, layout, (GRID_SIZE * CELL_SIZE - layout.width) / 2, GRID_SIZE * CELL_SIZE + 130);
        }
        // คำนวณเวลาที่ผ่านไปเป็นนาทีและวินาที
        long minutes = elapsedTime / 60000;
        long seconds = (elapsedTime % 60000) / 1000;
        // ข้อความเวลาที่จะแสดงบนหน้า UI
        layout.setText(font, String.format("Time: %02d:%02d", minutes, seconds));
        font.draw(batch, layout, PADDING, Gdx.graphics.getHeight() - 150);
        batch.end();
    }

    private void handleCellSelection(int x, int y) {
    	// ไว้เช็ค หรือ คำนวณ ตำแหน่งของตาราง ทั้งแนวนอน และ แนวตั้ง
        float startX = (Gdx.graphics.getWidth() - GRID_SIZE * CELL_SIZE) / 2;
        float startY = (Gdx.graphics.getHeight() - GRID_SIZE * CELL_SIZE) / 15 + TOP_PADDING;
        // ตรวจสอบว่าจุดที่คลิกอยู่ภายในขอบเขตของตารางหรือไม่
        if (x >= startX && x < startX + GRID_SIZE * CELL_SIZE && y >= startY && y < startY + GRID_SIZE * CELL_SIZE) {
            int col = (int) ((x - startX) / CELL_SIZE);
            int row = (int) ((y - startY) / CELL_SIZE);
            // ตรวจสอบว่าช่องที่เลือกไม่ได้ถูกล็อก (ไม่สามารถแก้ไขได้)
            if (!fixed[row][col]) {
                selectedRow = row;
                selectedCol = col;
            } else {
                selectedRow = -1;
                selectedCol = -1;
            }
        } else {
            // ถ้าที่คลิกอยู่นอกขอบเขตของตาราง ให้ตั้งค่าแถวและคอลัมน์ที่ถูกเลือกเป็น -1 (ไม่มีการเลือก)
            selectedRow = -1;
            selectedCol = -1;
        }
    }

    private void drawSelectedCell() {
        if (selectedRow >= 0 && selectedCol >= 0) {

            // ผสมสีในช่องตาราง
            Gdx.gl.glEnable(GL20.GL_BLEND);
            Gdx.gl.glBlendFunc(GL20.GL_SRC_ALPHA, GL20.GL_ONE_MINUS_SRC_ALPHA);

            float startX1 = (Gdx.graphics.getWidth() - GRID_SIZE * CELL_SIZE) / 2;
            float startY1 = (Gdx.graphics.getHeight() - GRID_SIZE * CELL_SIZE) / 9 + TOP_PADDING;
            // คำนวณตำแหน่งของบล็อค 3x3
            int blockRow = (selectedRow / 3) * 3;
            int blockCol = (selectedCol / 3) * 3;

            // วาดไฮไลท์บล็อค 3x3
            shapeRenderer.begin(ShapeRenderer.ShapeType.Filled);
            shapeRenderer.setColor(new Color(0, 0, 1, 0.2f)); // สีฟ้าโปร่งใส
            shapeRenderer.rect(startX1 + blockCol * CELL_SIZE, startY1 + blockRow * CELL_SIZE, CELL_SIZE * 3, CELL_SIZE * 3);
            shapeRenderer.end();
            
            shapeRenderer.begin(ShapeRenderer.ShapeType.Filled);
            // ทำให้สีโปร่งใสขึ้น
            shapeRenderer.setColor(0.68f, 0.85f, 0.90f, 0.5f); // สีฟ้าอ่อนที่มีความโปร่งใส 50%            
            float startX = (Gdx.graphics.getWidth() - GRID_SIZE * CELL_SIZE) / 2;
            float startY = (Gdx.graphics.getHeight() - GRID_SIZE * CELL_SIZE) / 9 + TOP_PADDING;
            shapeRenderer.rect(startX + selectedCol * CELL_SIZE, startY, CELL_SIZE, GRID_SIZE * CELL_SIZE); // แนวแกน x
            shapeRenderer.rect(startX, startY + selectedRow * CELL_SIZE, GRID_SIZE * CELL_SIZE, CELL_SIZE); // แนวแกน y
            shapeRenderer.end();
            
            // ปิดการผสมสีเมื่อไม่ต้องการใช้
            Gdx.gl.glDisable(GL20.GL_BLEND);

            if (board[selectedRow][selectedCol] != 0) {
                if (errors[selectedRow][selectedCol] == 1) {
                    font.setColor(Color.RED);
                } else {
                    font.setColor(Color.BLACK);
                }
                GlyphLayout layout = new GlyphLayout(font, String.valueOf(board[selectedRow][selectedCol]));
                float x = startX + selectedCol * CELL_SIZE + (CELL_SIZE - layout.width) / 2;
                float y = startY + selectedRow * CELL_SIZE + (CELL_SIZE + layout.height) / 2;
                batch.begin();
                font.draw(batch, layout, x, y);
                batch.end();
            }
        }
    }
    
    private void handleNumberInput(int num) {
        if (selectedRow >= 0 && selectedCol >= 0 && !fixed[selectedRow][selectedCol]) {
            board[selectedRow][selectedCol] = num;
            if (checkSolution()) {
                isSolved = true;
                gameFinished = true; // เกมเสร็จสิ้น
            } else {
                isSolved = false;
            }
        }
    }

    private class SudokuInputAdapter extends InputAdapter {
    	@Override
    	public boolean touchDown(int screenX, int screenY, int pointer, int button) {
    	    Vector3 touchPos = new Vector3(screenX, screenY, 0);
    	    camera.unproject(touchPos);

    	    handleCellSelection((int) touchPos.x, (int) touchPos.y);

    	    return true;
    	}

        @Override
        public boolean keyDown(int keycode) {
            if (selectedRow >= 0 && selectedCol >= 0) {
                if (keycode >= Keys.NUM_1 && keycode <= Keys.NUM_9) {
                    int num = keycode - Keys.NUM_1 + 1;
                    handleNumberInput(num);
                } else if (keycode == Keys.BACKSPACE || keycode == Keys.DEL) {
                    handleNumberInput(0);
                }
            }

            return true;
        }
    }

    @Override
    public void resize(int width, int height) {
        batch.setProjectionMatrix(viewport.getCamera().combined);
        camera.setToOrtho(false, width, height);

    }

    @Override
    public void pause() { // หยุดเพลง
        backgroundMusic.pause();
    }

    @Override
    public void resume() { // เล่นเพลงต่อ
        backgroundMusic.play();
    }

    @Override
    public void hide() {} // สมมติ พับจอ เพลงจะไม่เล่นต่อไรงี้

    @Override
    public void dispose() { // คืนค่าใน method
        batch.dispose();
        font.dispose();
        shapeRenderer.dispose();
        musicOnTexture.dispose();
        musicOffTexture.dispose();
        restartTexture.dispose();
        winSound.dispose();
        resizeButtons();
        if (backgroundMusic != null) {
            backgroundMusic.dispose(); // หยุดเพลง
        }
    }
    
    public void create() {
    	// ปรับขนาดของหน้าจอให้พอดีกับขนาดที่กำหนด โดยรักษาสัดส่วนไว้
        batch = new SpriteBatch();
        shapeRenderer = new ShapeRenderer();
        float worldWidth = 1920; 
        float worldHeight = 1080; 
        viewport = new FitViewport(worldWidth, worldHeight);
    }
    
    @Override
    public void render(float delta) {
    	Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);

        camera.update();
        batch.setProjectionMatrix(camera.combined);
        shapeRenderer.setProjectionMatrix(camera.combined);
   
        batch.begin();
        
        // ดึงขนาดของหน้าจอปัจจุบัน
        int screenWidth = Gdx.graphics.getWidth();
        int screenHeight = Gdx.graphics.getHeight();
        float buttonWidth = 328; // กำหนดความกว้างของปุ่ม
        float buttonHeight = 164; // กำหนดความสูงของปุ่ม
        float buttonX = Gdx.graphics.getWidth() - buttonWidth - 20; // ตำแหน่ง X ของปุ่ม
        float buttonY = Gdx.graphics.getHeight() - buttonHeight - PADDING - 350; // ตำแหน่ง Y ของปุ่ม
        
        // ทำให้พื้นหลังเต็มจอ
        batch.draw(backgroundTexture, 0, 0, screenWidth, screenHeight);
        batch.draw(restartTexture, buttonX, buttonY, buttonWidth, buttonHeight);

        
        batch.end();
    	
        if (!isTimePaused) {
            if (!gameFinished) {
                // นับเวลาเฉพาะเมื่อเกมยังไม่เสร็จสิ้น
                elapsedTime = System.currentTimeMillis() - startTime;
            }
        }

        if (!gameFinished) {

        } else {
            // เกมเสร็จสิ้น
            if (elapsedTime > 0) {
                // แสดงเวลาที่ผ่านไปเมื่อเกมเสร็จสิ้น
                long minutes = elapsedTime / 1000 / 60;
                long seconds = (elapsedTime / 1000) % 60;
                System.out.printf("\u001B[31mTime: %02d:%02d\n", minutes, seconds);
            } else {
                // แสดงข้อความ "Time's up!" ถ้าเวลาเป็น 0 หรือติดลบ
                System.out.println("\u001B[31mTime's up!"); 
            }
            System.out.println("\u001B[31mYou Won !!"); 

            if (!hasPlayedWinSound) { // เช็คว่าเสียง "You Win" ยังไม่เล่น
                // หยุดเพลง
                backgroundMusic.stop();
                winSound.play();
                hasPlayedWinSound = true; // ตั้งค่าให้เสียง "You Win" เล่นไปแล้ว
            }
        }

        // กด ESC เพื่อปิดโปรแกรม
        if (Gdx.input.isKeyPressed(Input.Keys.ESCAPE)) {
            Gdx.app.exit();
        }

        if (Gdx.input.isTouched()) {
            if (!isTouchProcessed) { 
                Vector3 touchPos = new Vector3(Gdx.input.getX(), Gdx.input.getY(), 0);
                camera.unproject(touchPos);
                if (touchPos.x >= buttonX && touchPos.x <= buttonX + buttonWidth &&
                    touchPos.y >= buttonY && touchPos.y <= buttonY + buttonHeight) {
                    restartGame("Medium");
                    isTouchProcessed = true; 
                }
            }
        } else {
            isTouchProcessed = false; 
        }

        if (Gdx.input.isKeyPressed(Input.Keys.ESCAPE)) {
            Gdx.app.exit();
        }
               
        drawGrid();
        drawNumbers();
        drawSelectedCell();
        drawStatusAndTime();
        drawHintButton();
        drawMusicButton();
        drawRestartButton();
        drawHintCount(); 
        drawBackButton();
        drawSolveButton();
        drawStatusAndTime(); 
    }
}
