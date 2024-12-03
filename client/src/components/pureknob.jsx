import React, { useEffect, useRef, useState } from 'react';

const Knob = ({
  width = 100,
  height = 100,
  initialValue = 0,
  min = 0,
  max = 100,
  onChange,
  readOnly = false,
}) => {
  const canvasRef = useRef(null);
  const [value, setValue] = useState(initialValue);

  const drawKnob = (ctx) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 10;

    // Adjust angles for a downward-facing "U"
    const angleStart = 0.75 * Math.PI; // Start to the left of the bottom
    const angleEnd = 2.25 * Math.PI; // End to the right of the bottom

    // Calculate the angle for the current value
    const relativeValue = (value - min) / (max - min);
    const angleValue = angleStart + relativeValue * (angleEnd - angleStart);

    ctx.clearRect(0, 0, width, height);

    // Draw background track (full "U")
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, angleStart, angleEnd);
    ctx.strokeStyle = '#181818'; // Background track color
    ctx.lineWidth = 15;
    ctx.stroke();

    // Draw value arc (partial "U")
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, angleStart, angleValue);
    ctx.strokeStyle = '#3ea4f0'; // Value color
    ctx.lineWidth = 15;
    ctx.stroke();

    // Draw text (centered)
    ctx.font = `${radius * .6}px Arial`;
    ctx.fillStyle = '#3ea4f0';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle'; // Align text to the middle vertically
    ctx.fillText(value, centerX, centerY); // Center text inside the gauge
};



  const handleMouseDown = (event) => {
    if (readOnly) return;

    const handleMouseMove = (moveEvent) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const centerX = rect.left + width / 2;
      const centerY = rect.top + height / 2 + 10;
      const x = moveEvent.clientX - centerX;
      const y = moveEvent.clientY - centerY;
      const angle = Math.atan2(y, x) + Math.PI;

      const normalizedAngle = Math.max(
        Math.min(angle, 2 * Math.PI),
        Math.PI
      );
      const newValue = Math.round(min + ((normalizedAngle - Math.PI) / Math.PI) * (max - min));

      setValue((prev) => {
        if (onChange) onChange(newValue);
        return Math.max(min, Math.min(max, newValue));
      });
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      drawKnob(ctx);
    }
  }, [value]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ cursor: readOnly ? 'default' : 'pointer' }}
      onMouseDown={handleMouseDown}
    />
  );
};

export default Knob;
