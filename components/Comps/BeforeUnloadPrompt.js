import React, { useEffect } from 'react';

const BeforeUnloadPrompt = ({ onBeforeUnload }) => {
    useEffect(() => {
        const handleBeforeUnload = async (event) => {
          // Prevent the default behavior of the beforeunload event
          event.preventDefault();
    
          // Make your API call here
          await onBeforeUnload();
    
          // Allow the window reload after the API call is completed
          window.removeEventListener('beforeunload', handleBeforeUnload);
          window.location.reload();
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, []);

  return null; // This component doesn't render anything visible
};

export default BeforeUnloadPrompt;
