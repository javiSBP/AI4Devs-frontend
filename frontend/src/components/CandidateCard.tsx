import React from "react";
import { Card } from "react-bootstrap";

export type CandidateRating = 1 | 2 | 3 | 4 | 5;

export interface CandidateCardProps {
  name: string;
  rating: CandidateRating;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ name, rating }) => {
  // Generate rating circles
  const renderRating = () => {
    const circles = [];
    // Fill green circles for the rating
    for (let i = 0; i < rating; i++) {
      circles.push(
        <span
          key={`filled-${i}`}
          className="text-success"
          style={{ fontSize: "14px", marginRight: "2px" }}
        >
          ●
        </span>
      );
    }

    return <div>{circles}</div>;
  };

  return (
    <Card className="mb-2 shadow-sm">
      <Card.Body className="p-3">
        <div className="d-flex flex-column">
          <div className="fw-bold">{name}</div>
          {renderRating()}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CandidateCard;
