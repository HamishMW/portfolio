import styles from './table.module.css';

export const Table = ({ children }) => <table className={styles.table}>{children}</table>;

export const TableRow = ({ children }) => <tr className={styles.row}>{children}</tr>;

export const TableHead = ({ children }) => (
  <thead className={styles.head}>{children}</thead>
);

export const TableBody = ({ children }) => (
  <tbody className={styles.body}>{children}</tbody>
);

export const TableHeadCell = ({ children }) => (
  <th className={styles.headCell}>{children}</th>
);

export const TableCell = ({ children }) => <td className={styles.cell}>{children}</td>;
