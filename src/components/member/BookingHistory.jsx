
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Car, Plane, Anchor, Zap } from "lucide-react";

const serviceIcons = {
  chauffeur: Car,
  jet: Plane,
  yacht: Anchor,
  supercar: Zap
};

const statusColors = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-400/30",
  quoted: "bg-blue-500/20 text-blue-400 border-blue-400/30",
  confirmed: "bg-green-500/20 text-green-400 border-green-400/30",
  completed: "bg-gray-500/20 text-gray-400 border-gray-400/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-400/30"
};

export default function BookingHistory({ bookings }) {
  const isValidDate = (d) => d instanceof Date && !isNaN(d);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-xl font-light flex items-center gap-2 text-white">
            <Calendar className="w-5 h-5" />
            Recent Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-white/20" />
              <p className="text-white/60 font-light">No bookings yet</p>
              <p className="text-white/40 text-sm">Your booking history will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking, index) => {
                const ServiceIcon = serviceIcons[booking.service_type] || Car;
                const bookingDate = new Date(booking.date);
                const dateString = isValidDate(bookingDate) ? bookingDate.toLocaleDateString() : 'Date TBD';

                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                      <ServiceIcon className="w-5 h-5 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium capitalize text-white">{booking.service_type}</h4>
                        <Badge className={statusColors[booking.status]}>
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{booking.pickup_location || 'Not specified'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{dateString}</span>
                        </div>
                      </div>
                    </div>

                    {booking.quote_amount && (
                      <div className="text-right">
                        <div className="font-medium text-white">${booking.quote_amount.toLocaleString()}</div>
                        <div className="text-xs text-white/40">Total</div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
