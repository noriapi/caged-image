import { Component, Index, createEffect, createSignal, on } from "solid-js";
import styles from "./Fingerboard.module.css";

export type Cell = { type: "empty" } | { type: "filled"; color?: string };

const Cell: Component<{ cell: Cell; glowing?: boolean }> = (props) => {
  return (
    <div
      classList={{
        [styles.cell]: true,
        [styles.hidden]: props.cell.type === "empty",
        [styles.red]:
          props.cell.type === "filled" && props.cell.color === "red",
        [styles.pink]:
          props.cell.type === "filled" && props.cell.color === "pink",
        [styles.green]:
          props.cell.type === "filled" && props.cell.color === "green",
        [styles.blue]:
          props.cell.type === "filled" && props.cell.color === "blue",
        [styles.grey]:
          props.cell.type === "filled" &&
          (props.cell.color === "grey" || props.cell.color == null),
        [styles.glowing]: props.glowing,
      }}
    />
  );
};

const Fingerboard: Component<{ shape: Cell[][]; glowing?: boolean }> = (
  props,
) => {
  const [reset, setReset] = createSignal(false);

  createEffect(
    on(
      () => props.shape,
      () => {
        setReset(true);
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => setReset(false));
        });
      },
    ),
  );

  return (
    <table>
      <tbody>
        <Index each={props.shape}>
          {(row) => (
            <tr>
              <Index each={row()}>
                {(cell) => (
                  <td>
                    <Cell cell={cell()} glowing={props.glowing && !reset()} />
                  </td>
                )}
              </Index>
            </tr>
          )}
        </Index>
      </tbody>
    </table>
  );
};

export default Fingerboard;
