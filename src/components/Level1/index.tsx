"use client";
import {
  Button,
  Center,
  Grid,
  Modal,
  Paper,
  ScrollArea,
  Space,
  Text,
  Title,
} from "@mantine/core";
import React, { useState } from "react";

import { closestCenter, DndContext, DragOverlay } from "@dnd-kit/core";
import DraggableConcept from "./DraggableConcept";
import DroppableConcept from "./DroppableConcept";
// import { slugify } from "@/features/comunica/utils";
import { IconMoodHappy, IconRefresh } from "@tabler/icons-react";

// import { TypingEffect } from "./../TextAnimation";
// import { sonidos } from "@/utils/constantes";
import { useDisclosure } from "@mantine/hooks";

const sonidoExito = "";

export type Item_draggable = {
  id: number;
  parrafo: string;
  title: string;
};

export type ParrafoArrastrar = {
  id: number;
  title: string;
  parrafo: string;
  title_assigned: null | Item_draggable;
};

// Pasos para crear Juego
// 1. Crear los conceptos
// 2. Crear los enunciados
// 3. Asignar los conceptos a los enunciados
// 4. Evaluar si los conceptos han sido asignados correctamente

const JuegoArrastrarConceptos = () => {
  const [currentConcept, setCurrentConcept] = useState<null | Item_draggable>(
    null
  );
  // const [activeId, setActiveId}] = useState<null | string>(null);
  const [evaluar, setEvaluar] = useState<boolean>(false);
  const conceptos: Item_draggable[] = [
    {
      id: 0,
      title: "Concepto 1",
      parrafo:
        "Parrafo 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      id: 1,
      title: "Concepto 2",
      parrafo:
        "Parrafo 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      id: 2,
      title: "Concepto 3",
      parrafo:
        "Parrafo 3 Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      id: 3,
      title: "Concepto 4",
      parrafo:
        "Parrafo 4 Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      id: 4,
      title: "Concepto 5",
      parrafo:
        "Parrafo 5 Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      id: 5,
      title: "Concepto 6",
      parrafo:
        "Parrafo 6 Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      id: 6,
      title: "Concepto 7",
      parrafo:
        "Parrafo 7 Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      id: 7,
      title: "Concepto 8",
      parrafo:
        "Parrafo 8 Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      id: 8,
      title: "Concepto 9",
      parrafo:
        "Parrafo 9 Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      id: 9,
      title: "Concepto 10",
      parrafo:
        "Parrafo 10 Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
  ];

  // Estados globales del juego
  // Titulos de los conceptos
  const [titles, setTitles] = useState<Item_draggable[]>(() => {
    return conceptos;
  });
  // Parrafos a los que se les asignaran los conceptos
  const [parrafos, setParrafos] = useState<ParrafoArrastrar[]>(() => {
    return conceptos
      .map((c) => ({ ...c, title_assigned: null }))
      .sort(() => Math.random() - 0.5);
  });

  const onDragStart = (event: any) => {
    // Inicia el Arrastrar
    const { active } = event;
    if (currentConcept === null) {
      const { id } = active;
      // Recordatorio: Como no podemos utilizar un mismo id. le quitamos el prefijo para obtener el id del concepto
      const idDraggable = id.split("draggable-title-")[1];
      const concept = conceptos.find((item) => item.id === +idDraggable);
      if (!concept) {
        alert("Concepto no encontrado");
        return;
      }
      // Tenemos la información
      setCurrentConcept(concept); // Lo utilizamos en el Overlay, y tener una experiencia bonita.
    }
  };
  const onDragMove = (event: any) => {
    console.log("drag move", event);
  };
  const onDragOver = (event: any) => {
    console.log("drag over", event);
  };
  const onDragEnd = (event: any) => {
    const isDropped = event.over?.id;
    if (!isDropped) return; // Si no se ha soltado en ningun lugar, no hay que actualizar nada.
    const idDroppable = isDropped.split("droppable-")[1]; // Obtenemos el id del parrafo para ver si ya tiene un concepto asignado
    const parrafoInfo = parrafos.find((c) => c.id === +idDroppable);
    if (!parrafoInfo) {
      alert("No se ha asignado un concepto a este enunciado");
      return true;
    }
    const isAlreadyDropped = parrafoInfo.title_assigned;
    if (isAlreadyDropped) {
      alert("Ya se ha asignado un concepto a este enunciado");
      return true;
    }
    const idDraggable = event.active.id;
    if (!idDraggable) return;
    const idTitle = idDraggable.split("draggable-title-")[1]; // i de del titulo que se esta arrastrandoS
    const title = titles.filter((item) => item.id === +idTitle)[0]; // Obtenemos el titulo que se esta arrastrando
    const newTitles = titles.filter((item) => item.id !== title.id); // Eliminamos el titulo que se esta arrastrando
    setTitles(newTitles); // Actualizamos el estado los titulos
    const newParrafos = parrafos.map((item, index) => {
      if (index === +idDroppable) {
        return { ...item, title_assigned: title };
      }
      return item;
    }); // Agregamos el titulo al parrafo
    setParrafos(newParrafos); // Actualizamos el estado de los parrafos

    // Evaluamos si todos los conceptos han sido asignados
    const isAllAssigned = newParrafos.every(
      (item) => item.title_assigned !== null
    );
    if (isAllAssigned) {
      // evaluar que este correctos los conceptos asignados
      const isAllCorrect = newParrafos.every(
        (item) => item.title_assigned?.id === item.id
      );
      setEvaluar(true);
      if (isAllCorrect) {
        alert("Todos los conceptos han sido asignados correctamente");
        // const audio = new Audio(sonidoExito);
        // audio.play();
      } else {
        // const audio = new Audio(sonidos.fail);
        // audio.play();
        alert("Algunos conceptos no han sido asignados correctamente");
        // toast.error("Algunos conceptos no han sido asignados correctamente");
      }
      return true;
    }
    setCurrentConcept(null); // Limpiamos el concepto actual, para el proximo overlay
  };
  const onDragCancel = (event: any) => {
    console.log("drag cancel", event);
  };
  const handleReiniciar = () => {
    setTitles(conceptos);
    setParrafos(
      conceptos
        .map((c) => ({ ...c, title_assigned: null }))
        .sort(() => Math.random() - 0.5)
    );
    setEvaluar(false);
  };

  return (
    <Paper
      style={{
        // backgroundColor: "#e9e7e7",
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 10,
          width: "100%",
          zIndex: 100,
        }}
      >
        <Center>
          <Button
            color="blue"
            leftSection={<IconRefresh />}
            size="xs"
            onClick={handleReiniciar}
          >
            Reiniciar
          </Button>
        </Center>
      </div>
      <DndContext
        autoScroll={true}
        collisionDetection={closestCenter}
        onDragCancel={onDragCancel}
        onDragEnd={onDragEnd}
        onDragMove={onDragMove}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
      >
        <Grid>
          <Grid.Col span={3}>
            <Paper p="md">
              <Paper
                p="xs"
                withBorder
                style={{
                  backgroundColor: "#efeff7",
                }}
              >
                <ScrollArea h={"70vh"} type="always" p="md">
                  {titles.map((item, index) => (
                    <div key={index + "_animation"}>
                      <DraggableConcept item={item} index={index} />
                      <Space h={10} />
                    </div>
                  ))}
                </ScrollArea>
              </Paper>
            </Paper>
          </Grid.Col>
          <Grid.Col
            span={9}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingRight: 20,
              paddingTop: 20,
            }}
          >
            <ScrollArea h={"70vh"} w={"100%"}>
              <Grid>
                {parrafos.map((item, index) => (
                  <Grid.Col span={4} key={index + "_animation"}>
                    <DroppableConcept
                      item={item}
                      index={index}
                      evaluar={evaluar}
                    />
                  </Grid.Col>
                ))}
              </Grid>
            </ScrollArea>
          </Grid.Col>
        </Grid>
        <DragOverlay adjustScale={false}>
          {currentConcept && (
            <div>
              <DraggableConcept
                item={currentConcept}
                index={1000}
                isDragOverlay={true}
              />
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </Paper>
  );
};

export default JuegoArrastrarConceptos;
