import { AppBar } from "./AppBar"
import { Blog } from "../hooks/index"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog} : {blog: Blog}) => {
    return <div>
        <AppBar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-6 max-w-screen-2xl">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold ">
                        {blog.title}
                    </div>
                    <div className="text-slate-400 pt-2">
                        Post on 2nd Dec 2023 
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    
                    <div className="flex items-center">
                        <div>
                            <Avatar name={"Anonymous"} size={10}/>
                        </div>
                        <div>
                            <div className="text-xl font-bold pl-5 pt-2">
                                {"Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500 pl-5">
                                Random catch phrase 
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                
            </div>
            
            
        </div>
    
</div>
}