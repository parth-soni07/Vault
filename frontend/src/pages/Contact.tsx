import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-3xl mx-auto text-center space-y-12">
        <h1 className="text-5xl font-bold text-[#a3ff47] mb-6">
          Get in <span className="text-yellow-300">Touch</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-800/30 rounded-2xl border-2 border-[#a3ff47] hover:shadow-[0_0_25px_rgba(163,255,71,0.2)] transition-all duration-300">
            <Mail className="w-8 h-8 text-[#a3ff47] mx-auto mb-4" />
            <h3 className="text-yellow-300 text-lg font-semibold mb-2">Email</h3>
            <p className="text-gray-300">hello@crayonapp.com</p>
          </div>
          
          <div className="p-6 bg-gray-800/30 rounded-2xl border-2 border-[#a3ff47] hover:shadow-[0_0_25px_rgba(163,255,71,0.2)] transition-all duration-300">
            <Phone className="w-8 h-8 text-[#a3ff47] mx-auto mb-4" />
            <h3 className="text-yellow-300 text-lg font-semibold mb-2">Phone</h3>
            <p className="text-gray-300">+1 (555) 123-4567</p>
          </div>
          
          <div className="p-6 bg-gray-800/30 rounded-2xl border-2 border-[#a3ff47] hover:shadow-[0_0_25px_rgba(163,255,71,0.2)] transition-all duration-300">
            <MapPin className="w-8 h-8 text-[#a3ff47] mx-auto mb-4" />
            <h3 className="text-yellow-300 text-lg font-semibold mb-2">Location</h3>
            <p className="text-gray-300">Creative District, Innovation City</p>
          </div>
        </div>
      </div>
    </div>
  );
};