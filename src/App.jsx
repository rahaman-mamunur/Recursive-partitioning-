import { useState } from 'react';
import './App.css';
import Partition from './components/Partition';
import { getRandomColor } from './utils/colorUtils';

const App = () => {
  const [partitions, setPartitions] = useState([
    { id: 1, color: getRandomColor(), direction: '', children: [] },
  ]);

  const splitPartition = (id, direction) => {
    setPartitions((prevPartitions) => {
      const updatePartitions = (partitions) =>
        partitions.map((p) => {
          if (p.id === id) {
            return {
              ...p,
              direction,
              children: [
                { id: Date.now(), color: getRandomColor(), children: [] },
                { id: Date.now() + 1, color: p.color, children: [] },
              ],
            };
          }
          if (p.children.length) {
            return {
              ...p,
              children: updatePartitions(p.children),
            };
          }
          return p;
        });

      return updatePartitions(prevPartitions);
    });
  };

  const removePartition = (id) => {
    setPartitions((prevPartitions) => {
      const filterPartitions = (partitions) =>
        partitions
          .map((p) => ({
            ...p,
            children: filterPartitions(p.children),
          }))
          .filter((p) => p.id !== id);

      return filterPartitions(prevPartitions);
    });
  };

  return (
    <div className="h-screen w-screen flex">
      <div className="w-full h-full flex">
        {partitions.map((partition) => (
          <Partition
            key={partition.id}
            partition={partition}
            onSplit={splitPartition}
            onRemove={removePartition}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
