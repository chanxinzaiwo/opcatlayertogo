
import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-500 py-12 border-t border-stone-900">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center items-center gap-2 mb-4 font-bold text-stone-300">
            OP_CAT Layer
        </div>
        <p className="text-sm mb-6 max-w-md mx-auto">
            Restoring the original vision of Bitcoin. <br/>
            Making it programmable, scalable, and secure.
        </p>
        <div className="text-xs flex flex-col md:flex-row justify-center items-center gap-4 opacity-60">
            <p>© 2025 OP_CAT Labs. All Rights Reserved.</p>
            <span className="hidden md:inline">•</span>
            <p className="flex items-center gap-1">
                Built with <Heart size={10} className="text-red-500 fill-red-500" /> for Bitcoin
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
