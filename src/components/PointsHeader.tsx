
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Gift, TrendingUp } from 'lucide-react';
import { UserPoints } from '@/types/reward';

interface PointsHeaderProps {
  userPoints: UserPoints;
  onOpenRewardStore: () => void;
}

const PointsHeader: React.FC<PointsHeaderProps> = ({ userPoints, onOpenRewardStore }) => {
  return (
    <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Star className="w-6 h-6 text-yellow-300 fill-current" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-bold">내 포인트</h3>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  오늘 +{userPoints.earnedToday}P
                </Badge>
              </div>
              <p className="text-2xl font-bold">{userPoints.totalPoints.toLocaleString()}P</p>
              <p className="text-sm opacity-90">혼잡도 제보로 포인트를 모아보세요!</p>
            </div>
          </div>
          
          <Button 
            onClick={onOpenRewardStore}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
          >
            <Gift className="w-4 h-4 mr-2" />
            리워드 상점
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PointsHeader;
