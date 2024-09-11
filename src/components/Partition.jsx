/* eslint-disable react/prop-types */
import { useRef } from 'react';
import '../App.css';

const Partition = ({ partition, onSplit, onRemove }) => {
  const partitionRef = useRef(null);

  const handleMouseDown = (e) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = partitionRef.current.offsetWidth;
    const startHeight = partitionRef.current.offsetHeight;

    const handleMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      const newHeight = startHeight + (e.clientY - startY);
      partitionRef.current.style.width = `${newWidth}px`;
      partitionRef.current.style.height = `${newHeight}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={partitionRef}
      className={`relative border border-gray-300 flex ${
        partition.direction === 'V' ? 'flex-row' : 'flex-col'
      }`}
      style={{ backgroundColor: partition.color, flexGrow: 1, position: 'relative' }}
    >
      {!partition.children.length ? (
        <>
          <div className="absolute top-2 left-2">
            <button
              className="px-2 py-1 bg-blue-500 text-white"
              onClick={() => onSplit(partition.id, 'H')}
            >
              H
            </button>
            <button
              className="px-2 py-1 bg-blue-500 text-white ml-2"
              onClick={() => onSplit(partition.id, 'V')}
            >
              V
            </button>
            <button
              className="px-2 py-1 bg-red-500 text-white ml-2"
              onClick={() => onRemove(partition.id)}
            >
              -
            </button>
          </div>
          <div
            className="absolute bottom-0 right-0 w-4 h-4 bg-gray-600 cursor-se-resize"
            onMouseDown={handleMouseDown}
          />
        </>
      ) : (
        partition.children.map((child) => (
          <Partition
            key={child.id}
            partition={child}
            onSplit={onSplit}
            onRemove={onRemove}
          />
        ))
      )}
    </div>
  );
};

export default Partition;
