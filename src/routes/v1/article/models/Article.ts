import mongoose, { Document, Schema } from 'mongoose';

export interface ArticleBaseSchema extends Document {
    author: string;
    createdAt: Date;
    updatedAt: Date;
    display: {
        title: string,              /**                                 */
        description: string,        /**                                 */
        tags: string[],             /**                                 */
        thumbnail: string,          /** ^3 `image-url`                  */
        content: string,            /**                                 */
    } | null,
    seo: {
        common: {
            title: string,
            description: string,    /** ^3 length < 120                 */
            // charset:string,      /** ^1 'utf-8'                      */
            robots: string | null,  /** ^1 'noindex,nofollow' or null   */
            keywords: string,       /**                                 */
        },
        og: {
            title: string,          /**                                 */
            type: string,           /**                                 */
            url: string,            /**                                 */
            image: string,          /** ^0 node-canvas                  */
            // siteName: string,    /** ^1                              */
            description: string,    /**                                 */
            audio: string | null,   /** ^2                              */
            // locale: string,      /** ^1 'ja_JP'                      */
            video: string | null,   /** ^2                              */
        },
        fb: {
            // appId: string,       /** ^1 `facebook-app-id`            */
        }
        twitter: {
            // cardType: string,    /** ^1 `twitter-card-type`          */
        }
    } | null
}
export interface ArticleSchema extends Document {
    articleId: string;
    groupId: string;
    groupTag: string[];
    main: ArticleBaseSchema;
    archive: ArticleBaseSchema[];
}

const ArticleBaseSchemaDefinition = {
    author: { type: String, required: true, },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
    display: {
        type: {
            title: { type: String, required: true, },
            description: { type: String, required: true, },
            tags: [{ type: String, required: false, default: null, }],
            thumbnail: { type: String, required: true, },
            content: { type: String, required: true, },
        },
        required: false
    },
    seo: {
        type: {
            common: {
                title: { type: String, required: true, },
                description: { type: String, required: true, },
                robots: { type: String, required: false, default: null, },
                keywords: { type: String, required: true, },
            },
            og: {
                title: { type: String, required: true, },
                type: { type: String, required: true, },
                url: { type: String, required: true, },
                image: { type: String, required: true, },
                description: { type: String, required: true, },
                audio: { type: String, required: false, default: null, },
                video: { type: String, required: false, default: null, },
            }
        },
        required: false
    }
}
const ArticleMainSchema = new Schema(
    {
        ...ArticleBaseSchemaDefinition,
    },
    {
        // timestamps: true,
    }
);
const ArticleArchiveSchema = new Schema(
    {
        ...ArticleBaseSchemaDefinition,
        archivedAt: { type: Date, required: true, },
    },
    {
        // timestamps: true,
    }
)
const ArticleSchema = new Schema(
    {
        articleId: { type: String, required: true, unique: true, },
        groupId: { type: String, required: true, },
        groupTag: [{ type: String, required: true }],
        main: ArticleMainSchema,
        archive: [ArticleMainSchema],
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Article', ArticleSchema);