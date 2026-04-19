const mockData = [];

export const getEntries = () => {
    return Promise.resolve(mockData);
};

export const createEntry = (entry) => {
    mockData.push(entry);
    return Promise.resolve(entry);
};