
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Coffee, ShoppingBag, Film, Utensils, Gift } from 'lucide-react';
import { RewardItem, UserPoints } from '@/types/reward';
import { rewardItems } from '@/data/rewardItems';

interface RewardStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  userPoints: UserPoints;
  onPurchase: (item: RewardItem) => void;
}

const RewardStoreModal: React.FC<RewardStoreModalProps> = ({
  isOpen,
  onClose,
  userPoints,
  onPurchase
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'beverage': return <Coffee className="w-4 h-4" />;
      case 'food': return <Utensils className="w-4 h-4" />;
      case 'shopping': return <ShoppingBag className="w-4 h-4" />;
      case 'entertainment': return <Film className="w-4 h-4" />;
      default: return <Gift className="w-4 h-4" />;
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'beverage': return '음료';
      case 'food': return '음식';
      case 'shopping': return '쇼핑';
      case 'entertainment': return '엔터테인먼트';
      default: return '전체';
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? rewardItems 
    : rewardItems.filter(item => item.category === selectedCategory);

  const categories = ['all', 'beverage', 'food', 'shopping', 'entertainment'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Gift className="w-5 h-5 text-purple-600" />
            <span>리워드 상점</span>
          </DialogTitle>
          <DialogDescription>
            포인트로 다양한 리워드를 교환하세요
          </DialogDescription>
        </DialogHeader>

        {/* Points Display */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-800">내 포인트</span>
              </div>
              <span className="text-xl font-bold text-purple-600">
                {userPoints.totalPoints.toLocaleString()}P
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-5">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="flex items-center space-x-1"
              >
                {getCategoryIcon(category)}
                <span className="text-xs">{getCategoryText(category)}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <Card 
                  key={item.id} 
                  className={`hover:shadow-md transition-all ${
                    userPoints.totalPoints >= item.pointsCost 
                      ? 'border-green-200 hover:border-green-300' 
                      : 'border-gray-200 opacity-75'
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {item.brand}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-600">
                          {item.pointsCost.toLocaleString()}P
                        </div>
                        {item.stock && (
                          <div className="text-xs text-gray-500">
                            재고 {item.stock}개
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                    <Button 
                      className="w-full"
                      disabled={userPoints.totalPoints < item.pointsCost || !item.isAvailable}
                      onClick={() => onPurchase(item)}
                      variant={userPoints.totalPoints >= item.pointsCost ? "default" : "outline"}
                    >
                      {userPoints.totalPoints >= item.pointsCost ? '교환하기' : '포인트 부족'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Gift className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>해당 카테고리에 리워드가 없습니다.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RewardStoreModal;
