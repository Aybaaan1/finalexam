"use client";

import { useEffect, useState } from "react";

const FlappyBird = () => {
  const [birdY, setBirdY] = useState(50);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gravity = 1.5; // Simulated gravity
  const jumpHeight = -10; // Velocity when jumping
  const obstacleWidth = 30;
  const gapHeight = 150;
  const gameWidth = 500;
  const gameHeight = 400;

  // Bird movement
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        setBirdY((prev) => prev + birdVelocity);
        setBirdVelocity((prev) => prev + gravity);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [birdVelocity, gameOver]);

  // Obstacle movement and collision detection
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        setObstacles((prev) => {
          const updatedObstacles = prev.map((obstacle) => ({
            ...obstacle,
            x: obstacle.x - 5,
          }));
          const outOfBounds = updatedObstacles.filter(
            (obstacle) => obstacle.x + obstacleWidth >= 0
          );
          return outOfBounds;
        });

        // Add new obstacles
        if (
          obstacles.length === 0 ||
          obstacles[obstacles.length - 1].x < gameWidth - 200
        ) {
          setObstacles((prev) => [
            ...prev,
            {
              x: gameWidth,
              gapTop: Math.random() * (gameHeight - gapHeight),
            },
          ]);
        }

        setScore((prev) => prev + 1);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [obstacles, gameOver]);

  // Collision detection
  useEffect(() => {
    obstacles.forEach((obstacle) => {
      if (
        birdY < 0 ||
        birdY > gameHeight ||
        ((birdY < obstacle.gapTop || birdY > obstacle.gapTop + gapHeight) &&
          birdY > 0 &&
          birdY < gameHeight &&
          obstacle.x < 60 &&
          obstacle.x + obstacleWidth > 20)
      ) {
        setGameOver(true);
      }
    });
  }, [birdY, obstacles]);

  const handleJump = () => {
    if (!gameOver) {
      setBirdVelocity(jumpHeight);
    }
  };

  const handleRestart = () => {
    setBirdY(50);
    setBirdVelocity(0);
    setObstacles([]);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500">
      <h1 className="text-white text-2xl font-bold mb-4">Flappy Bird</h1>
      <div
        className="relative bg-white"
        style={{
          width: gameWidth,
          height: gameHeight,
          overflow: "hidden",
          border: "2px solid black",
        }}
        onClick={handleJump}
      >
        <div
          style={{
            position: "absolute",
            left: "20px",
            top: `${birdY}px`,
            width: "20px",
            height: "20px",
            backgroundColor: "yellow",
            borderRadius: "50%",
          }}
        ></div>
        {obstacles.map((obstacle, index) => (
          <div key={index}>
            <div
              style={{
                position: "absolute",
                left: `${obstacle.x}px`,
                top: "0px",
                width: `${obstacleWidth}px`,
                height: `${obstacle.gapTop}px`,
                backgroundColor: "green",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                left: `${obstacle.x}px`,
                top: `${obstacle.gapTop + gapHeight}px`,
                width: `${obstacleWidth}px`,
                height: `${gameHeight - obstacle.gapTop - gapHeight}px`,
                backgroundColor: "green",
              }}
            ></div>
          </div>
        ))}
      </div>
      <p className="text-white text-xl mt-4">Score: {score}</p>
      {gameOver && (
        <div className="mt-4 text-center">
          <p className="text-red-500 text-lg font-bold">Game Over!</p>
          <button
            onClick={handleRestart}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded shadow"
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default FlappyBird;
