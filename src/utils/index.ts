import React from 'react';

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'COMPLETED':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return React.createElement('span', {
    className: `px-2 py-1 text-xs font-medium rounded-full ${getStatusStyles()}`
  }, status);
}