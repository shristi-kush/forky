import React, { useContext, useRef, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import PropTypes from "prop-types";
import AppContext from "../Context/AppContext";

const Interaction = ({ animationData, style, autoPlay, pauseFrame }) => {
  const { dimensions } = useContext(AppContext);
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseEnter = () => {
    playerRef.current.setPlayerSpeed(1);
    playerRef.current.setLoop(true);
    playerRef.current.play();
  };

  const handleMouseLeave = () => {
    playerRef.current.setPlayerSpeed(3);
    playerRef.current.setSeeker(playerRef.current.currentFrame, true);
    playerRef.current.setLoop(false);
  };

  const handleLottieClick = () => {
    console.log(playerRef.current);
    if (dimensions.width < 700) {
      playerRef.current.setLoop(false);
      playerRef.current.play();
    }
  };

  const handleAnimationComplete = () => {
    if (playerRef.current) {
      playerRef.current.setPlayerSpeed(1);
      playerRef.current.setLoop(true);
    }
  };

  const handleEnterFrame = () => {
    const frame = playerRef.current.seeker;
    console.log(frame);
    if (pauseFrame && frame === pauseFrame) {
      playerRef.current.pause();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playerRef.current && playerRef.current.play();
          playerRef.current.setLoop(false);
          const frame = playerRef.current.seeker;
          const totalFrames = playerRef.current.totalFrames;
          console.log(frame, totalFrames);
        } else {
          playerRef.current && playerRef.current.pause();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={handleLottieClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Player
        autoplay={autoPlay && autoPlay}
        ref={playerRef}
        src={animationData}
        style={style}
        onEnterFrame={(event) => {
          handleEnterFrame(event.currentTime);
        }}
        onEvent={(event) => {
          if (event === "complete") {
            handleAnimationComplete();
          }
        }}
      />
    </div>
  );
};

Interaction.propTypes = {
  animationData: PropTypes.object.isRequired,
  style: PropTypes.object,
  autoPlay: PropTypes.bool,
  pauseFrame: PropTypes.number,
};

export default Interaction;
