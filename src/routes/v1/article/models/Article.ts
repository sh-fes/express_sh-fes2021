import { Base_Display_Definition, Base_Display_Options, Base_SEO_Definition, Base_SEO_Options } from '@v1/model';
import mongoose, { Document, Schema } from 'mongoose';

export interface Article_Display_Options extends Base_Display_Options {
    thumbnail: string;
}
export const Article_Display_Definition = {
    thumbnail: { type: String, required: true, },
    ...Base_Display_Definition,
}

export interface Article_SEO_Options extends Base_SEO_Options { }
export const Article_SEO_Definition = {
    ...Base_SEO_Definition,
}

export interface Article_Base_Schema_Options extends Document {
    author: string;
    createdAt: Date;
    updatedAt: Date;
    display: Article_Display_Options | null;
    seo: Article_SEO_Options | null;
}
export const Article_Base_Schema = new Schema({
    author: { type: String, required: true, },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
    display: { type: Article_Display_Definition, required: false, default: null, },
    seo: { type: Article_SEO_Definition, required: false, default: null, },
});

export interface Article_Schema_Options extends Document {
    articleId: string;
    groupId: string;
    groupTag: string[];
    main: Article_Base_Schema_Options;
    archive: Article_Base_Schema_Options[];
}
export const Article_Schema = new Schema({
    articleId: { type: String, required: true, unique: true, },
    groupId: { type: String, required: true, },
    groupTag: [{ type: String, required: true }],
    main: Article_Base_Schema,
    archive: [Article_Base_Schema],
});
export default mongoose.model('Article', Article_Schema);