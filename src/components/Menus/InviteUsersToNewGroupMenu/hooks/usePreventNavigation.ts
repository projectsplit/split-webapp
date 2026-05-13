import { useEffect } from "react";

export const usePreventNavigation = ()=>{
      useEffect(() => {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = ''; 
      };
      window.history.pushState(null, '', window.location.href);
      const handlePopState = () => {
        window.history.pushState(null, '', window.location.href);
      };
    
      window.addEventListener('beforeunload', handleBeforeUnload);
      window.addEventListener('popstate', handlePopState);
    
      const html = document.documentElement;
      const body = document.body;
      html.style.overscrollBehavior = 'none'; 
      body.style.overscrollBehavior = 'none';
    
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        window.removeEventListener('popstate', handlePopState);
        html.style.overscrollBehavior = 'auto';
        body.style.overscrollBehavior = 'auto';
    
      };
    }, []);
}
