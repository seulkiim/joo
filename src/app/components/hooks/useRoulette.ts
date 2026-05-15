'use client';

import { useState, useCallback, useRef } from 'react';

export interface Section {
  index: number;
  label: string;
  color: string;
}

const WHEEL_COLORS = [
  '#e63946',
  '#2a9d8f',
  '#e9c46a',
  '#264653',
  '#f4a261',
  '#6d6875',
  '#a8dadc',
  '#457b9d',
  '#e76f51',
  '#52b788',
  '#f72585',
  '#4cc9f0',
];

function buildSections(count: number): Section[] {
  return Array.from({ length: count }, (_, i) => ({
    index: i,
    label: String(i + 1),
    color: WHEEL_COLORS[i % WHEEL_COLORS.length],
  }));
}

export function useRoulette() {
  const [sectionCount, setSectionCountState] = useState(8);
  const [sections, setSections] = useState<Section[]>(() => buildSections(8));
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<Section | null>(null);
  const currentRotationRef = useRef(0);

  const setSectionCount = useCallback((count: number) => {
    const clamped = Math.max(2, Math.min(36, count));
    setSectionCountState(clamped);
    setSections(buildSections(clamped));
    setWinner(null);
  }, []);

  const spin = useCallback(() => {
    if (isSpinning) return;

    const targetIndex = Math.floor(Math.random() * sectionCount);
    const extraSpins = (5 + Math.random() * 5) * 360;
    const sectionAngle = 360 / sectionCount;

    // Pointer is at top. We rotate the wheel so targetIndex lands under the pointer.
    // Section i starts at angle (sectionAngle * i) from the top.
    // We want the midpoint of targetIndex at the top (0 degrees after rotation).
    // Midpoint of section targetIndex = sectionAngle * targetIndex + sectionAngle / 2
    // The wheel needs to rotate so that midpoint aligns with pointer (top = 0).
    const sectionMidOnWheel = sectionAngle * targetIndex + sectionAngle / 2;
    // How many more degrees to rotate from current accumulated rotation to land correctly:
    const currentNormalized = ((currentRotationRef.current % 360) + 360) % 360;
    const needed = ((360 - sectionMidOnWheel - currentNormalized) % 360 + 360) % 360;
    const targetRotation = currentRotationRef.current + extraSpins + needed;

    currentRotationRef.current = targetRotation;
    setIsSpinning(true);
    setWinner(null);
    setRotation(targetRotation);

    return { targetIndex, sections };
  }, [isSpinning, sectionCount, sections]);

  const onSpinEnd = useCallback(() => {
    setIsSpinning(false);
    // Determine winner from final rotation
    const normalizedRotation = ((currentRotationRef.current % 360) + 360) % 360;
    const sectionAngle = 360 / sectionCount;
    // Pointer at top: what's at the top = (360 - normalizedRotation) into the wheel
    const pointerPosition = (360 - normalizedRotation + 360) % 360;
    const winnerIndex = Math.floor(pointerPosition / sectionAngle) % sectionCount;
    setWinner(sections[winnerIndex]);
  }, [sectionCount, sections]);

  return {
    sectionCount,
    sections,
    rotation,
    isSpinning,
    winner,
    spin,
    onSpinEnd,
    setSectionCount,
  };
}
