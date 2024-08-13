import { Link } from "react-router-dom"

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id: number
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
    <div className="border-b border-slate-200 pb-4 pt-4 w-screen max-w-screen-md cursor-pointer ">
        <div className="flex items-center pb-2">
            <div className="w-6 h-6">
                <Avatar name={authorName} size={6}/>
            </div>
             
            <div className="pl-2 font-semibold text-sm">{authorName}</div> 
            <div className="text-sm font-thin text-slate-500 pl-2">
                &#9679;
            </div>
            <div className="pl-2 font-extralight text-slate-400">{publishedDate} </div>
        </div>
        <div className="text-xl font-semibold pr-2">
            {title}
        </div>
        <div className="font-thin text-md">
            {content.slice(0,100) + "..."}
        </div>
        <div className="text-slate-400 text-sm font-thin pt-4">
            {`${Math.ceil(content.length / 100)} min read`}
        </div>
    
    </div>
    </Link>
}

export function Avatar({ name, size } : { name: string, size: number }) {
    return <div>
        <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
            <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>
        </div>


}