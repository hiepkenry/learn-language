import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

const links = [
  { id: 1, text: 'stats', path: '/', icon: <IoBarChartSharp /> },
  { id: 2, text: 'N1', path: 'jlpt-N1', icon: <MdQueryStats /> },
  { id: 3, text: 'N2', path: 'jlpt-N2', icon: <FaWpforms /> },
  { id: 4, text: 'add Vocab', path: 'add-vocab', icon: <FaWpforms /> },
  { id: 5, text: 'All Vocab', path: 'all-vocab', icon: <FaWpforms /> },
  { id: 6, text: 'profile', path: 'profile', icon: <ImProfile /> },
];

export default links;
