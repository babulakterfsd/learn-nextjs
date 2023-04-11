import { useContext } from 'react';
import { GlobalStatesContext } from '../context/GlobalStatesProvider';

const useGlobalStates = () => useContext(GlobalStatesContext);

export default useGlobalStates;
