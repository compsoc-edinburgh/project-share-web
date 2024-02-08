import React, { useState, useEffect, useCallback } from 'react';
import { Container, Graphics, Text, useApp, useTick } from '@pixi/react';
import * as PIXI from 'pixi.js';

const PADDLE_WIDTH = 80;
const PADDLE_HEIGHT = 10;
const BALL_RADIUS = 10;
const STARTING_BALL_SPEED = 7;
let BALL_SPEED = 7;
const BRICK_ROWS = 5;
let BRICK_COLUMNS = Math.floor(window.innerWidth / 65);
let BRICK_WIDTH = 50;
let BRICK_HEIGHT = 20;
const BRICK_PADDING = 10;
let BRICK_OFFSET_TOP = 40;
let BRICK_OFFSET_LEFT = 30;
const PURPLE_COLOR = 0x6a0dad; 
const FONT_FAMILY = ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'];

interface Brick {
    x: number;
    y: number;
    status: number;
  }
  
  interface GameOverProps {
    message: string;
    // onRestart: () => void; 
    app: any;
    // buttonText: string;
  }



const GameOver: React.FC<GameOverProps> = ({ message, 
	// onRestart, 
	app
	// , buttonText 
}) => (
  <Container>
    <Text 
      text={message} 
      style={new PIXI.TextStyle({ 
        fill: PURPLE_COLOR, 
        fontSize: 24, 
        align: 'center',
        fontFamily: FONT_FAMILY, 
        fontWeight: '500'
      })} 
      anchor={0.5} 
      x={app.screen.width / 2} 
      y={window.innerHeight / 1.5 } 
    />
    {/* <Graphics
  interactive
  draw={(g) => {
    g.beginFill(PURPLE_COLOR);
    g.drawRoundedRect(-50, 25, 100, 40, 10); 
    g.endFill();
  }}
  x={app.screen.width / 2}
  y={window.innerHeight / 1.5}
  pointertap={onRestart}
	
  pointerover={(e) => e.currentTarget.cursor = 'pointer'} 
  pointerout={(e) => e.currentTarget.cursor = 'auto'} 
/> */}


    {/* Button Text
    <Text 
      text={buttonText} 
      style={new PIXI.TextStyle({ 
        fill: 'white', 
        fontSize: 16, 
        fontFamily: FONT_FAMILY, 
        fontWeight: '500'
      })} 
      anchor={0.5} 
      x={app.screen.width / 2} 
      y={window.innerHeight / 1.5 + 45} 
    /> */}
  </Container>
);

const BrickBreaker: React.FC = () => {
  const app = useApp();

  useEffect(() => {
    const updateLayout = () => {
      const screenWidth = app.screen.width;
      const brickWidth = 50; 
      const brickPadding = 10;
      const totalBrickWidth = brickWidth + brickPadding;
      const columns = Math.floor(screenWidth / totalBrickWidth);
      const offsetLeft = (screenWidth - (columns * totalBrickWidth - brickPadding)) / 2;

      BRICK_WIDTH = brickWidth; // Adjust as needed
      BRICK_HEIGHT = 20; // Adjust as needed
      BRICK_COLUMNS = columns;
      BRICK_OFFSET_LEFT = offsetLeft;
    };
  

    updateLayout();
    window.addEventListener('resize', updateLayout);

    return () => {
      window.removeEventListener('resize', updateLayout);
    };
  }, [app]);

  const createBricks = useCallback(() => {
    let bricks: Brick[][] = [];
    for (let c = 0; c < BRICK_COLUMNS; c++) {
        bricks[c] = [];
        for (let r = 0; r < BRICK_ROWS; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
    return bricks;
  }, [BRICK_COLUMNS]);


  const [paddlePosition, setPaddlePosition] = useState(app.screen.width / 2);
  const [ballPosition, setBallPosition] = useState({ x: app.screen.width / 2, y: app.screen.height - 100 });
  const [ballVelocity, setBallVelocity] = useState({ x: BALL_SPEED, y: -BALL_SPEED });
  const [bricks, setBricks] = useState<Brick[][]>(createBricks());
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState('playing');; 
  const [playerPlaying, setPlayerPlaying] = useState(false);

  // Reset game to its initial state
  // const startGame = useCallback(() => {
  //   setBallPosition({ x: app.screen.width / 2, y: app.screen.height - 100 });
  //   setBallVelocity({ x: BALL_SPEED, y: -BALL_SPEED });
  //   setPaddlePosition(app.screen.width / 2);
  //   setBricks(createBricks());
  //   setScore(0);
  //   setLives(3);
  //   setGameState('playing');
  // }, [app.screen.width, app.screen.height]);


  const resetGame = useCallback(() => {
    setBallPosition({ x: app.screen.width / 2, y: app.screen.height - 100 });
    setBallVelocity({ x: STARTING_BALL_SPEED, y: -STARTING_BALL_SPEED });
    setPaddlePosition(app.screen.width / 2);
    setBricks(createBricks());
    setScore(0);
    setLives(3);
    setGameState('playing');
  }, [app.screen.width, app.screen.height]);

	useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    if (gameState === 'gameOver' || gameState === 'victory') {
      timeoutId = setTimeout(() => {
        resetGame();
      }, 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [gameState, resetGame]);

  useEffect(() => {

    const movePaddle = (e: MouseEvent) => {
      let relativeX = e.clientX - (app.view as HTMLCanvasElement).offsetLeft;
      let relativeY = e.clientY - (app.view as HTMLCanvasElement).offsetTop;
      if (relativeX > 0 && relativeX < app.screen.width && relativeY > 0 && relativeY < app.screen.height) {
        setPaddlePosition(relativeX);
        setPlayerPlaying(true);
      } else {
        setPlayerPlaying(false);
      }
    };

		const movePaddleWithTouch = (e: TouchEvent) => {
			// e.preventDefault(); // Prevents the page from scrolling when you touch-drag on the game
			if (e.touches.length > 0) {
				let relativeX = e.touches[0].clientX - (app.view as HTMLCanvasElement).offsetLeft;
				if (relativeX > 0 && relativeX < app.screen.width) {
					setPaddlePosition(relativeX);
				}
			}
		};

    window.addEventListener('mousemove', movePaddle);
		window.addEventListener('touchmove', movePaddleWithTouch, { passive: false });

    return () => {
      window.removeEventListener('mousemove', movePaddle);
			window.removeEventListener('touchmove', movePaddleWithTouch);
    };
  }, [app.screen.width, app.view]);



  useTick((delta) => {
    if (gameState !== 'playing') return;
    if (!playerPlaying && gameState === 'playing') {
      const aiPaddleSpeed = BALL_SPEED;
      if (ballPosition.x < paddlePosition - PADDLE_WIDTH / 2 + aiPaddleSpeed) {
        setPaddlePosition(paddlePosition - aiPaddleSpeed);
      } else if (ballPosition.x > paddlePosition + PADDLE_WIDTH / 2 - aiPaddleSpeed) {
        setPaddlePosition(paddlePosition + aiPaddleSpeed);
      }
    }


    let newPos = {
      x: ballPosition.x + ballVelocity.x * delta,
      y: ballPosition.y + ballVelocity.y * delta,
    };

    // Wall collision (left/right)
    if (newPos.x <= BALL_RADIUS || newPos.x >= app.screen.width - BALL_RADIUS) {
      setBallVelocity((v) => ({ x: -v.x, y: v.y }));
    }

    // Top wall collision and paddle collision
    if (newPos.y <= BALL_RADIUS) {
      setBallVelocity((v) => ({ x: v.x, y: -v.y }));
    } else if (newPos.y >= app.screen.height - PADDLE_HEIGHT - BALL_RADIUS && newPos.x > paddlePosition - PADDLE_WIDTH / 2 && newPos.x < paddlePosition + PADDLE_WIDTH / 2) {
      let hitPosition = newPos.x - paddlePosition;
      let normalizedHitPosition = hitPosition / (PADDLE_WIDTH / 2);
      let angle = normalizedHitPosition * (Math.PI / 3);
      setBallVelocity({ x: BALL_SPEED * Math.sin(angle), y: -BALL_SPEED * Math.cos(angle) });
    } else if (newPos.y > app.screen.height - BALL_RADIUS) {
      // Ball missed the paddle
      setLives(lives - 1);
      if (lives - 1 <= 0) {
        setGameState('gameOver');
      } else {
        setBallPosition({ x: app.screen.width / 2, y: app.screen.height - 100 });
        setBallVelocity({ x: BALL_SPEED, y: -BALL_SPEED });
        setPaddlePosition(app.screen.width / 2);
      }
    }

    // Brick collision
    let hitBrick = false;
    for (let c = 0; c < BRICK_COLUMNS; c++) {
      for (let r = 0; r < BRICK_ROWS; r++) {
        let brick = bricks[c][r];
        if (brick.status === 1) {
          if (
            newPos.x > brick.x &&
            newPos.x < brick.x + BRICK_WIDTH &&
            newPos.y > brick.y &&
            newPos.y < brick.y + BRICK_HEIGHT
          ) {
            setBallVelocity((v) => ({ x: v.x, y: -v.y }));
            BALL_SPEED += 0.1;
            BRICK_OFFSET_TOP += 1;
        
            bricks[c][r].status = 0;
            setScore(score + 1);
            hitBrick = true;
            break;
          }
        }
      }
      if (hitBrick) break;
    }

    if (score === BRICK_ROWS * BRICK_COLUMNS) {
      setGameState('victory');
    }

    setBallPosition(newPos);
  });

  return (
    <Container>
      {gameState === 'playing' && (
        <>
          <Graphics
            draw={(g) => {
              g.clear();
              g.beginFill(PURPLE_COLOR); // Purple color
              g.drawRect(-PADDLE_WIDTH / 2, 0, PADDLE_WIDTH, PADDLE_HEIGHT);
              g.endFill();
            }}
            x={paddlePosition}
            y={app.screen.height - PADDLE_HEIGHT}
          />
          <Graphics
            draw={(g) => {
              g.clear();
              g.beginFill(PURPLE_COLOR); // Purple color
              g.drawCircle(0, 0, BALL_RADIUS);
              g.endFill();
            }}
            x={ballPosition.x}
            y={ballPosition.y}
          />
          {bricks.map((column, cIndex) =>
            column.map((brick, rIndex) => {
              if (brick.status === 1) {
                let brickX = cIndex * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT;
                let brickY = rIndex * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP;
                bricks[cIndex][rIndex].x = brickX;
                bricks[cIndex][rIndex].y = brickY;
                return (
                  <Graphics
                    key={`${cIndex}-${rIndex}`}
                    draw={(g) => {
                      g.clear();
                      g.beginFill(PURPLE_COLOR); // Purple color
                      g.drawRect(0, 0, BRICK_WIDTH, BRICK_HEIGHT);
                      g.endFill();
                    }}
                    x={brickX}
                    y={brickY}
                  />
                );
              }
              return null;
            })
          )}
          <Text text={`Score: ${score}`} style={new PIXI.TextStyle({ fill: PURPLE_COLOR, fontSize: 18, fontFamily: FONT_FAMILY,fontWeight: '500'})} x={10} y={10} />
          <Text text={`Lives: ${lives}`} style={new PIXI.TextStyle({ fill: PURPLE_COLOR, fontSize: 18, fontFamily: FONT_FAMILY,fontWeight: '500' })} x={app.screen.width - 80} y={10} />
        </>
      )}
      {(gameState === 'gameOver' || gameState === 'victory' || gameState === 'start') && (
  <GameOver
    message={gameState === 'start' ? "" : (gameState === 'gameOver' ? "Game Over" : "Victory!")}
    // onRestart={gameState === 'start' ? startGame : resetGame}
    app={app}
    // buttonText={gameState === 'start' ? "Start" : "Restart"}
  />
)}
    </Container>
  );
};

export default BrickBreaker;
