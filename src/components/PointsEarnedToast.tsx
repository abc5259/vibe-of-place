
import React from 'react';
import { Star, TrendingUp } from 'lucide-react';

interface PointsEarnedToastProps {
  points: number;
  reason: string;
}

const PointsEarnedToast: React.FC<PointsEarnedToastProps> = ({ points, reason }) => {
  return (
    <div className="flex items-center space-x-3 p-1">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full">
        <Star className="w-4 h-4 text-white fill-current" />
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-purple-600">+{points}P</span>
          <TrendingUp className="w-4 h-4 text-green-500" />
        </div>
        <p className="text-sm text-gray-600">{reason}</p>
      </div>
    </div>
  );
};

export default PointsEarnedToast;
