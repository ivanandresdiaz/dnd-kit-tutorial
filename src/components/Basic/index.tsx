import React, { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Button, Center, Grid, Paper } from "@mantine/core";

function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <Paper p="xl" ref={setNodeRef} style={style} withBorder>
      {props.children}
    </Paper>
  );
}

function Draggable(props: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });
  const style = transform
    ? {
        // transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <Button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </Button>
  );
}

function BasicDragDrop() {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = <Draggable>Drag me</Draggable>;
  function handleDragEnd(event: DragEndEvent) {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Grid>
        <Grid.Col span={3}>{!isDropped ? draggableMarkup : null}</Grid.Col>
        <Grid.Col span={9}>
          <Droppable>{isDropped ? draggableMarkup : "Drop here"}</Droppable>
        </Grid.Col>
      </Grid>
      <Center>
        <Button
          onClick={() => {
            setIsDropped(false);
          }}
        >
          Restart
        </Button>
      </Center>
    </DndContext>
  );
}

export default BasicDragDrop;
