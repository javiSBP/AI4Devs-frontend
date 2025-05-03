import React, { createContext, useState, useContext, ReactNode } from "react";
import { CandidateCardProps } from "../components/CandidateCard";

interface PositionData {
  title: string;
  columns: {
    title: string;
    candidates: CandidateCardProps[];
  }[];
}

interface DragAndDropContextType {
  positionData: PositionData;
  setPositionData: React.Dispatch<React.SetStateAction<PositionData>>;
  moveCandidate: (
    candidateIndex: number,
    fromColumn: number,
    toColumn: number
  ) => void;
}

const DragAndDropContext = createContext<DragAndDropContextType | undefined>(
  undefined
);

export const useDragAndDrop = () => {
  const context = useContext(DragAndDropContext);
  if (!context) {
    throw new Error("useDragAndDrop must be used within a DragAndDropProvider");
  }
  return context;
};

interface DragAndDropProviderProps {
  children: ReactNode;
  initialData: PositionData;
}

export const DragAndDropProvider: React.FC<DragAndDropProviderProps> = ({
  children,
  initialData,
}) => {
  const [positionData, setPositionData] = useState<PositionData>(initialData);

  const moveCandidate = (
    candidateIndex: number,
    fromColumn: number,
    toColumn: number
  ) => {
    setPositionData((prevData) => {
      if (!prevData) return prevData;

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
    <DragAndDropContext.Provider
      value={{ positionData, setPositionData, moveCandidate }}
    >
      {children}
    </DragAndDropContext.Provider>
  );
};
