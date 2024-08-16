import React from 'react';
import { Pagination } from 'react-bootstrap';

interface PaginationComponentProps {
  total: number;
  limit: number;
  page: number;
  handlePageChange: (newPage: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  total,
  limit,
  page,
  handlePageChange,
}) => {
  return (
    <Pagination className="mt-3">
      {[...Array(Math.ceil(total / limit)).keys()].map(number => (
        <Pagination.Item
          key={number + 1}
          active={number + 1 === page}
          onClick={() => handlePageChange(number + 1)}
        >
          {number + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default PaginationComponent;
