import { Component, For, createEffect, createSignal } from "solid-js";
import Fingerboard, { Cell } from "./Fingerboard";
import styles from "./App.module.css";

const CELL_MAP = new Map<string, Cell>(
  Object.entries({
    _: { type: "empty" },
    " ": { type: "empty" },
    R: { type: "filled", color: "red" },
    P: { type: "filled", color: "pink" },
    G: { type: "filled", color: "green" },
    B: { type: "filled", color: "blue" },
  }),
);

const parseCell = (cell: string): Cell => {
  return CELL_MAP.get(cell) ?? { type: "filled", color: "grey" };
};

const parseRow = (row: string): Cell[] => {
  return Array.from(row).map(parseCell);
};

const parseShape = (shape: string): Cell[][] => {
  return shape.split("\n").map(parseRow);
};

const ITEMS = [
  {
    title: "C",
    shape: parseShape(`\
GG_G_g_gP_g_GG_G
GR_G_gg_g_g_GP_G
G_G_gP_g_gg_G_G_
G_GG_g_g_gP_G_GG
G_GR_g_gg_g_G_GP
GG_G_g_gP_g_GG_G
`),
  },
  {
    title: "A",
    shape: parseShape(`\
gg_G_G_gP_g_gg_g
gP_G_GG_g_g_gP_g
g_G_GR_g_gg_g_g_
g_GG_G_g_gP_g_gg
g_GR_G_gg_g_g_gP
gg_G_G_gP_g_gg_g
`),
  },
  {
    title: "G",
    shape: parseShape(`\
gg_g_G_GR_g_gg_g
gP_g_GG_G_g_gP_g
g_g_GR_G_gg_g_g_
g_gg_G_G_gP_g_gg
g_gP_G_GG_g_g_gP
gg_g_G_GR_g_gg_g
`),
  },
  {
    title: "E",
    shape: parseShape(`\
gg_g_g_GR_G_gg_g
gP_g_gg_G_G_gP_g
g_g_gP_G_GG_g_g_
g_gg_g_G_GR_g_gg
g_gP_g_GG_G_g_gP
gg_g_g_GR_G_gg_g
`),
  },
  {
    title: "D",
    shape: parseShape(`\
gg_g_g_gP_G_GG_g
gP_g_gg_g_G_GR_g
g_g_gP_g_GG_G_g_
g_gg_g_g_GR_G_gg
g_gP_g_gg_G_G_gP
gg_g_g_gP_G_Gg_g
`),
  },
] as const;

const App: Component = () => {
  const [tab, setTab] = createSignal("C");

  createEffect(() => {
    console.log(tab());
  });

  return (
    <>
      <h1>CAGED のイメージ</h1>

      {/* Tab links */}
      <div class={styles.tab}>
        <For each={ITEMS}>
          {(item) => (
            <button
              classList={{
                [styles.active]: tab() === item.title,
              }}
              onClick={() => {
                setTab(item.title);
              }}
            >
              {item.title}
            </button>
          )}
        </For>
      </div>

      {/* Tab contents */}
      <For each={ITEMS}>
        {(item) => (
          <div
            classList={{
              [styles.tabcontent]: true,
              [styles.none]: tab() !== item.title,
            }}
          >
            <Fingerboard shape={item.shape} />
          </div>
        )}
      </For>
    </>
  );
};

export default App;
