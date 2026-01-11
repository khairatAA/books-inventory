import { Skeleton, Text, Button, Table } from "@chakra-ui/react";

interface TableStateProps {
  colCount?: number;
  onRetry?: () => void;
  message?: string;
  rowCount?: number;
}

// Skeleton rows for loading
export const TableSkeleton = ({
  colCount = 3,
  rowCount = 5,
}: TableStateProps) => {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIdx) => (
        <Table.Row key={rowIdx}>
          {Array.from({ length: colCount }).map((_, colIdx) => (
            <Table.Cell key={colIdx} padding={2}>
              <Skeleton height="20px" />
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </>
  );
};

// Error row
export const TableError = ({
  colCount = 3,
  message = "Failed to load data.",
  onRetry,
}: TableStateProps) => {
  return (
    <Table.Row>
      <Table.Cell colSpan={colCount} textAlign="center" padding={2}>
        <Text color="gray.600" mb={2}>
          {message}
        </Text>
        {onRetry && (
          <Button
            size="sm"
            variant={"outline"}
            onClick={onRetry}
            paddingInline={3}
          >
            Retry
          </Button>
        )}
      </Table.Cell>
    </Table.Row>
  );
};

// Empty row
export const TableEmpty = ({
  colCount = 3,
  message = "No data found.",
}: TableStateProps) => {
  return (
    <Table.Row>
      <Table.Cell colSpan={colCount} textAlign="center" padding={2}>
        <Text color="gray.500">{message}</Text>
      </Table.Cell>
    </Table.Row>
  );
};
