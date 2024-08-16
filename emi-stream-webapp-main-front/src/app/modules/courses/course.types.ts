export interface Course
{
    id?: string,
    title: string,
    description: string,
    benefits: CourseValue[],
    requirements: CourseValue[],
    level: string,
    duration: string,
    category: string,
    courseStatus: string,
    certification: boolean,
    topics: Topic[],
    thumbnail: Thumbnail,
}

export interface Topic 
{
    id?: string,
    name: string,
    description: string,
    status: string[],
    url: string[],
}

export interface Thumbnail
{
    id?: string,
    videoId?: string,
    videoUrl: string
}

export interface CourseValue
{
    value : string
}

export interface CourseStatus 
{
    value: string;
    viewValue: string;
    icon : string;
}

export interface Level 
{
    value: string;
    viewValue: string;
    icon : string;
}