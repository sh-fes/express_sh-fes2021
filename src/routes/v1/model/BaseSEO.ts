export interface Base_SEO_Options {
    common: Base_SEO_Common_Options;
    og: Base_SEO_Og_Options;
    fb: Base_SEO_Fb_Options;
    twitter: Base_SEO_Twitter_Options;
}
export interface Base_SEO_Common_Options {
    title: string;
    description: string;
    keywords: string;
    robots: string | null;
}
export interface Base_SEO_Og_Options {
    title: string;
    type: string;
    url: string;
    image: string;
    description: string;
    audio: string | null;
    video: string | null;
}
export interface Base_SEO_Fb_Options { }
export interface Base_SEO_Twitter_Options { }
export const Base_SEO_Common_Definition = {
    title: { type: String, required: true, },
    description: { type: String, required: true, },
    keywords: { type: String, required: true, },
    robots: { type: String, required: false, default: null, },
};
export const Base_SEO_Og_Definition = {
    title: { type: String, required: true, },
    type: { type: String, required: true, },
    url: { type: String, required: true, },
    image: { type: String, required: true, },
    description: { type: String, required: true, },
    audio: { type: String, required: false, default: null, },
    video: { type: String, required: false, default: null, },

};
export const Base_SEO_Fb_Definition = {};
export const Base_SEO_Twitter_Definition = {};
export const Base_SEO_Definition = {
    common: Base_SEO_Common_Definition,
    og: Base_SEO_Og_Definition,
    fb: Base_SEO_Fb_Definition,
    twitter: Base_SEO_Twitter_Definition,
};