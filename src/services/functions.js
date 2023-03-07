
export const handleClickOutSide = (ref, onTrigger)=>{
    const handleClick = (event)=>{
      if (ref.current && !ref.current.contains(event.target)) {
        onTrigger()
      }
        }
      document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }