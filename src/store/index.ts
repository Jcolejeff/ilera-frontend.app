import { create,} from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import authSlice, { AuthStateType } from './auth';


export type StoreType = AuthStateType


const useStore = create<StoreType>()(
    persist(
      devtools((...a) => ({
        ...authSlice(...a),
      })), {
        name: 'store'
      }
    ),
  );
  

  export default useStore;
