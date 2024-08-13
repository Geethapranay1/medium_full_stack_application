import { AppBar } from "../components/AppBar";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";

export const Blog = () => {

    //atomFamilies SelectorFamiles
    const {id} = useParams()
    const { blog, loading} = useBlog({
        id : id || ""
    });
    if (loading) {
        return <div>
            <AppBar />
            <div className="flex justify-center items-center h-screen">
            <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-gray-900"
            role="status">
            <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span>
            </div>
            </div>
            

        </div>
    }
    return <div>
        <FullBlog  blog={blog}/>
    </div>
}