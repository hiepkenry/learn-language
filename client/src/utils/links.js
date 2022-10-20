import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

const links = [
  { id: 1, text: 'stats', path: '/', icon: <IoBarChartSharp /> },
  { id: 2, text: 'Từ Vựng', path: 'tu-vung', icon: <MdQueryStats /> },
  { id: 3, text: 'Ngữ pháp', path: 'ngu-phap', icon: <FaWpforms /> },
  { id: 4, text: 'Thêm Ngữ Pháp', path: 'add-grammar', icon: <FaWpforms /> },
  { id: 4, text: 'add Vocab', path: 'add-vocab', icon: <FaWpforms /> },
  { id: 5, text: 'All Vocab', path: 'all-vocab', icon: <FaWpforms /> },
  { id: 6, text: 'add Kanji', path: 'add-kanji', icon: <FaWpforms /> },
  { id: 7, text: 'All Kanji', path: 'all-kanji', icon: <FaWpforms /> },
  { id: 8, text: 'profile', path: 'profile', icon: <ImProfile /> },
];

export default links;
