import { createContext, useReducer, useContext } from 'react';

/**
 * ResumeContext: Central state management for the Resume Butler application
 */
const ResumeContext = createContext();

const initialState = {
  // Original file data
  file: {
    data: null,
    name: '',
    type: '',
    size: 0,
    uploadProgress: 0,
    uploadError: null
  },
  
  // Parsed resume content
  parsedResume: {
    rawText: '',
    sections: [],
    metadata: {
      totalWords: 0,
      languageIdentified: ''
    },
    parsingError: null
  },
  
  // Analysis state
  analysis: {
    status: 'idle',
    results: {
      atsScore: 0,
      feedback: [],
      optimizedContent: {
        sections: []
      },
      keywordAnalysis: {
        missingKeywords: [],
        recommendedAdditions: []
      }
    },
    error: null
  },
  
  // Application state
  ui: {
    currentStep: 'upload',
    isNavigationLocked: false
  }
};

/**
 * Reducer function to handle all state transitions
 */
function resumeReducer(state, action) {
  switch (action.type) {
    // File actions
    case 'SET_FILE':
      return {
        ...state,
        file: {
          ...state.file,
          data: action.payload,
          name: action.payload.name || '',
          type: action.payload.type || '',
          size: action.payload.size || 0,
          uploadProgress: 0,
          uploadError: null
        }
      };
    
    case 'UPDATE_UPLOAD_PROGRESS':
      return {
        ...state,
        file: {
          ...state.file,
          uploadProgress: action.payload
        }
      };
    
    case 'SET_UPLOAD_ERROR':
      return {
        ...state,
        file: {
          ...state.file,
          uploadError: action.payload
        }
      };
    
    case 'CLEAR_FILE':
      return {
        ...state,
        file: {
          ...initialState.file
        }
      };
    
    // Parsing actions
    case 'SET_PARSED_RESUME':
      return {
        ...state,
        parsedResume: {
          ...state.parsedResume,
          ...action.payload,
          parsingError: null
        }
      };
    
    case 'SET_PARSING_ERROR':
      return {
        ...state,
        parsedResume: {
          ...state.parsedResume,
          parsingError: action.payload
        }
      };
    
    case 'CLEAR_PARSED_RESUME':
      return {
        ...state,
        parsedResume: {
          ...initialState.parsedResume
        }
      };
    
    // Analysis actions
    case 'START_ANALYSIS':
      return {
        ...state,
        analysis: {
          ...state.analysis,
          status: 'loading',
          error: null
        }
      };
    
    case 'ANALYSIS_SUCCESS':
      return {
        ...state,
        analysis: {
          ...state.analysis,
          status: 'success',
          results: action.payload,
          error: null
        }
      };
    
    case 'ANALYSIS_FAILURE':
      return {
        ...state,
        analysis: {
          ...state.analysis,
          status: 'error',
          error: action.payload
        }
      };
    
    case 'CLEAR_ANALYSIS':
      return {
        ...state,
        analysis: {
          ...initialState.analysis
        }
      };
    
    // UI actions
    case 'SET_CURRENT_STEP':
      return {
        ...state,
        ui: {
          ...state.ui,
          currentStep: action.payload
        }
      };
    
    case 'LOCK_NAVIGATION':
      return {
        ...state,
        ui: {
          ...state.ui,
          isNavigationLocked: true
        }
      };
    
    case 'UNLOCK_NAVIGATION':
      return {
        ...state,
        ui: {
          ...state.ui,
          isNavigationLocked: false
        }
      };
    
    default:
      return state;
  }
}

/**
 * Provider component that wraps the application and provides the resume state
 */
export function ResumeProvider({ children }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState);
  
  // Helper functions for common state operations
  const setFile = (file) => dispatch({ type: 'SET_FILE', payload: file });
  const updateUploadProgress = (progress) => dispatch({ type: 'UPDATE_UPLOAD_PROGRESS', payload: progress });
  const setParsedResume = (data) => dispatch({ type: 'SET_PARSED_RESUME', payload: data });
  const startAnalysis = () => dispatch({ type: 'START_ANALYSIS' });
  const setAnalysisResults = (results) => dispatch({ type: 'ANALYSIS_SUCCESS', payload: results });
  const setCurrentStep = (step) => dispatch({ type: 'SET_CURRENT_STEP', payload: step });
  
  // Context value with state, dispatch and helper functions
  const value = {
    state,
    dispatch,
    actions: {
      setFile,
      updateUploadProgress,
      setParsedResume,
      startAnalysis,
      setAnalysisResults,
      setCurrentStep
    }
  };
  
  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
}

/**
 * Custom hook to use the resume context
 */
export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}