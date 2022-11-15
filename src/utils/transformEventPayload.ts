import { EventsDataT, EventT } from "../../types";

export const transformEventPayload = (data: EventT[]) => {
    const groupedData = data.reduce((reducer, accumulator: EventT) => {
        reducer[accumulator.date] = [
            ...(reducer[accumulator.date] || []),
            accumulator,
        ];
        return reducer;
    }, {} as EventsDataT);

    return groupedData;
};
