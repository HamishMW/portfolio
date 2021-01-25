import './index.css';

export const Table = ({ children }) => (
  <table className="table">
    <tbody className="table__body">{children}</tbody>
  </table>
);

export const TableRow = ({ children }) => <tr className="table__row">{children}</tr>;

export const TableCell = ({ children }) => <td className="table__cell">{children}</td>;
