import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
import KanbanColumn from "./KanbanColumn";
import { CandidateCardProps } from "./CandidateCard";

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
  const position =
    mockData[positionKey as keyof typeof mockData] ||
    mockData["Senior Backend Engineer"];

  return (
    <Container fluid className="py-4">
      <div className="d-flex align-items-center mb-4">
        <Button
          variant="link"
          className="p-0 me-2 text-dark"
          onClick={() => navigate("/positions")}
        >
          <ArrowLeft size={24} />
        </Button>
        <h2 className="mb-0">{position.title}</h2>
      </div>

      <Row className="g-4">
        {position.columns.map((column, index) => (
          <Col key={index} xs={12} md={6} lg={3}>
            <KanbanColumn
              title={column.title}
              candidates={column.candidates as CandidateCardProps[]}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PositionDetails;
