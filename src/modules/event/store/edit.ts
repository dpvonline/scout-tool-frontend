import {defineStore} from "pinia";
import EventApi from "@/modules/event/services/event";

export const useEventEditStore = defineStore("eventEditStore", () => {
    const event = reactive<any>({});

    async function fetchInitialEventState (id: any): Promise<void> {
        try {
            const response = await EventApi.fetchById(id);
            const eventData = response.data;

            for (const [k, v] of Object.entries(eventData)) {
                event[k] = v;
            }
        } catch (e) {
            console.error(e)
        }
    }

    async function saveState (): Promise<void> {
        try {
            EventApi.update(event);
        } catch (e) {
            console.error(e)
        }
    }

    return {
        event, fetchInitialEventState, saveState
    }
});