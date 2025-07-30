import { useState, useMemo } from 'react';
import { Home, AlertCircle, Loader } from 'lucide-react';
import  { PropertyCard } from './components/PropertyCard';
import { PropertyModal } from './components/PropertyModal';
import { AddPropertyForm } from './components/AddPropertyForm';
import { FilterBar } from './components/FilterBar';
import { useProperties } from './hooks/useProperties';
import type { Property } from './types/Property';

function App() {
  const { properties, loading, error, addProperty } = useProperties();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAddingProperty, setIsAddingProperty] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Get unique property types for filter
  const propertyTypes = useMemo(() => {
    const types = properties.map(property => property.type);
    return Array.from(new Set(types)).sort();
  }, [properties]);

  // Filter properties based on search and type
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesSearch = searchTerm === '' || 
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedType === '' || property.type === selectedType;
      
      return matchesSearch && matchesType;
    });
  }, [properties, searchTerm, selectedType]);

  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  const handleAddProperty = async (newProperty: any) => {
    setIsAddingProperty(true);
    const success = await addProperty(newProperty);
    if (success) {
      setIsFormOpen(false);
    }
    setIsAddingProperty(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Unable to Load Properties</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            Make sure the JSON server is running on port 3001
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <Home className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Property Listings</h1>
              <p className="text-gray-600 mt-1">Discover your perfect future</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          onAddProperty={() => setIsFormOpen(true)}
          propertyTypes={propertyTypes}
        />

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProperties.length} of {properties.length} properties
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedType && ` filtered by ${selectedType}`}
          </p>
        </div>

        {/* Property Grid */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No properties found</h3>
            <p className="text-gray-400">
              {searchTerm || selectedType 
                ? "Try adjusting your search criteria" 
                : "No properties available at the moment"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      <AddPropertyForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddProperty}
        isLoading={isAddingProperty}
      />
    </div>
  );
}

export default App;