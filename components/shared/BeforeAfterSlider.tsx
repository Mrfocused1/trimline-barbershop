'use client';

import { useState } from "react";
import { GripVertical } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  alt?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  alt = "Before and after comparison",
  className = ""
}: BeforeAfterSliderProps) {
  const [inset, setInset] = useState<number>(50);
  const [onMouseDown, setOnMouseDown] = useState<boolean>(false);

  const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!onMouseDown) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let x = 0;

    if ("touches" in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
    } else if ("clientX" in e) {
      x = e.clientX - rect.left;
    }

    const percentage = (x / rect.width) * 100;
    setInset(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <div
      className={`relative aspect-square w-full h-full overflow-hidden rounded-lg select-none ${className}`}
      onMouseMove={onMouseMove}
      onMouseUp={() => setOnMouseDown(false)}
      onTouchMove={onMouseMove}
      onTouchEnd={() => setOnMouseDown(false)}
    >
      {/* Slider line and handle */}
      <div
        className="bg-white h-full w-0.5 absolute z-20 top-0 -ml-px select-none"
        style={{
          left: inset + "%",
        }}
      >
        <button
          className="bg-white rounded-full hover:scale-110 transition-all w-10 h-10 select-none -translate-y-1/2 absolute top-1/2 -ml-5 z-30 cursor-ew-resize flex justify-center items-center shadow-lg"
          onTouchStart={(e) => {
            setOnMouseDown(true);
            onMouseMove(e);
          }}
          onMouseDown={(e) => {
            setOnMouseDown(true);
            onMouseMove(e);
          }}
          onTouchEnd={() => setOnMouseDown(false)}
          onMouseUp={() => setOnMouseDown(false)}
        >
          <GripVertical className="h-5 w-5 select-none text-black" />
        </button>
      </div>

      {/* After Image (clipped) */}
      <img
        src={afterImage}
        alt={`${alt} - After`}
        className="absolute left-0 top-0 z-10 w-full h-full aspect-square object-cover select-none"
        style={{
          clipPath: "inset(0 0 0 " + inset + "%)",
        }}
      />

      {/* Before Image (background) */}
      <img
        src={beforeImage}
        alt={`${alt} - Before`}
        className="absolute left-0 top-0 w-full h-full aspect-square object-cover select-none"
      />

      {/* Labels */}
      <div className="absolute top-2 left-2 bg-black/70 px-3 py-1 rounded-full text-xs text-white font-medium z-30 pointer-events-none">
        Before
      </div>
      <div className="absolute top-2 right-2 bg-black/70 px-3 py-1 rounded-full text-xs text-white font-medium z-30 pointer-events-none">
        After
      </div>
    </div>
  );
}
