import { FaVoteYea } from 'react-icons/fa';
import { MdProductionQuantityLimits } from 'react-icons/md';

export default function ProductStats() {
  const stats = [
    {
      title: 'Products Voted',
      count: 34,
      icon: <FaVoteYea className="text-green-500 text-3xl" />,
    },
    {
      title: 'Products Selected',
      count: 12,
      icon: <MdProductionQuantityLimits className="text-blue-500 text-3xl" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow rounded-2xl p-6 flex items-center space-x-4"
        >
          <div className="bg-gray-100 p-4 rounded-full">{item.icon}</div>
          <div>
            <h4 className="text-lg font-semibold text-gray-700">{item.title}</h4>
            <p className="text-2xl font-bold text-gray-900">{item.count}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
