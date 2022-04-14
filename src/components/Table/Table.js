import styles from './Table.module.css';

export const Table = ({ children }) => (
  <table className={styles.table}>
    <tbody className={styles.body}>{children}</tbody>
  </table>
);

export const TableRow = ({ children }) => <tr className={styles.row}>{children}</tr>;

export const TableCell = ({ children }) => <td className={styles.cell}>{children}</td>;
