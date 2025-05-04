import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, PersonPlus } from "react-bootstrap-icons";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import KanbanColumn from "./KanbanColumn";
import { CandidateCardProps } from "./CandidateCard";
import {
  getInterviewFlow,
  getPositionCandidates,
} from "../services/positionService";
import "../styles/kanban.css";

// Interface for interview step data from the API
interface InterviewStep {
  id: number;
  interviewFlowId: number;
  interviewTypeId: number;
  name: string;
  orderIndex: number;
}

// Interface for the interview flow from the API
interface InterviewFlow {
  id: number;
  description: string;
  interviewSteps: InterviewStep[];
}

// Interface for the position data from the API
interface PositionData {
  positionName: string;
  interviewFlow: InterviewFlow;
}

// Interface for the complete API response
interface ApiResponse {
  interviewFlow: {
    positionName: string;
    interviewFlow: InterviewFlow;
  };
}

// Interface for candidate from API
interface Candidate {
  fullName: string;
  currentInterviewStep: string;
  averageScore: number;
}

// Interface for our processed position data for the kanban
interface KanbanPositionData {
  title: string;
  columns: {
    id: number;
    title: string;
    candidates: CandidateCardProps[];
  }[];
}

// Mapping between position titles and IDs - in real app this would come from the API
const POSITION_ID_MAP: Record<string, string> = {
  "Senior Backend Engineer": "1",
  "Junior Android Engineer": "2",
  "Product Manager": "3",
};

const PositionDetails: React.FC = () => {
  const navigate = useNavigate();
  const { positionId } = useParams<{ positionId: string }>();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [positionData, setPositionData] = useState<KanbanPositionData | null>(
    null
  );
  const [positionTitle, setPositionTitle] = useState<string>("");
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const fetchPositionData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use the position title to get a numeric ID or default to "1"
        // In a real app, you would use an API to convert titles to IDs or use IDs directly
        const numericId = positionId ? POSITION_ID_MAP[positionId] || "1" : "1";

        console.log(`Fetching interview flow for position ID: ${numericId}`);

        // Save the position title for display
        setPositionTitle(positionId || "Position");

        // Fetch both interview flow and candidates in parallel
        const [interviewFlowResponse, candidatesResponse] = await Promise.all([
          getInterviewFlow(numericId) as Promise<ApiResponse>,
          getPositionCandidates(numericId) as Promise<Candidate[]>,
        ]);

        console.log(
          "Raw API response data (interview flow):",
          JSON.stringify(interviewFlowResponse, null, 2)
        );

        console.log(
          "Raw API response data (candidates):",
          JSON.stringify(candidatesResponse, null, 2)
        );

        // Save candidates data
        setCandidates(candidatesResponse || []);

        // Handle case where API returns unexpected structure
        if (!interviewFlowResponse) {
          throw new Error("No data received from server");
        }

        // Access the nested structure from the response
        if (!interviewFlowResponse.interviewFlow) {
          console.warn(
            "API response missing interviewFlow property:",
            interviewFlowResponse
          );

          // Create a fallback interview flow with default columns
          const fallbackData: KanbanPositionData = {
            title: positionTitle || "Position Details",
            columns: [
              {
                id: 1,
                title: "Initial Screening",
                candidates: [],
              },
              {
                id: 2,
                title: "Technical Interview",
                candidates: [],
              },
              {
                id: 3,
                title: "Manager Interview",
                candidates: [],
              },
            ],
          };

          setPositionData(fallbackData);

          // Map candidates to their respective columns even with fallback data
          mapCandidatesToColumns(fallbackData, candidatesResponse || []);

          console.log(
            "Using fallback data due to missing interview flow:",
            fallbackData
          );
          return;
        }

        // Extract the nested data
        const { positionName, interviewFlow } =
          interviewFlowResponse.interviewFlow;

        if (
          !interviewFlow ||
          !interviewFlow.interviewSteps ||
          !Array.isArray(interviewFlow.interviewSteps)
        ) {
          console.warn(
            "API response missing or invalid interviewSteps:",
            interviewFlowResponse.interviewFlow
          );
          throw new Error("Invalid interview steps data received from server");
        }

        // Process the data into our kanban format
        const kanbanData: KanbanPositionData = {
          title: positionName || positionTitle,
          columns: interviewFlow.interviewSteps.map((step: InterviewStep) => {
            return {
              id: step.id,
              title: step.name,
              candidates: [],
            };
          }),
        };

        // Sort columns by orderIndex if needed
        kanbanData.columns.sort((a, b) => {
          const stepA = interviewFlow.interviewSteps.find(
            (s: InterviewStep) => s.id === a.id
          );
          const stepB = interviewFlow.interviewSteps.find(
            (s: InterviewStep) => s.id === b.id
          );
          return (stepA?.orderIndex || 0) - (stepB?.orderIndex || 0);
        });

        // Map candidates to columns based on currentInterviewStep
        mapCandidatesToColumns(kanbanData, candidatesResponse || []);

        setPositionData(kanbanData);
      } catch (err: any) {
        console.error("Error fetching position data:", err);
        setError(err.message || "Failed to load position data");
      } finally {
        setLoading(false);
      }
    };

    fetchPositionData();
  }, [positionId]);

  // Map candidates to their respective columns based on currentInterviewStep
  const mapCandidatesToColumns = (
    kanbanData: KanbanPositionData,
    candidatesList: Candidate[]
  ) => {
    // Create a column title to id mapping
    const columnMap = new Map(
      kanbanData.columns.map((column) => [column.title, column.id])
    );

    // Process each candidate
    candidatesList.forEach((candidate, index) => {
      // Find the column ID that matches the candidate's currentInterviewStep
      const columnId = findColumnIdByTitle(
        kanbanData.columns,
        candidate.currentInterviewStep
      );

      if (columnId !== null) {
        const columnIndex = kanbanData.columns.findIndex(
          (col) => col.id === columnId
        );

        if (columnIndex !== -1) {
          // Create a CandidateCardProps object from the candidate data
          const candidateCard: CandidateCardProps = {
            name: candidate.fullName,
            rating:
              candidate.averageScore >= 1 && candidate.averageScore <= 5
                ? (candidate.averageScore as 1 | 2 | 3 | 4 | 5)
                : 1,
            index: kanbanData.columns[columnIndex].candidates.length,
            columnIndex: columnId,
          };

          // Add candidate to appropriate column
          kanbanData.columns[columnIndex].candidates.push(candidateCard);
        }
      }
    });

    setPositionData({ ...kanbanData });
  };

  // Helper function to find column ID by title
  const findColumnIdByTitle = (
    columns: KanbanPositionData["columns"],
    title: string
  ): number | null => {
    const column = columns.find((col) => col.title === title);
    return column ? column.id : null;
  };

  // Handle moving candidates between columns
  const handleMoveCandidate = (
    candidateIndex: number,
    fromColumn: number,
    toColumn: number
  ) => {
    if (!positionData) return;

    setPositionData((prevData) => {
      if (!prevData) return prevData;

      // Create a new copy of the data
      const newData = { ...prevData };
      const newColumns = [...newData.columns];

      // Find the source and destination columns by their array indexes
      const sourceColumnIndex = newColumns.findIndex(
        (col) => col.id === fromColumn
      );
      const destColumnIndex = newColumns.findIndex(
        (col) => col.id === toColumn
      );

      if (sourceColumnIndex === -1 || destColumnIndex === -1) return prevData;

      // Get the candidate to move
      const candidate = {
        ...newColumns[sourceColumnIndex].candidates[candidateIndex],
      };

      // Remove candidate from source column
      newColumns[sourceColumnIndex] = {
        ...newColumns[sourceColumnIndex],
        candidates: newColumns[sourceColumnIndex].candidates.filter(
          (_, index) => index !== candidateIndex
        ),
      };

      // Add candidate to destination column
      newColumns[destColumnIndex] = {
        ...newColumns[destColumnIndex],
        candidates: [...newColumns[destColumnIndex].candidates, candidate],
      };

      newData.columns = newColumns;
      return newData;
    });
  };

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  // Show error state if there was a problem
  if (error || !positionData) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error || "No se pudo cargar la información de la posición"}</p>
          <div className="mt-2 mb-3">
            <small className="text-muted">
              Tip: Asegúrate que el backend esté funcionando en
              http://localhost:3010. Verifica que la ruta API sea correcta y que
              el ID de posición exista.
            </small>
          </div>
          <div className="mt-3">
            <Button
              variant="outline-danger"
              onClick={() => navigate("/positions")}
            >
              Volver a posiciones
            </Button>
            <Button
              variant="outline-primary"
              className="ms-2"
              onClick={() => window.location.reload()}
            >
              Reintentar
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

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
              {positionData.columns.map((column, index) => (
                <Col
                  key={column.id}
                  xs={12}
                  md={6}
                  lg={
                    positionData.columns.length > 3
                      ? 3
                      : 12 / positionData.columns.length
                  }
                >
                  <KanbanColumn
                    title={column.title}
                    candidates={column.candidates as CandidateCardProps[]}
                    columnIndex={column.id}
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
const getTotalCandidates = (position: KanbanPositionData): number => {
  return position.columns.reduce(
    (total: number, column: any) => total + column.candidates.length,
    0
  );
};

export default PositionDetails;
