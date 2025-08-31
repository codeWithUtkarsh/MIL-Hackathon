"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface NetworkNode {
  id: string;
  name: string;
  type: "ambassador" | "creator";
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

interface NetworkLink {
  source: string;
  target: string;
}

interface NetworkGraphModalProps {
  isOpen: boolean;
  onClose: () => void;
  ambassadorId: string;
  ambassadorName: string;
  creators: Array<{
    id: string;
    name: string;
    handle: string;
    campus: string;
  }>;
}

export default function NetworkGraphModal({
  isOpen,
  onClose,
  ambassadorId,
  ambassadorName,
  creators,
}: NetworkGraphModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<NetworkNode[]>([]);
  const [links, setLinks] = useState<NetworkLink[]>([]);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [draggedNode, setDraggedNode] = useState<NetworkNode | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [animationFrame, setAnimationFrame] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Create nodes: ambassador in center, creators around it
    const ambassadorNode: NetworkNode = {
      id: ambassadorId,
      name: ambassadorName,
      type: "ambassador",
      x: 400, // Center of canvas
      y: 300,
      vx: 0,
      vy: 0,
    };

    const creatorNodes: NetworkNode[] = creators.map((creator, index) => {
      const angle = (index / creators.length) * 2 * Math.PI;
      const radius = Math.min(150, 80 + creators.length * 8); // Dynamic radius based on number of creators
      return {
        id: creator.id,
        name: creator.name,
        type: "creator",
        x: 400 + Math.cos(angle) * radius,
        y: 300 + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
      };
    });

    const networkNodes = [ambassadorNode, ...creatorNodes];
    const networkLinks: NetworkLink[] = creators.map((creator) => ({
      source: ambassadorId,
      target: creator.id,
    }));

    setNodes(networkNodes);
    setLinks(networkLinks);
  }, [isOpen, ambassadorId, ambassadorName, creators]);

  useEffect(() => {
    if (!isOpen || !canvasRef.current || nodes.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      // Clear canvas with a slight fade effect
      ctx.fillStyle = "rgba(31, 41, 55, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply simple physics for floating effect
      const updatedNodes = nodes.map((node) => {
        if (node === draggedNode) return node; // Don't apply physics to dragged node

        const time = Date.now() * 0.001;
        const amplitude = node.type === "ambassador" ? 2 : 1;
        const frequency = node.type === "ambassador" ? 0.5 : 0.8;

        return {
          ...node,
          y: node.y! + Math.sin(time * frequency + node.x! * 0.01) * amplitude,
        };
      });

      // Draw connection lines with gradient
      links.forEach((link) => {
        const sourceNode = updatedNodes.find((n) => n.id === link.source);
        const targetNode = updatedNodes.find((n) => n.id === link.target);
        if (sourceNode && targetNode) {
          // Create gradient
          const gradient = ctx.createLinearGradient(
            sourceNode.x!,
            sourceNode.y!,
            targetNode.x!,
            targetNode.y!,
          );
          gradient.addColorStop(0, "#7c3aed");
          gradient.addColorStop(1, "#3b82f6");

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.shadowColor = "#4f46e5";
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.moveTo(sourceNode.x!, sourceNode.y!);
          ctx.lineTo(targetNode.x!, targetNode.y!);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });

      // Draw nodes with enhanced effects
      updatedNodes.forEach((node) => {
        const isSelected = selectedNode?.id === node.id;
        const isHovered =
          Math.sqrt(
            Math.pow(mousePos.x - node.x!, 2) +
              Math.pow(mousePos.y - node.y!, 2),
          ) <= (node.type === "ambassador" ? 25 : 20);

        if (node.type === "ambassador") {
          // Ambassador node with glow effect
          ctx.shadowColor = "#a855f7";
          ctx.shadowBlur = isSelected || isHovered ? 20 : 10;
          ctx.fillStyle = isSelected || isHovered ? "#8b5cf6" : "#7c3aed";
          ctx.beginPath();
          ctx.arc(
            node.x!,
            node.y!,
            isSelected || isHovered ? 22 : 20,
            0,
            2 * Math.PI,
          );
          ctx.fill();

          // Border
          ctx.strokeStyle = "#a855f7";
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.shadowBlur = 0;
        } else {
          // Creator node with hover effect
          ctx.shadowColor = "#60a5fa";
          ctx.shadowBlur = isSelected || isHovered ? 15 : 5;
          ctx.fillStyle = isSelected || isHovered ? "#2563eb" : "#3b82f6";
          ctx.beginPath();
          ctx.arc(
            node.x!,
            node.y!,
            isSelected || isHovered ? 17 : 15,
            0,
            2 * Math.PI,
          );
          ctx.fill();

          // Border
          ctx.strokeStyle = "#60a5fa";
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // Node labels with background
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.font = "12px Inter, sans-serif";
        ctx.textAlign = "center";
        const textWidth = ctx.measureText(node.name).width;
        ctx.fillRect(
          node.x! - textWidth / 2 - 4,
          node.y! - 35,
          textWidth + 8,
          16,
        );

        ctx.fillStyle = "#ffffff";
        ctx.fillText(node.name, node.x!, node.y! - 27);
      });

      const frameId = requestAnimationFrame(animate);
      setAnimationFrame(frameId);
    };

    const frameId = requestAnimationFrame(animate);
    setAnimationFrame(frameId);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [nodes, links, isOpen, selectedNode, mousePos, draggedNode]);

  const getMousePos = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const findNodeAtPosition = (x: number, y: number) => {
    return nodes.find((node) => {
      const distance = Math.sqrt(
        Math.pow(x - node.x!, 2) + Math.pow(y - node.y!, 2),
      );
      return distance <= (node.type === "ambassador" ? 25 : 20);
    });
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(event);
    const clickedNode = findNodeAtPosition(pos.x, pos.y);
    setSelectedNode(clickedNode || null);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(event);
    setMousePos(pos);

    if (draggedNode) {
      // Update dragged node position
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === draggedNode.id ? { ...node, x: pos.x, y: pos.y } : node,
        ),
      );
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(event);
    const node = findNodeAtPosition(pos.x, pos.y);
    if (node) {
      setDraggedNode(node);
      setSelectedNode(node);
    }
  };

  const handleMouseUp = () => {
    setDraggedNode(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Creator Network
            </h2>
            <p className="text-gray-400 mt-1">
              Your network of {creators.length} connected creators
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Network Graph */}
            <div className="lg:col-span-3">
              <div className="bg-gray-800 rounded-lg p-4">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={600}
                  className="w-full h-auto border border-gray-600 rounded cursor-pointer"
                  onClick={handleCanvasClick}
                  onMouseMove={handleMouseMove}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                />
              </div>
            </div>

            {/* Side Panel */}
            <div className="space-y-4">
              {/* Legend */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-sm font-medium text-white mb-3">Legend</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-purple-600 border-2 border-purple-400"></div>
                    <span className="text-sm text-gray-300">Ambassador</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-600 border-2 border-blue-400"></div>
                    <span className="text-sm text-gray-300">Creator</span>
                  </div>
                </div>
              </div>

              {/* Node Details */}
              {selectedNode && (
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-white mb-3">
                    Node Details
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs text-gray-400">Name:</span>
                      <p className="text-sm text-white">{selectedNode.name}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400">Type:</span>
                      <p className="text-sm text-white capitalize">
                        {selectedNode.type}
                      </p>
                    </div>
                    {selectedNode.type === "creator" && (
                      <div>
                        <span className="text-xs text-gray-400">
                          Connections:
                        </span>
                        <p className="text-sm text-white">
                          Connected to {ambassadorName}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Network Stats */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-sm font-medium text-white mb-3">
                  Network Stats
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">
                      Total Creators:
                    </span>
                    <span className="text-sm text-white">
                      {creators.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Connections:</span>
                    <span className="text-sm text-white">
                      {creators.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">
                      Network Density:
                    </span>
                    <span className="text-sm text-white">
                      {creators.length > 0 ? "100%" : "0%"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Creator List */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-sm font-medium text-white mb-3">
                  Connected Creators
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {creators.map((creator) => (
                    <div
                      key={creator.id}
                      className="flex items-center justify-between p-2 bg-gray-700 rounded text-sm"
                    >
                      <div>
                        <p className="text-white">{creator.name}</p>
                        <p className="text-gray-400 text-xs">
                          @{creator.handle}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400">
                        {creator.campus}
                      </span>
                    </div>
                  ))}
                  {creators.length === 0 && (
                    <p className="text-gray-400 text-sm text-center py-4">
                      No creators connected yet
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Debug Info */}
        {process.env.NODE_ENV === "development" && (
          <div className="border-t border-gray-700 p-4 bg-red-900/20">
            <h4 className="text-xs font-medium text-red-400 mb-2">
              Debug Info:
            </h4>
            <div className="text-xs text-red-300 space-y-1">
              <p>Ambassador ID: {ambassadorId}</p>
              <p>Ambassador Name: {ambassadorName}</p>
              <p>Creators Length: {creators.length}</p>
              <p>
                Creators:{" "}
                {JSON.stringify(
                  creators.map((c) => ({ id: c.id, name: c.name })),
                  null,
                  2,
                )}
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-gray-700 p-4 bg-gray-800/50">
          <p className="text-xs text-gray-400 text-center">
            Click and drag nodes to rearrange. Click on nodes to view details.
            Your network shows all creators you've connected with.
          </p>
        </div>
      </div>
    </div>
  );
}
