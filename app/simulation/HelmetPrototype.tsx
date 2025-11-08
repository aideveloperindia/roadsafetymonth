"use client";

import { useState, useRef, useCallback } from "react";

const BASE_DIMENSIONS = { width: 500, height: 500 };
const HEAD_HITBOX = {
  x: 250,
  y: 100,
  width: 120,
  height: 80,
};
const HELMET_SIZE = { width: 100, height: 80 };

export default function HelmetPrototype() {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<[number, number]>([0, 0]);
  const [helmetPosition, setHelmetPosition] = useState<[number, number] | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imageSrc, setImageSrc] = useState("/media/simulation%20media/helmet%20wearing/without%20helmet.png");
  const [isCompleted, setIsCompleted] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = useCallback((e: React.PointerEvent, itemType: string) => {
    if (isCompleted) return;
    e.preventDefault();
    e.stopPropagation();
    setDraggedItem(itemType);
    
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    
    if (canvasRect) {
      // Start from the cursor position relative to the canvas
      const startX = e.clientX - canvasRect.left;
      const startY = e.clientY - canvasRect.top;
      
      // If item doesn't have position yet, create it at cursor
      if (itemType === "helmet" && !helmetPosition) {
        setHelmetPosition([startX - HELMET_SIZE.width / 2, startY - HELMET_SIZE.height / 2]);
        setDragOffset([HELMET_SIZE.width / 2, HELMET_SIZE.height / 2]);
      } else if (helmetPosition) {
        setDragOffset([
          e.clientX - canvasRect.left - helmetPosition[0],
          e.clientY - canvasRect.top - helmetPosition[1],
        ]);
      }
    }
  }, [helmetPosition, isCompleted]);

  const handleDrag = useCallback(
    (e: React.PointerEvent) => {
      if (!draggedItem || !canvasRef.current || isCompleted) return;
      e.preventDefault();
      e.stopPropagation();
      const rect = canvasRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width - HELMET_SIZE.width, e.clientX - rect.left - dragOffset[0]));
      const y = Math.max(0, Math.min(rect.height - HELMET_SIZE.height, e.clientY - rect.top - dragOffset[1]));
      setHelmetPosition([x, y]);
    },
    [draggedItem, dragOffset, isCompleted]
  );

  const handleDragEnd = useCallback(
    async (e: React.PointerEvent) => {
      if (!draggedItem || isCompleted) {
        setDraggedItem(null);
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      // Get current helmet position
      if (!helmetPosition) {
        setDraggedItem(null);
        return;
      }

      const currentX = helmetPosition[0];
      const currentY = helmetPosition[1];

      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) {
        setDraggedItem(null);
        return;
      }

      const scaleX = rect.width / BASE_DIMENSIONS.width;
      const scaleY = rect.height / BASE_DIMENSIONS.height;

      const helmetLeft = currentX;
      const helmetRight = currentX + HELMET_SIZE.width;
      const helmetTop = currentY;
      const helmetBottom = currentY + HELMET_SIZE.height;

      const headLeft = HEAD_HITBOX.x * scaleX;
      const headRight = (HEAD_HITBOX.x + HEAD_HITBOX.width) * scaleX;
      const headTop = HEAD_HITBOX.y * scaleY;
      const headBottom = (HEAD_HITBOX.y + HEAD_HITBOX.height) * scaleY;

      const overlaps = !(
        helmetRight < headLeft ||
        helmetLeft > headRight ||
        helmetBottom < headTop ||
        helmetTop > headBottom
      );

      if (overlaps) {
        // Success! Replace image immediately with updated version
        setImageSrc("/media/simulation%20media/helmet%20wearing/with%20helmet.png?v=" + Date.now());
        setShowSuccess(true);
        setIsCompleted(true);
        
        // Log completion
        try {
          const response = await fetch("/api/sim/complete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sceneId: "bike_no_helmet_prototype",
              success: true,
              attempts: 1,
              seconds: 0,
            }),
          });
          const payload = await response.json();
          if (payload?.referenceId) {
            setReferenceId(payload.referenceId);
          }
        } catch {
          // Ignore logging errors so the learner experience is not interrupted
        }
      }

      setDraggedItem(null);
    },
    [draggedItem, helmetPosition, isCompleted]
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Title and Instructions */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-green-800 mb-2">No Helmet Violation</h2>
        <p className="text-gray-700">
          Drag the helmet from the sidebar onto the rider's head to fix the violation.
        </p>
      </div>

      {/* Main Container with Sidebar */}
      <div ref={containerRef} className="flex flex-col lg:flex-row gap-4 items-stretch">
        {/* Left Sidebar - Draggable Items */}
        <div className="flex flex-col gap-4 w-full lg:w-32 lg:flex-shrink-0 order-2 lg:order-none">
          <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
            <p className="text-xs font-semibold text-gray-700 mb-3 text-center">Drag Items</p>
            
            {/* Helmet Item */}
            {!isCompleted && (
              <div
                className="cursor-move touch-none select-none bg-white border-2 border-green-500 rounded-lg p-2 hover:shadow-lg transition-shadow"
                onPointerDown={(e) => handleDragStart(e, "helmet")}
              >
                <img
                  src="/media/simulation%20media/helmet%20wearing/helmet.png"
                  alt="Helmet"
                  className="w-full h-auto object-contain"
                  draggable={false}
                />
                <p className="text-xs text-center mt-1 font-medium text-gray-700">Helmet</p>
              </div>
            )}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 order-1 lg:order-none w-full">
          <div
            ref={canvasRef}
            className="relative border-2 border-gray-300 rounded-lg bg-white overflow-hidden h-[360px] sm:h-[420px] lg:h-[500px]"
            style={{
              backgroundColor: "#ffffff",
            }}
            onPointerMove={handleDrag}
            onPointerUp={handleDragEnd}
            onPointerLeave={handleDragEnd}
          >
            {/* White background layer - ensures no transparency shows */}
            <div
              className="absolute inset-0 bg-white"
              style={{
                zIndex: 0,
              }}
            />

            {/* Background Scene - Bike with rider */}
            <img
              src={imageSrc}
              alt="Bike rider"
              className="absolute inset-0 w-full h-full object-contain"
              style={{
                opacity: 1,
                zIndex: 1,
                backgroundColor: "#ffffff",
              }}
              draggable={false}
            />

            {/* Draggable Helmet - When being dragged */}
            {helmetPosition && !isCompleted && (
              <div
                className="absolute cursor-move touch-none select-none"
                style={{
                  left: `${helmetPosition[0]}px`,
                  top: `${helmetPosition[1]}px`,
                  width: `${HELMET_SIZE.width}px`,
                  height: `${HELMET_SIZE.height}px`,
                  zIndex: draggedItem === "helmet" ? 50 : 20,
                  opacity: 1,
                  transform: draggedItem === "helmet" ? "scale(1.1)" : "scale(1)",
                  transition: draggedItem === "helmet" ? "none" : "transform 0.2s",
                  pointerEvents: draggedItem === "helmet" ? "none" : "auto",
                }}
                onPointerDown={(e) => handleDragStart(e, "helmet")}
              >
                <img
                  src="/media/simulation%20media/helmet%20wearing/helmet.png"
                  alt="Helmet"
                  className="w-full h-full object-contain"
                  style={{
                    opacity: 1,
                  }}
                  draggable={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mt-6 p-4 bg-green-100 border-2 border-green-400 text-green-800 rounded-lg text-center animate-fade-in space-y-2">
          <p className="text-lg font-bold">✅ Helmet Saves Lives! Always Wear One.</p>
          {referenceId && (
            <p className="text-sm text-green-900">
              Reference ID: <span className="font-semibold">{referenceId}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
