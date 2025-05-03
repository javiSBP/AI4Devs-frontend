import React from "react";
import { Card } from "react-bootstrap";
import CandidateCard, { CandidateCardProps } from "./CandidateCard";

interface KanbanColumnProps {
  title: string;
  candidates: CandidateCardProps[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, candidates }) => {
  return (
    <Card className="h-100">
      <Card.Header className="bg-light">
        <h5 className="mb-0">{title}</h5>
      </Card.Header>
      <Card.Body className="p-2">
        {candidates.length === 0 ? (
          <div className="text-muted text-center my-4">No hay candidatos</div>
        ) : (
          candidates.map((candidate, index) => (
            <CandidateCard
              key={index}
              name={candidate.name}
              rating={candidate.rating}
            />
          ))
        )}
      </Card.Body>
    </Card>
  );
};

export default KanbanColumn;
