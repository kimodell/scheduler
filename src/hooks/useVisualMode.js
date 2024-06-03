import { useState } from "react";

// Hook to runs tests for loading intital state, transitioning to a new state
export default function useVisualMode(initial) {
    const [history, setHistory] = useState([initial]); 

    // Function to transition to a new mode
    function transition(mode, replace = false) {
      // If replace is truthy, replace the last mode in history with the new mode, else add new mode to history
      setHistory(prev => replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode]);
    }
  
    // Function to go back to the previous mode
    function back() {
      // Check if there's more than one mode in history to prevent going back to the initial mode
      if (history.length > 1) {
        // Remove previous mode from history
        setHistory(prev => [...prev.slice(0, prev.length - 1)]);
      }
    }
    return { mode: history[history.length - 1], transition, back };
  }