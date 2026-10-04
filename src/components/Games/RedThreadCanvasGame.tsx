import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audioEngine';

interface RedThreadCanvasGameProps {
  onSolve: (answer: string) => void;
}

interface MilestoneNode {
  id: string;
  label: string;
  order: number;
  x: number;
  y: number;
  date: string;
}

const NODES: MilestoneNode[] = [
  { id: 'A', label: 'Tinder Match', order: 1, x: 20, y: 30, date: 'Nov 2024' },
  { id: 'B', label: 'Interval Proposal', order: 2, x: 80, y: 30, date: 'The Vow' },
  { id: 'C', label: 'Coma Letter', order: 3, x: 20, y: 75, date: 'The Prayer' },
  { id: 'D', label: 'Paper Rings', order: 4, x: 80, y: 75, date: 'Forever' }
];

export default function RedThreadCanvasGame({ onSolve }: RedThreadCanvasGameProps) {
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);

  const handleNodeClick = (node: MilestoneNode) => {
    if (solved) return;
    sound.playHeartClick();

    const expectedNextOrder = visitedNodes.length + 1;
    if (node.order === expectedNextOrder) {
      const nextVisited = [...visitedNodes, node.id];
      setVisitedNodes(nextVisited);

      if (nextVisited.length === NODES.length) {
        sound.playMatchSound();
        setSolved(true);
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ff285e', '#ffffff', '#ffd166']
        });
        setTimeout(() => {
          onSolve('ABCD');
        }, 1800);
      }
    } else {
      sound.playTone(180, 0.2);
      // Give feedback
      if (visitedNodes.length === 0 && node.order !== 1) {
        // Start from Tinder
      }
    }
  };

  const handleReset = () => {
    sound.playHeartClick();
    setVisitedNodes([]);
  };

  return (
    <div className="relative max-w-md mx-auto w-full p-4 rounded-3xl bg-gradient-to-b from-[#1c0817] via-[#0f040d] to-[#050104] border-2 border-universe-wine/60 shadow-2xl text-center space-y-4 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-universe-wine/30">
        <span className="text-universe-dustyPink font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-universe-blush" />
          The Red Thread Weaver
        </span>
        <button
          onClick={handleReset}
          className="text-[11px] text-universe-dustyPink hover:text-white"
        >
          Reset Thread
        </button>
      </div>

      <p className="text-xs font-serif text-universe-blush italic">
        Weave the glowing red thread by clicking the milestones in emotional order:
      </p>

      {/* Interactive Board Area */}
      <div className="relative h-64 sm:h-72 w-full rounded-2xl bg-black/60 border border-universe-wine/50 overflow-hidden my-2">
        
        {/* Dynamic SVG Red Thread */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {visitedNodes.map((nodeId, idx) => {
            if (idx === 0) return null;
            const prevId = visitedNodes[idx - 1];
            const prevNode = NODES.find((n) => n.id === prevId);
            const currNode = NODES.find((n) => n.id === nodeId);
            if (!prevNode || !currNode) return null;

            return (
              <line
                key={`${prevId}-${nodeId}`}
                x1={`${prevNode.x}%`}
                y1={`${prevNode.y}%`}
                x2={`${currNode.x}%`}
                y2={`${currNode.y}%`}
                stroke="#ff285e"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="shadow-glow-red animate-pulse"
              />
            );
          })}
        </svg>

        {/* Milestone Pins / Nodes */}
        {NODES.map((node) => {
          const isConnected = visitedNodes.includes(node.id);
          const isNextExpected = visitedNodes.length + 1 === node.order;

          return (
            <button
              key={node.id}
              onClick={() => handleNodeClick(node)}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className={`absolute px-3 py-2 rounded-2xl border-2 transition-all flex flex-col items-center justify-center touch-manipulation ${
                isConnected
                  ? 'bg-universe-crimson border-universe-glowingRed text-white shadow-glow-red scale-105'
                  : isNextExpected
                  ? 'bg-universe-darkBurgundy/90 border-universe-blush text-universe-cream shadow-glow-blush animate-bounce'
                  : 'bg-universe-black/70 border-universe-wine/40 text-universe-lavender/60 hover:border-universe-wine'
              }`}
            >
              <div className="flex items-center gap-1 font-serif text-xs font-semibold">
                <span>{node.id}.</span>
                <span>{node.label}</span>
              </div>
              <span className="text-[9px] font-mono text-universe-dustyPink">
                {node.date}
              </span>
            </button>
          );
        })}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between text-[11px] font-mono text-universe-dustyPink pt-1">
        <span>Connected: {visitedNodes.length} / 4 Milestones</span>
        {solved && (
          <span className="text-universe-gold font-semibold animate-pulse">
            ✓ The Red Thread is unbroken forever!
          </span>
        )}
      </div>

    </div>
  );
}
