import { Table, TableCell, TableRow } from 'components/Table';
import { StoryContainer } from '../../../.storybook/StoryContainer';
import { TableBody, TableHead, TableHeadCell } from './Table';

export default {
  title: 'Table',
};

export const Default = () => (
  <StoryContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell>Country</TableHeadCell>
          <TableHeadCell>Capital</TableHeadCell>
          <TableHeadCell>Population</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>USA</TableCell>
          <TableCell>Washington, D.C.</TableCell>
          <TableCell>309 million</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Sweden</TableCell>
          <TableCell>Stockholm</TableCell>
          <TableCell>9 million</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </StoryContainer>
);
