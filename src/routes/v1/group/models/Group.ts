import { Base_Display_Definition, Base_Display_Options, Base_SEO_Definition, Base_SEO_Options } from '@v1/model';
import mongoose, { Document, Schema } from 'mongoose';

export interface Group_Display_Options extends Base_Display_Options {
    icon: string;
}
export const Group_Display_Definition = {
    icon: { type: String, required: true, },
    ...Base_Display_Definition,
}

export interface Group_SEO_Options extends Base_SEO_Options { }
export const Group_SEO_Definition = {
    ...Base_SEO_Definition,
}

export interface Group_Base_Schema_Options extends Document {
    author: string;
    createdAt: Date;
    updatedAt: Date;
    display: Group_Display_Options | null;
    seo: Group_SEO_Options | null;
}
export const Group_Base_Schema = new Schema({
    author: { type: String, required: true, },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
    display: { type: Group_Display_Definition, required: false, default: null, },
    seo: { type: Group_SEO_Definition, required: false, default: null, },
});

export interface Group_Schema_Options extends Document {
    groupId: string;
    groupTag: string[];
    main: Group_Base_Schema_Options;
    archive: Group_Base_Schema_Options[];
}
export const Group_Schema = new Schema({
    groupId: { type: String, required: true, unique: true, },
    groupTag: [{ type: String, required: true }],
    main: Group_Base_Schema,
    archive: [Group_Base_Schema],
});
export default mongoose.model('Group', Group_Schema);