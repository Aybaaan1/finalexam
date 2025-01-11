"use client";
import { useState, useEffect } from "react";

const SnakeGame = () => {
  const gridSize = 20; // Size of each grid square
  const gridCount = 20; // Number of squares in the grid
  const initialSnake = [{ x: 10, y: 10 }];
  const [snake, setSnake] = useState(initialSnake);
  const [apple, setApple] = useState(generateRandomApple());
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);

  // Generate a random position for the apple
  function generateRandomApple() {
    return {
      x: Math.floor(Math.random() * gridCount),
      y: Math.floor(Math.random() * gridCount),
    };
  }

  // Move the snake
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const newHead = {
          x: prevSnake[0].x + direction.x,
          y: prevSnake[0].y + direction.y,
        };

        // Check collisions with walls or itself
        if (
          newHead.x < 0 ||
          newHead.y < 0 ||
          newHead.x >= gridCount ||
          newHead.y >= gridCount ||
          prevSnake.some(
            (segment) => segment.x === newHead.x && segment.y === newHead.y
          )
        ) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check if the snake eats the apple
        if (newHead.x === apple.x && newHead.y === apple.y) {
          setApple(generateRandomApple());
        } else {
          newSnake.pop(); // Remove the tail if not eating
        }

        return newSnake;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [direction, apple, gameOver]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  // Reset the game
  const resetGame = () => {
    setSnake(initialSnake);
    setApple(generateRandomApple());
    setDirection({ x: 0, y: 0 });
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Snake Game</h1>
      <div
        className="relative bg-black"
        style={{
          width: gridSize * gridCount,
          height: gridSize * gridCount,
        }}
      >
        {snake.map((segment, index) => (
          <div
            key={index}
            className="absolute bg-green-500"
            style={{
              width: gridSize,
              height: gridSize,
              left: segment.x * gridSize,
              top: segment.y * gridSize,
            }}
          ></div>
        ))}
        <div
          className="absolute bg-red-500 rounded-full"
          style={{
            width: gridSize,
            height: gridSize,
            left: apple.x * gridSize,
            top: apple.y * gridSize,
          }}
        ></div>
      </div>
      {gameOver && (
        <div className="mt-4">
          <p className="text-red-500 font-bold">Game Over!</p>
          <button
            onClick={resetGame}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded shadow"
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
