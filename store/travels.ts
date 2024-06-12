import { defineStore } from "pinia";
import { type Travel } from "~/types/travel";

export const useTravelsStore = defineStore("travels", () => {
  const travels = ref<Travel[]>([]);
  const isLoaded = ref(false);

  const fetchTravels = async () => {
    if (!isLoaded.value) {
      try {
        const response = await fetch("/api/travels");
        const data: Travel[] = await response.json();
        travels.value = data;
        isLoaded.value = true;
      } catch (error) {
        console.error("Failed to fetch travels:", error);
      }
    }
  };

  const addTravel = (travel: Travel) => {
    travels.value.unshift(travel);
  };

  const updateTravel = (updatedTravel: Travel) => {
    const index = travels.value.findIndex(
      (t) => t.travelId === updatedTravel.travelId
    );
    if (index !== -1) {
      travels.value[index] = updatedTravel;
    }
  };

  const removeTravel = (travelId: number) => {
    travels.value = travels.value.filter((t) => t.travelId !== travelId);
  };

  const getTravels = () => travels.value;

  return {
    travels,
    isLoaded,
    addTravel,
    updateTravel,
    removeTravel,
    getTravels,
    fetchTravels,
  };
});
