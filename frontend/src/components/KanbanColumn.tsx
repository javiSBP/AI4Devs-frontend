import React, { useRef } from "react";
import { Card, Badge } from "react-bootstrap";
import CandidateCard, { CandidateCardProps, ItemTypes } from "./CandidateCard";
import { useDrop } from "react-dnd";

interface KanbanColumnProps {
  title: string;
  candidates: CandidateCardProps[];
  columnIndex: number;
  onMoveCandidate: (
    candidateIndex: number,
    fromColumn: number,
    toColumn: number
  ) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  candidates,
  columnIndex,
  onMoveCandidate,
}) => {
  const ref = useRef<HTMLDivElement>(null);

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

  // Set up drop handling
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.CANDIDATE,
    drop: (item: any) => {
      const dragIndex = item.index;
      const dragColumnIndex = item.columnIndex;

      // If candidate is already in this column or drop not allowed, do nothing
      if (dragColumnIndex === columnIndex) {
        return;
      }

      // Move the candidate to the new column
      onMoveCandidate(dragIndex, dragColumnIndex, columnIndex);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // Connect the drop ref
  drop(ref);

  // Calculate styles for drop target feedback
  const getDropStyle = () => {
    if (isOver && canDrop) {
      return "bg-light-success bg-opacity-25";
    } else if (canDrop) {
      return "bg-light-info bg-opacity-10";
    }
    return "";
  };

  return (
    <Card ref={ref} className={`h-100 shadow-sm border-0 ${getDropStyle()}`}>
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
            <small>Arrastre candidatos aquí</small>
          </div>
        ) : (
          candidates.map((candidate, index) => (
            <CandidateCard
              key={index}
              name={candidate.name}
              rating={candidate.rating}
              index={index}
              columnIndex={columnIndex}
              moveCandidate={onMoveCandidate}
            />
          ))
        )}
      </Card.Body>
    </Card>
  );
};

export default KanbanColumn;
