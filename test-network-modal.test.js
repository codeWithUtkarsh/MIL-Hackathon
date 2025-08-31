import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NetworkGraphModal from '../components/NetworkGraphModal';

// Mock HTMLCanvasElement and its context
const mockCanvas = {
  getContext: vi.fn(() => ({
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    fill: vi.fn(),
    fillText: vi.fn(),
    measureText: vi.fn(() => ({ width: 50 })),
    createLinearGradient: vi.fn(() => ({
      addColorStop: vi.fn()
    })),
    set fillStyle(value) {},
    set strokeStyle(value) {},
    set lineWidth(value) {},
    set font(value) {},
    set textAlign(value) {},
    set shadowColor(value) {},
    set shadowBlur(value) {}
  })),
  getBoundingClientRect: vi.fn(() => ({
    left: 0,
    top: 0,
    width: 800,
    height: 600
  })),
  width: 800,
  height: 600
};

// Mock canvas element
beforeEach(() => {
  HTMLCanvasElement.prototype.getContext = mockCanvas.getContext;
  HTMLCanvasElement.prototype.getBoundingClientRect = mockCanvas.getBoundingClientRect;
  Object.defineProperty(HTMLCanvasElement.prototype, 'width', {
    value: 800,
    writable: true
  });
  Object.defineProperty(HTMLCanvasElement.prototype, 'height', {
    value: 600,
    writable: true
  });
});

describe('NetworkGraphModal', () => {
  const mockProps = {
    isOpen: true,
    onClose: vi.fn(),
    ambassadorId: 'amb-1',
    ambassadorName: 'John Ambassador',
    creators: [
      {
        id: 'creator-1',
        name: 'Alice Creator',
        handle: 'alice_creates',
        campus: 'MIT'
      },
      {
        id: 'creator-2',
        name: 'Bob Creator',
        handle: 'bob_makes',
        campus: 'Stanford'
      },
      {
        id: 'creator-3',
        name: 'Carol Creator',
        handle: 'carol_arts',
        campus: 'Harvard'
      }
    ]
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders modal when isOpen is true', () => {
    render(<NetworkGraphModal {...mockProps} />);

    expect(screen.getByText('Creator Network')).toBeInTheDocument();
    expect(screen.getByText('Your network of 3 connected creators')).toBeInTheDocument();
  });

  test('does not render modal when isOpen is false', () => {
    render(<NetworkGraphModal {...mockProps} isOpen={false} />);

    expect(screen.queryByText('Creator Network')).not.toBeInTheDocument();
  });

  test('displays correct network statistics', () => {
    render(<NetworkGraphModal {...mockProps} />);

    expect(screen.getByText('Total Creators:')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Connections:')).toBeInTheDocument();
    expect(screen.getByText('Network Density:')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  test('displays all creators in the creator list', () => {
    render(<NetworkGraphModal {...mockProps} />);

    expect(screen.getByText('Alice Creator')).toBeInTheDocument();
    expect(screen.getByText('@alice_creates')).toBeInTheDocument();
    expect(screen.getByText('MIT')).toBeInTheDocument();

    expect(screen.getByText('Bob Creator')).toBeInTheDocument();
    expect(screen.getByText('@bob_makes')).toBeInTheDocument();
    expect(screen.getByText('Stanford')).toBeInTheDocument();

    expect(screen.getByText('Carol Creator')).toBeInTheDocument();
    expect(screen.getByText('@carol_arts')).toBeInTheDocument();
    expect(screen.getByText('Harvard')).toBeInTheDocument();
  });

  test('shows empty state when no creators are provided', () => {
    const emptyProps = { ...mockProps, creators: [] };
    render(<NetworkGraphModal {...emptyProps} />);

    expect(screen.getByText('Your network of 0 connected creators')).toBeInTheDocument();
    expect(screen.getByText('No creators connected yet')).toBeInTheDocument();
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    render(<NetworkGraphModal {...mockProps} />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  test('renders canvas with correct attributes', () => {
    render(<NetworkGraphModal {...mockProps} />);

    const canvas = screen.getByRole('img', { hidden: true }); // Canvas has implicit role img
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute('width', '800');
    expect(canvas).toHaveAttribute('height', '600');
  });

  test('displays legend with correct node types', () => {
    render(<NetworkGraphModal {...mockProps} />);

    expect(screen.getByText('Legend')).toBeInTheDocument();
    expect(screen.getByText('Ambassador')).toBeInTheDocument();
    expect(screen.getByText('Creator')).toBeInTheDocument();
  });

  test('handles canvas click events', () => {
    render(<NetworkGraphModal {...mockProps} />);

    const canvas = screen.getByRole('img', { hidden: true });

    // Mock canvas click
    fireEvent.click(canvas, {
      clientX: 400,
      clientY: 300
    });

    // The click handler should be called (no errors thrown)
    expect(canvas).toBeInTheDocument();
  });

  test('handles canvas mouse events for drag interactions', () => {
    render(<NetworkGraphModal {...mockProps} />);

    const canvas = screen.getByRole('img', { hidden: true });

    // Test mouse down
    fireEvent.mouseDown(canvas, {
      clientX: 400,
      clientY: 300
    });

    // Test mouse move
    fireEvent.mouseMove(canvas, {
      clientX: 450,
      clientY: 350
    });

    // Test mouse up
    fireEvent.mouseUp(canvas);

    // No errors should be thrown
    expect(canvas).toBeInTheDocument();
  });

  test('renders network stats section', () => {
    render(<NetworkGraphModal {...mockProps} />);

    expect(screen.getByText('Network Stats')).toBeInTheDocument();
    expect(screen.getByText('Connected Creators')).toBeInTheDocument();
  });

  test('shows correct instructions in footer', () => {
    render(<NetworkGraphModal {...mockProps} />);

    expect(screen.getByText(/Click and drag nodes to rearrange/)).toBeInTheDocument();
    expect(screen.getByText(/Your network shows all creators you've connected with/)).toBeInTheDocument();
  });

  test('canvas context methods are called during render', async () => {
    render(<NetworkGraphModal {...mockProps} />);

    // Wait for animation frame
    await new Promise(resolve => setTimeout(resolve, 100));

    // Verify that canvas context methods were called
    expect(mockCanvas.getContext).toHaveBeenCalled();
  });
});
