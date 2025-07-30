import React from 'react';
import { X, MapPin, Square } from 'lucide-react';
import type { Property } from '../types/Property';

interface PropertyModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({ property, isOpen, onClose }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-64 md:h-80 object-cover rounded-t-xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
          <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full text-lg font-semibold">
            {property.type}
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">{property.name}</h2>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-lg">{property.location}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {formatPrice(property.price)}
              </div>
            </div>
          </div>
          
          
          <div className="grid grid-cols-3 gap-6 mb-6 p-4 bg-gray-50 rounded-lg">  
            <div className="text-center">
              <Square className="w-8 h-8 mx-auto mb-2 text-gray-600" />
              <div className="text-2xl font-bold text-gray-900">{property.sqft.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Sq Ft</div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{property.fullDescription}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Location Map</h3>
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MapPin className="w-12 h-12 mx-auto mb-2" />
                <p>Interactive map would be embedded here</p>
                <p className="text-sm">Coordinates: {property.coordinates.lat}, {property.coordinates.lng}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Close
            </button>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium">
              Contact Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};