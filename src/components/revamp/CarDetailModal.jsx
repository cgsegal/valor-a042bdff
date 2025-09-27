import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Gauge, Zap, Shield, Users, Calendar, Clock, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const CarDetailModal = ({ car, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rentalType, setRentalType] = useState('hourly');
  const [duration, setDuration] = useState(3);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!car) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const calculatePrice = () => {
    if (rentalType === 'hourly') {
      return car.marketHourlyPrice * duration;
    } else {
      return car.marketDailyPrice * duration;
    }
  };

  const handleAddToCart = () => {
    const rentalDetails = {
      rentalType,
      duration,
      startDate,
      startTime,
      totalPrice: calculatePrice()
    };

    addToCart(car, rentalDetails);
    onClose();
    navigate('/checkout');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden bg-black border-white/20">
        <DialogHeader>
          <DialogTitle className="text-3xl font-display text-white mb-2">
            {car.name}
          </DialogTitle>
          <DialogDescription className="text-white/70 text-lg">
            {car.brand} • {car.category} • {car.year}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-y-auto max-h-[70vh]">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <motion.img
                key={currentImageIndex}
                src={car.images[currentImageIndex]}
                alt={car.name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Navigation Arrows */}
              {car.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
                {currentImageIndex + 1} / {car.images.length}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {car.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? 'border-white'
                        : 'border-white/30 hover:border-white/60'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${car.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Car Details */}
          <div className="space-y-6">
            {/* Price and Key Stats */}
            <div className="bg-white/5 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-white/60 mb-1">Starting from</p>
                  <h3 className="text-2xl font-display text-white">
                    ${car.marketHourlyPrice}/hr • ${car.marketDailyPrice}/day
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">Premium</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Gauge className="w-5 h-5 text-white/70" />
                  <div>
                    <p className="text-white/50 text-sm">Horsepower</p>
                    <p className="text-white font-semibold">{car.horsepower}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-white/70" />
                  <div>
                    <p className="text-white/50 text-sm">0-60 mph</p>
                    <p className="text-white font-semibold">{car.acceleration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-white/70" />
                  <div>
                    <p className="text-white/50 text-sm">Top Speed</p>
                    <p className="text-white font-semibold">{car.topSpeed}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-white/70" />
                  <div>
                    <p className="text-white/50 text-sm">Engine</p>
                    <p className="text-white font-semibold text-xs">{car.engine}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xl font-display text-white mb-3">About This Vehicle</h4>
              <p className="text-white/80 leading-relaxed">{car.description}</p>
            </div>

            {/* Rental Details */}
            <div className="bg-white/5 rounded-lg p-6">
              <h4 className="text-xl font-display text-white mb-4">Rental Details</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="rental-type" className="text-white/80 mb-2 block">Rental Type</Label>
                  <Select value={rentalType} onValueChange={setRentalType}>
                    <SelectTrigger className="bg-black/50 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-white/20">
                      <SelectItem value="hourly" className="text-white hover:bg-white/10">Hourly</SelectItem>
                      <SelectItem value="daily" className="text-white hover:bg-white/10">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="duration" className="text-white/80 mb-2 block">
                    Duration ({rentalType === 'hourly' ? 'hours' : 'days'})
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    min={rentalType === 'hourly' ? 3 : 1}
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                    className="bg-black/50 border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="start-date" className="text-white/80 mb-2 block">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="bg-black/50 border-white/20 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="start-time" className="text-white/80 mb-2 block">Start Time</Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="bg-black/50 border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Total Price:</span>
                  <span className="text-2xl font-display text-white">${calculatePrice().toLocaleString()}</span>
                </div>
                <p className="text-sm text-white/60 mt-1">
                  {duration} {rentalType === 'hourly' ? 'hours' : 'days'} × ${rentalType === 'hourly' ? car.marketHourlyPrice : car.marketDailyPrice}
                </p>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-xl font-display text-white mb-3">Key Features</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {car.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="w-2 h-2 bg-white/60 rounded-full" />
                    <span className="text-white/80">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleAddToCart}
                disabled={!startDate || !startTime}
                className="flex-1 bg-white text-black hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ${calculatePrice().toLocaleString()}
              </Button>
              <Button
                variant="outline"
                className="px-6 py-3 border-white/30 text-white hover:bg-white/10"
                size="lg"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarDetailModal;
