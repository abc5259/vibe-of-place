
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Clock, Users } from 'lucide-react';
import StoreList from '@/components/StoreList';
import StoreMap from '@/components/StoreMap';
import StoreDetailModal from '@/components/StoreDetailModal';
import CrowdnessReportModal from '@/components/CrowdnessReportModal';
import PointsHeader from '@/components/PointsHeader';
import RewardStoreModal from '@/components/RewardStoreModal';
import PointsEarnedToast from '@/components/PointsEarnedToast';
import { Store, CrowdnessLevel } from '@/types/store';
import { UserPoints, RewardItem } from '@/types/reward';
import { dummyStores } from '@/data/dummyStores';
import { toast } from 'sonner';

const Index = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [stores, setStores] = useState<Store[]>(dummyStores);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isRewardStoreOpen, setIsRewardStoreOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  
  // Points system state
  const [userPoints, setUserPoints] = useState<UserPoints>({
    userId: 'user-1',
    totalPoints: 1250,
    earnedToday: 150,
    lastEarnedAt: new Date()
  });

  useEffect(() => {
    // 더미 위치 데이터 (서울 강남역 근처)
    setUserLocation({ lat: 37.4981, lng: 127.0276 });
    
    // 주기적으로 혼잡도 업데이트 시뮬레이션
    const interval = setInterval(() => {
      setStores(prevStores => 
        prevStores.map(store => ({
          ...store,
          crowdnessLevel: getRandomCrowdnessLevel(),
          lastUpdated: new Date()
        }))
      );
    }, 30000); // 30초마다 업데이트

    return () => clearInterval(interval);
  }, []);

  const getRandomCrowdnessLevel = (): CrowdnessLevel => {
    const levels: CrowdnessLevel[] = ['low', 'medium', 'high'];
    return levels[Math.floor(Math.random() * levels.length)];
  };

  const calculatePointsForReport = (level: CrowdnessLevel): number => {
    // 기본 포인트 + 혼잡도별 보너스
    const basePoints = 50;
    const bonusPoints = {
      'low': 10,
      'medium': 20,
      'high': 30 // 혼잡한 곳 제보 시 더 많은 포인트
    };
    return basePoints + bonusPoints[level];
  };

  const handleReportCrowdness = (storeId: string, level: CrowdnessLevel) => {
    const earnedPoints = calculatePointsForReport(level);
    
    // 포인트 업데이트
    setUserPoints(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + earnedPoints,
      earnedToday: prev.earnedToday + earnedPoints,
      lastEarnedAt: new Date()
    }));

    // 스토어 업데이트
    setStores(prevStores =>
      prevStores.map(store =>
        store.id === storeId
          ? { ...store, crowdnessLevel: level, lastUpdated: new Date() }
          : store
      )
    );

    setIsReportModalOpen(false);
    setSelectedStore(null);

    // 포인트 획득 토스트
    toast.custom(() => (
      <PointsEarnedToast 
        points={earnedPoints} 
        reason="혼잡도 제보 완료!" 
      />
    ), {
      duration: 3000,
    });
  };

  const handleRewardPurchase = (item: RewardItem) => {
    if (userPoints.totalPoints >= item.pointsCost) {
      setUserPoints(prev => ({
        ...prev,
        totalPoints: prev.totalPoints - item.pointsCost
      }));
      
      toast.success(`${item.name} 교환이 완료되었습니다! 🎉`);
      setIsRewardStoreOpen(false);
    } else {
      toast.error('포인트가 부족합니다.');
    }
  };

  const openReportModal = (store: Store) => {
    setSelectedStore(store);
    setIsReportModalOpen(true);
  };

  const openDetailModal = (store: Store) => {
    setSelectedStore(store);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">실시간 혼잡도</h1>
                <p className="text-sm text-gray-600">주변 가게의 현재 상황을 확인하세요</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                목록
              </Button>
              <Button 
                variant={viewMode === 'map' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('map')}
              >
                지도
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Points Header */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <PointsHeader 
          userPoints={userPoints}
          onOpenRewardStore={() => setIsRewardStoreOpen(true)}
        />
      </div>

      {/* Current Location */}
      <div className="max-w-6xl mx-auto px-4 py-2">
        <Card className="bg-gradient-to-r from-blue-500 to-green-500 text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Navigation className="w-5 h-5" />
              <div>
                <p className="font-medium">현재 위치</p>
                <p className="text-sm opacity-90">서울특별시 강남구 강남역 근처</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-4 pb-6">
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {stores.filter(s => s.crowdnessLevel === 'low').length}
              </div>
              <div className="text-sm text-gray-600">널널한 곳</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">
                {stores.filter(s => s.crowdnessLevel === 'medium').length}
              </div>
              <div className="text-sm text-gray-600">보통인 곳</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">
                {stores.filter(s => s.crowdnessLevel === 'high').length}
              </div>
              <div className="text-sm text-gray-600">혼잡한 곳</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        {viewMode === 'list' ? (
          <StoreList 
            stores={stores} 
            onReportCrowdness={openReportModal}
            onStoreClick={openDetailModal}
          />
        ) : (
          <StoreMap 
            stores={stores} 
            userLocation={userLocation}
            onStoreSelect={openReportModal}
            onStoreClick={openDetailModal}
          />
        )}
      </div>

      {/* Store Detail Modal */}
      <StoreDetailModal
        store={selectedStore}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedStore(null);
        }}
        onReportCrowdness={openReportModal}
      />

      {/* Report Modal */}
      <CrowdnessReportModal
        isOpen={isReportModalOpen}
        onClose={() => {
          setIsReportModalOpen(false);
          setSelectedStore(null);
        }}
        store={selectedStore}
        onReport={handleReportCrowdness}
      />

      {/* Reward Store Modal */}
      <RewardStoreModal
        isOpen={isRewardStoreOpen}
        onClose={() => setIsRewardStoreOpen(false)}
        userPoints={userPoints}
        onPurchase={handleRewardPurchase}
      />
    </div>
  );
};

export default Index;
