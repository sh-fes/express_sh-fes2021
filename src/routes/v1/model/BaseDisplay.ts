export interface Base_Display_Options {
    title: string;
    description: string;
    content: string;
    tags: string[] | null;
}
export const Base_Display_Definition = {
    title: { type: String, required: true, },
    description: { type: String, required: true, },
    content: { type: String, required: true, },
    tags: { type: [{ type: String }], required: false, default: null, },
}