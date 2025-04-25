
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getServicesByCategory, findServiceById } from '@/data/bankServices';
import { FileCheck, ChevronDown, ChevronUp } from 'lucide-react';

const DocumentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  
  const servicesByCategory = getServicesByCategory();
  const allCategories = Object.keys(servicesByCategory);
  
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  // Initialize all categories as expanded if not set
  React.useEffect(() => {
    const initialExpanded: Record<string, boolean> = {};
    allCategories.forEach(category => {
      initialExpanded[category] = true;
    });
    setExpandedCategories(initialExpanded);
  }, []);
  
  // Filter services based on search term and category
  const filteredCategories = allCategories.filter(category => {
    if (categoryFilter && category !== categoryFilter) return false;
    
    if (!searchTerm) return true;
    
    const matchingServices = servicesByCategory[category].filter(service => 
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return matchingServices.length > 0;
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Document Checklist</h1>
          <Button onClick={() => navigate('/dashboard')} variant="outline">
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  {allCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-6">
            {filteredCategories.map(category => (
              <Card key={category}>
                <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleCategory(category)}>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{category}</CardTitle>
                    {expandedCategories[category] ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </CardHeader>
                {expandedCategories[category] && (
                  <CardContent>
                    <div className="space-y-4">
                      {servicesByCategory[category]
                        .filter(service => 
                          !searchTerm || service.name.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map(service => (
                          <div key={service.id} className="border-t pt-4 first:border-t-0 first:pt-0">
                            <h3 className="font-medium">{service.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">Required Employee: {service.requiredEmployeeRole}</p>
                            
                            <h4 className="text-sm font-medium mb-2 flex items-center">
                              <FileCheck className="h-4 w-4 mr-1 text-primary" />
                              Required Documents:
                            </h4>
                            <ul className="list-disc list-inside text-sm space-y-1 pl-4 text-gray-700">
                              {service.requiredDocuments.map((doc, index) => (
                                <li key={index}>{doc}</li>
                              ))}
                            </ul>
                          </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
            
            {filteredCategories.length === 0 && (
              <div className="text-center p-8 bg-white rounded-md shadow">
                <p className="text-gray-500">No services found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentsPage;
