import React from "react";
import { Card, Badge } from "react-bootstrap";
import CandidateCard, { CandidateCardProps } from "./CandidateCard";

interface KanbanColumnProps {
  title: string;
  candidates: CandidateCardProps[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, candidates }) => {
  // Define colors based on the column title
  const getHeaderStyle = (title: string) => {
    switch (title) {
      case "Llamada telefónica":
        return { bgColor: "bg-light-primary", textColor: "primary" };
      case "Entrevista técnica":
        return { bgColor: "bg-light-info", textColor: "info" };
      case "Entrevista cultural":
        return { bgColor: "bg-light-warning", textColor: "warning" };
      case "Entrevista manager":
        return { bgColor: "bg-light-success", textColor: "success" };
      default:
        return { bgColor: "bg-light", textColor: "secondary" };
    }
  };

  const headerStyle = getHeaderStyle(title);

  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Header className={`${headerStyle.bgColor}`}>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className={`mb-0 text-${headerStyle.textColor}`}>{title}</h5>
          <Badge bg={headerStyle.textColor} pill>
            {candidates.length}
          </Badge>
        </div>
      </Card.Header>
      <Card.Body className="p-2 bg-light-subtle">
        {candidates.length === 0 ? (
          <div className="text-muted text-center py-4 border border-dashed rounded my-2">
            <small>No hay candidatos</small>
          </div>
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
