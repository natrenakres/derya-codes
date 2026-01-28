import { compileMDX } from "next-mdx-remote/rsc"


export async function RenderMdx({markdownContent}: {markdownContent: string}) {
    const { content}  = await compileMDX({
        source: markdownContent
    })

    return (
    <div className="col-span-2 xl:col-span-2 prose max-w-none dark:prose-invert ">
        {content}
    </div>)

}