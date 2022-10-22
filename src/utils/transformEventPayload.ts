import { EventsDataT, EventT } from "./types";

export const transformEventPayload = (data: any) => {
    const groupedData: EventsDataT = data.reduce(
        (reducer: { [key: string]: EventT[] }, accumulator: EventT) => {
            reducer[accumulator.date] = [
                ...(reducer[accumulator.date] || []),
                accumulator,
            ];
            return reducer;
        },
        []
    );

    // return Object.values(groupedData);
    return groupedData;
};
