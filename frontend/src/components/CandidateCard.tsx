import React from "react";
import { Card } from "react-bootstrap";

export type CandidateRating = 1 | 2 | 3 | 4 | 5;

export interface CandidateCardProps {
  name: string;
  rating: CandidateRating;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ name, rating }) => {
  // Common styles for rating circles
  const circleStyle = {
    marginRight: "2px",
  };

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

  return (
    <Card className="mb-2 shadow-sm border-0 cursor-pointer candidate-card">
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
