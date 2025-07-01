
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { MapPin, Clock, Star, Train, TreePine, Building, Users, ShoppingBag } from 'lucide-react';
import { Store, CrowdnessLevel, LocationType } from '@/types/store';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface StoreDetailModalProps {
  store: Store | null;
  isOpen: boolean;
  onClose: () => void;
  onReportCrowdness: (store: Store) => void;
}

const StoreDetailModal: React.FC<StoreDetailModalProps> = ({ 
  store, 
  isOpen, 
  onClose, 
  onReportCrowdness 
}) => {
  if (!store) return null;

  const getCrowdnessColor = (level: CrowdnessLevel) => {
    switch (level) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-orange-500';
      case 'high': return 'bg-red-500';
    }
  };

  const getCrowdnessText = (level: CrowdnessLevel) => {
    switch (level) {
      case 'low': return '널널 😊';
      case 'medium': return '보통 😐';
      case 'high': return '혼잡 😰';
    }
  };

  const getLocationIcon = (locationType: LocationType) => {
    switch (locationType) {
      case 'store': return <ShoppingBag className="w-6 h-6" />;
      case 'street': 
      case 'plaza': return <Users className="w-6 h-6" />;
      case 'park': return <TreePine className="w-6 h-6" />;
      case 'station': return <Train className="w-6 h-6" />;
      case 'mall': return <Building className="w-6 h-6" />;
      default: return <MapPin className="w-6 h-6" />;
    }
  };

  const getLocationTypeText = (locationType: LocationType) => {
    switch (locationType) {
      case 'store': return '가게';
      case 'street': return '거리';
      case 'park': return '공원';
      case 'station': return '역';
      case 'mall': return '쇼핑몰';
      case 'plaza': return '광장';
      case 'attraction': return '명소';
      default: return '장소';
    }
  };

  const chartData = store.hourlyData?.map(data => ({
    hour: `${data.hour}시`,
    crowdness: data.crowdnessValue,
    level: data.crowdnessLevel
  })) || [];

  const chartConfig = {
    crowdness: {
      label: "혼잡도",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getLocationIcon(store.locationType)}
              <span className="text-xl font-bold">{store.name}</span>
              <Badge variant="outline">{store.category}</Badge>
              <Badge variant="secondary">{getLocationTypeText(store.locationType)}</Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 기본 정보 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{store.distance}m</span>
                    </div>
                    {store.estimatedWaitTime && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>약 {store.estimatedWaitTime}분 대기</span>
                      </div>
                    )}
                    {store.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{store.rating}</span>
                      </div>
                    )}
                    {store.priceRange && (
                      <span className="font-medium">{store.priceRange}</span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-2">{store.address}</p>
                  {store.description && (
                    <p className="text-sm text-blue-600 mb-4">{store.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getCrowdnessColor(store.crowdnessLevel)}`}>
                        {getCrowdnessText(store.crowdnessLevel)}
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(store.lastUpdated, { addSuffix: true, locale: ko })} 업데이트
                      </span>
                    </div>
                    
                    <Button 
                      onClick={() => onReportCrowdness(store)}
                      variant="outline"
                      size="sm"
                    >
                      제보하기
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 시간대별 혼잡도 그래프 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">시간대별 혼잡도</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer config={chartConfig}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="crowdnessGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="hour" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      domain={[0, 100]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent 
                        formatter={(value, name) => {
                          const numValue = typeof value === 'number' ? value : 0;
                          return [
                            `${numValue}% (${numValue < 33 ? '널널' : numValue < 67 ? '보통' : '혼잡'})`,
                            '혼잡도'
                          ];
                        }}
                      />}
                    />
                    <Area
                      type="monotone"
                      dataKey="crowdness"
                      stroke="#3b82f6"
                      fill="url(#crowdnessGradient)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
              
              {/* 범례 */}
              <div className="flex justify-center space-x-6 mt-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>널널 (0-33%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>보통 (34-66%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>혼잡 (67-100%)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoreDetailModal;
