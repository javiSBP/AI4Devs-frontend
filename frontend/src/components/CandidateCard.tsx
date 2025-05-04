import React, { useRef } from "react";
import { Card } from "react-bootstrap";
import { useDrag } from "react-dnd";

export type CandidateRating = 1 | 2 | 3 | 4 | 5;

export interface CandidateCardProps {
  id?: string;
  name: string;
  rating: CandidateRating;
  index: number;
  columnIndex: number;
  moveCandidate?: (
    dragIndex: number,
    fromColumn: number,
    toColumn: number
  ) => void;
}

// Item types for drag and drop
export const ItemTypes = {
  CANDIDATE: "candidate",
};

const CandidateCard: React.FC<CandidateCardProps> = ({
  name,
  rating,
  index,
  columnIndex,
  moveCandidate,
}) => {
  // Common styles for rating circles
  const circleStyle = {
    marginRight: "2px",
  };

  const ref = useRef<HTMLDivElement>(null);

  // Set up the drag
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CANDIDATE,
    item: {
      type: ItemTypes.CANDIDATE,
      index,
      columnIndex,
      name,
      rating,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Generate rating circles using emojis
  const renderRating = () => {
    const circles = [];
    const maxRating = 5;

    // Fill green circles for the rating
    for (let i = 0; i < rating; i++) {
      circles.push(
        <span key={`filled-${i}`} className="text-success" style={circleStyle}>
          🟢
        </span>
      );
    }

    // Add empty circles for the remaining slots
    for (let i = rating; i < maxRating; i++) {
      circles.push(
        <span key={`empty-${i}`} className="text-muted" style={circleStyle}>
          ⚪
        </span>
      );
    }

    return <div className="d-flex">{circles}</div>;
  };

  // Connect drag ref to the card
  drag(ref);

  return (
    <Card
      ref={ref}
      className={`mb-2 shadow-sm border-0 cursor-pointer candidate-card ${
        isDragging ? "opacity-50" : ""
      }`}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}
    >
      <Card.Body className="p-3">
        <div className="d-flex flex-column">
          <div className="fw-bold mb-1">{name}</div>
          {renderRating()}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CandidateCard;
