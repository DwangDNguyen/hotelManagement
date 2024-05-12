import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocationHotelStore {
    longitude: string | null;
    latitude: string | null;
    setLongitude: (longitude: string) => void;
    setLatitude: (latitude: string) => void;
}

const useLocationHotel = create<LocationHotelStore>()(
    persist(
        (set) => ({
            longitude: null,
            latitude: null,
            setLongitude: (longitude: string) => set({ longitude }),
            setLatitude: (latitude: string) => set({ latitude }),
        }),
        {
            name: "locationHotel",
        }
    )
);

export default useLocationHotel;
