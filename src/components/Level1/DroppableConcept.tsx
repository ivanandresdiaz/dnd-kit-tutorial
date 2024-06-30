import { useDroppable } from "@dnd-kit/core";
import { Center, Paper, ScrollArea, Text } from "@mantine/core";
import React from "react";
import { ParrafoArrastrar } from ".";

type Props = {
  item: ParrafoArrastrar;
  index: number;
  evaluar: boolean;
};

const DroppableConcept = (props: Props) => {
  const { item, index, evaluar } = props;
  const { setNodeRef, isOver } = useDroppable({
    id: `droppable-${index}`, // Agregamos el prefijo porque el id debe ser único
    // data: {
    //   title: item.title, // Agregamos el título para evaluar si es correcto
    // },
  });
  return (
    <div>
      <Paper
        p="md"
        withBorder
        style={{
          height: 180,
          width: 220,
        }}
      >
        <div
          ref={setNodeRef}
          style={{
            width: "100%",
            height: 100,
            borderRadius: "20px",
            border: "5px dashed #dddddd",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isOver ? "#dcdcfc" : "#efeff7",
          }}
        >
          {item.title_assigned ? (
            <div>
              <Center>
                <Text
                  fw={800}
                  c={
                    !evaluar
                      ? "gray"
                      : item.title_assigned.id === item.id
                      ? "green"
                      : "red"
                  }
                >
                  {item.title_assigned.title}
                </Text>
              </Center>
            </div>
          ) : (
            <Text color="gray">Arrastre concepto</Text>
          )}
        </div>
        <ScrollArea h={60}>
          <Text fz="xs">{item.parrafo}</Text>
        </ScrollArea>
      </Paper>
    </div>
  );
};

export default DroppableConcept;
