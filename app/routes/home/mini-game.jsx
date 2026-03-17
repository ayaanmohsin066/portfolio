import { Section } from '~/components/section';
import { Heading } from '~/components/heading';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useHydrated } from '~/hooks/useHydrated';
import styles from './mini-game.module.css';

const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 200;
const PLAYER_SIZE = 24;
const GROUND_Y = CANVAS_HEIGHT - 40;
const PLAYER_X = 80;
const GRAVITY = 0.6;
const JUMP_FORCE = -12;
const BASE_SPEED = 2.0;
const MAX_SPEED = 8.0;
const SPEED_INCREASE = 0.15;
const SPEED_INTERVAL = 30; // increase speed every N points
const OBSTACLE_MIN_GAP = 700;
const OBSTACLE_MAX_GAP = 1000;
const OBSTACLE_WIDTH = 20;
const OBSTACLE_MIN_HEIGHT = 28;
const OBSTACLE_MAX_HEIGHT = 50;

export function MiniGame() {
  const canvasRef = useRef(null);
  const hydrated = useHydrated();
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(BASE_SPEED);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const gameRef = useRef({
    started: false,
    playerY: GROUND_Y - PLAYER_SIZE,
    playerVy: 0,
    obstacles: [],
    nextObstacleAt: 0,
    score: 0,
    lastScoreInt: -1,
    speed: BASE_SPEED,
    gameOver: false,
    lastTime: 0,
    animId: null,
    frameCount: 0,
  });

  const startGame = useCallback(() => {
    const g = gameRef.current;
    g.started = true;
    g.playerY = GROUND_Y - PLAYER_SIZE;
    g.playerVy = 0;
    g.obstacles = [];
    g.nextObstacleAt = 0;
    g.score = 0;
    g.lastScoreInt = -1;
    g.speed = BASE_SPEED;
    g.gameOver = false;
    setScore(0);
    setSpeed(BASE_SPEED);
    setGameOver(false);
    setIsPlaying(true);
  }, []);

  const jump = useCallback(() => {
    const g = gameRef.current;
    if (g.gameOver) {
      startGame();
      return;
    }
    if (!isPlaying) {
      startGame();
      return;
    }
    if (g.playerY >= GROUND_Y - PLAYER_SIZE - 2) {
      g.playerVy = JUMP_FORCE;
    }
  }, [startGame, isPlaying]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!hydrated) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 2);
    canvas.width = CANVAS_WIDTH * dpr;
    canvas.height = CANVAS_HEIGHT * dpr;
    ctx.scale(dpr, dpr);

    const draw = () => {
      const w = CANVAS_WIDTH;
      const h = CANVAS_HEIGHT;
      const g = gameRef.current;

      // Dark background
      ctx.fillStyle = '#0f0f0f';
      ctx.fillRect(0, 0, w, h);

      // Ground line (teal accent)
      ctx.strokeStyle = '#14b8a6';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y + PLAYER_SIZE);
      ctx.lineTo(w, GROUND_Y + PLAYER_SIZE);
      ctx.stroke();
      ctx.setLineDash([]);

      // Player (pixel-art dinosaur)
      const px = PLAYER_X;
      const py = g.playerY;
      const legCycle = (g.frameCount >> 2) % 2;
      ctx.fillStyle = '#4CAF50';
      // Body (main rectangle)
      ctx.fillRect(px + 6, py + 8, 12, 14);
      // Head (smaller rectangle top right)
      ctx.fillRect(px + 14, py + 2, 8, 8);
      // Eye (white dot)
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px + 17, py + 5, 3, 3);
      // Tail (triangle on left)
      ctx.fillStyle = '#4CAF50';
      ctx.beginPath();
      ctx.moveTo(px + 2, py + 12);
      ctx.lineTo(px + 6, py + 8);
      ctx.lineTo(px + 6, py + 16);
      ctx.closePath();
      ctx.fill();
      // Legs (alternate when running)
      ctx.fillStyle = '#388E3C';
      const legY = legCycle === 0 ? [py + 18, py + 20] : [py + 20, py + 18];
      ctx.fillRect(px + 8, legY[0], 4, 6);
      ctx.fillRect(px + 16, legY[1], 4, 6);

      // Obstacles (green)
      ctx.fillStyle = '#22c55e';
      g.obstacles.forEach(obs => {
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      });

      if (g.gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#14b8a6';
        ctx.font = 'bold 28px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', w / 2, h / 2 - 10);
        ctx.font = '16px system-ui, sans-serif';
        ctx.fillStyle = '#e5e5e5';
        ctx.fillText('Press Space or click Play again', w / 2, h / 2 + 20);
      }
    };

    const gameLoop = (timestamp) => {
      const g = gameRef.current;
      const w = CANVAS_WIDTH;
      if (!g.animId) g.lastTime = timestamp;
      const dt = Math.min((timestamp - g.lastTime) / 16, 4);
      g.lastTime = timestamp;

        if (!g.gameOver && g.started) {
        g.frameCount += 1;
        // Gravity and jump
        g.playerVy += GRAVITY;
        g.playerY += g.playerVy;
        if (g.playerY >= GROUND_Y - PLAYER_SIZE) {
          g.playerY = GROUND_Y - PLAYER_SIZE;
          g.playerVy = 0;
        }

        // Spawn obstacles
        g.nextObstacleAt -= g.speed * dt * 10;
        if (g.nextObstacleAt <= 0) {
          const height =
            OBSTACLE_MIN_HEIGHT +
            Math.random() * (OBSTACLE_MAX_HEIGHT - OBSTACLE_MIN_HEIGHT);
          g.obstacles.push({
            x: w,
            y: GROUND_Y - height,
            width: OBSTACLE_WIDTH,
            height,
          });
          g.nextObstacleAt =
            OBSTACLE_MIN_GAP + Math.random() * (OBSTACLE_MAX_GAP - OBSTACLE_MIN_GAP);
        }

        // Move obstacles
        g.obstacles = g.obstacles.filter(obs => {
          obs.x -= g.speed * dt * 2;
          return obs.x + obs.width > 0;
        });

        // Score (time-based)
        g.score += dt * 2;
        const speedStep = Math.floor(g.score / SPEED_INTERVAL) * SPEED_INCREASE;
        g.speed = Math.min(MAX_SPEED, BASE_SPEED + speedStep);
        const newScoreInt = Math.floor(g.score);
        if (newScoreInt !== g.lastScoreInt) {
          g.lastScoreInt = newScoreInt;
          setScore(newScoreInt);
          setSpeed(parseFloat(g.speed.toFixed(2)));
        }

        // Collision
        const playerLeft = PLAYER_X + 4;
        const playerRight = PLAYER_X + PLAYER_SIZE - 4;
        const playerTop = g.playerY + 4;
        const playerBottom = g.playerY + PLAYER_SIZE - 4;

        for (const obs of g.obstacles) {
          if (
            playerRight > obs.x &&
            playerLeft < obs.x + obs.width &&
            playerBottom > obs.y &&
            playerTop < obs.y + obs.height
          ) {
            g.gameOver = true;
            setGameOver(true);
            setIsPlaying(false);
            setScore(Math.floor(g.score));
            break;
          }
        }
      }

      draw();
      g.animId = requestAnimationFrame(gameLoop);
    };

    gameRef.current.animId = requestAnimationFrame(gameLoop);
    return () => {
      if (gameRef.current.animId) cancelAnimationFrame(gameRef.current.animId);
    };
  }, [hydrated]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (gameOver) startGame();
        else jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump, gameOver, startGame]);

  return (
    <Section className={styles.miniGame} as="section" id="mini-game">
      <div className={styles.content}>
        <span className={styles.label}>
          Mini Game <span className={styles.emoji} aria-hidden>🎮</span>
        </span>
        <Heading className={styles.title} level={2}>
          Take a Break!
        </Heading>
        <div className={styles.stats}>
          <span className={styles.stat}>Speed: {speed.toFixed(2)}</span>
          <span className={styles.stat}>Score: {score}</span>
        </div>
        <div className={styles.canvasWrap}>
          {hydrated ? (
            <canvas
              ref={canvasRef}
              className={styles.canvas}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
              aria-label="Dino jump game: avoid green obstacles by jumping"
            />
          ) : (
            <div
              className={styles.canvasPlaceholder}
              style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
              aria-label="Mini game loading"
            />
          )}
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.jumpBtn}
            onClick={jump}
            aria-label="Jump"
          >
            Jump ↑
          </button>
          {gameOver && (
            <button
              type="button"
              className={styles.playAgainBtn}
              onClick={startGame}
            >
              Play again
            </button>
          )}
        </div>
      </div>
    </Section>
  );
}
