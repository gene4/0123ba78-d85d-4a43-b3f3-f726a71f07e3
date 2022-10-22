export type EventT = {
    _id: string;
    title: string;
    flyerFront?: string;
    venue: {
        name: string;
        direction: string;
    };
    startTime: string;
    endTime: string;
    date: string;
};

export type EventsDataT = {
    [key: string]: EventT[];
};
