import { Component, For } from "solid-js";
import styles from "./Fingerboard.module.css";

export type Cell = { type: "empty" } | { type: "filled"; color?: string };

const Cell: Component<{ cell: Cell }> = (props) => {
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
      }}
    />
  );
};

const Fingerboard: Component<{ shape: Cell[][] }> = (props) => {
  return (
    <table>
      <tbody>
        <For each={props.shape}>
          {(row) => (
            <tr>
              <For each={row}>
                {(cell) => (
                  <td>
                    <Cell cell={cell} />
                  </td>
                )}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};

export default Fingerboard;
