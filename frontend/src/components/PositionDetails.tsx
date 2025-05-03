import React, { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, PersonPlus } from "react-bootstrap-icons";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import KanbanColumn from "./KanbanColumn";
import { CandidateCardProps } from "./CandidateCard";
import "../styles/kanban.css";

// Temporary mock data - will be replaced with API data later
const mockData = {
  "Senior Backend Engineer": {
    title: "Senior Backend Engineer Position",
    columns: [
      {
        title: "Llamada telefónica",
        candidates: [
          { name: "John Doe", rating: 3 },
          { name: "Alice Johnson", rating: 4 },
        ],
      },
      {
        title: "Entrevista técnica",
        candidates: [{ name: "Jane Smith", rating: 3 }],
      },
      {
        title: "Entrevista cultural",
        candidates: [{ name: "Bob Brown", rating: 2 }],
      },
      {
        title: "Entrevista manager",
        candidates: [{ name: "Eva White", rating: 5 }],
      },
    ],
  },
  "Junior Android Engineer": {
    title: "Junior Android Engineer Position",
    columns: [
      { title: "Llamada telefónica", candidates: [] },
      { title: "Entrevista técnica", candidates: [] },
      { title: "Entrevista cultural", candidates: [] },
      { title: "Entrevista manager", candidates: [] },
    ],
  },
  "Product Manager": {
    title: "Product Manager Position",
    columns: [
      { title: "Llamada telefónica", candidates: [] },
      { title: "Entrevista técnica", candidates: [] },
      { title: "Entrevista cultural", candidates: [] },
      { title: "Entrevista manager", candidates: [] },
    ],
  },
};

const PositionDetails: React.FC = () => {
  const navigate = useNavigate();
  const { positionId } = useParams<{ positionId: string }>();

  // Default to "Senior Backend Engineer" if position not found
  const positionKey = positionId || "Senior Backend Engineer";
  const initialPositionData =
    mockData[positionKey as keyof typeof mockData] ||
    mockData["Senior Backend Engineer"];

  // State to manage the position data
  const [positionData, setPositionData] = useState(initialPositionData);

  // Handle moving candidates between columns
  const handleMoveCandidate = (
    candidateIndex: number,
    fromColumn: number,
    toColumn: number
  ) => {
    setPositionData((prevData) => {
      // Create a new copy of the data
      const newData = { ...prevData };
      const newColumns = [...newData.columns];

      // Get the candidate to move
      const candidate = {
        ...newColumns[fromColumn].candidates[candidateIndex],
      };

      // Remove candidate from source column
      newColumns[fromColumn] = {
        ...newColumns[fromColumn],
        candidates: newColumns[fromColumn].candidates.filter(
          (_, index) => index !== candidateIndex
        ),
      };

      // Add candidate to destination column
      newColumns[toColumn] = {
        ...newColumns[toColumn],
        candidates: [...newColumns[toColumn].candidates, candidate],
      };

      newData.columns = newColumns;
      return newData;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-light min-vh-100">
        <Container fluid className="py-4">
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <Button
                    variant="link"
                    className="p-0 me-3 text-dark"
                    onClick={() => navigate("/positions")}
                  >
                    <ArrowLeft size={24} />
                  </Button>
                  <h2 className="mb-0">{positionData.title}</h2>
                </div>
                <Button variant="primary" className="d-flex align-items-center">
                  <PersonPlus className="me-2" /> Añadir candidato
                </Button>
              </div>
            </Card.Body>
          </Card>

          <div className="bg-white p-3 rounded shadow-sm mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Progreso de candidatos</h5>
              <div className="small text-muted">
                <span className="fw-bold">
                  {getTotalCandidates(positionData)}
                </span>{" "}
                candidatos en proceso
              </div>
            </div>
            <Row className="g-4 kanban-board">
              {positionData.columns.map((column, columnIndex) => (
                <Col key={columnIndex} xs={12} md={6} lg={3}>
                  <KanbanColumn
                    title={column.title}
                    candidates={column.candidates as CandidateCardProps[]}
                    columnIndex={columnIndex}
                    onMoveCandidate={handleMoveCandidate}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </div>
    </DndProvider>
  );
};

// Helper function to count total candidates
const getTotalCandidates = (position: any): number => {
  return position.columns.reduce(
    (total: number, column: any) => total + column.candidates.length,
    0
  );
};

export default PositionDetails;
