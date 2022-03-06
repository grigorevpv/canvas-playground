export interface Example {
    id: string;
    drow: (id: string) => void;
    stopDrowing: () => void;
}