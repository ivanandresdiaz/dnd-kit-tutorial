import { useDraggable } from "@dnd-kit/core";
import { Center, Paper, Text } from "@mantine/core";
import React from "react";
import { Item_draggable } from ".";
type Props = {
  item: Item_draggable;
  index: number;
  isDragOverlay?: boolean;
};

const DraggableConcept = (props: Props) => {
  const { item, index, isDragOverlay } = props;
  const {
    active,
    isDragging,
    attributes,
    listeners,
    over,
    setNodeRef,
    // setActivatorNodeRef,
  } = useDraggable({
    id: `draggable-title-${item.id}`, // Agregamos el prefijo porque el id debe ser único
  });
  if (isDragOverlay) {
    return (
      <Paper key={index} withBorder>
        <Center>
          <Text fw={600} fz="md">
            Dragging, {item.title}
          </Text>
        </Center>
      </Paper>
    );
  }
  return (
    <Paper
      key={index}
      withBorder
      ref={setNodeRef}
      {...attributes}
      style={{
        ...(isDragging
          ? { opacity: 0.5, cursor: "grab" }
          : { opacity: 1, cursor: "grab" }),
        cursor: "grab",
      }}
      {...listeners}
    >
      <Center>
        <Text fw={600} fz="md">
          {item.title}
        </Text>
      </Center>
    </Paper>
  );
};

export default DraggableConcept;
