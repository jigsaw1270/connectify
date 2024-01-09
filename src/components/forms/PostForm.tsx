import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../Shared/FileUploader"
import { PostValidation } from "@/lib/validation"
import { useUserContext } from "@/context/AuthContext"
import { useToast } from "../ui/use-toast"
import { useCreatePost } from "@/lib/react-query/queriesAndMutations"
import { createPost } from "@/lib/appwrite/api"


type PostFormProps = {
    post?: Models.Document;
}
 


const PostForm = ({post}: PostFormProps) => {

    const { mutateAsync : CreatePost , isPending : isLoadingCreate } = useCreatePost();

    const {user } = useUserContext();
    const {toast} = useToast();
    const  navigate  = useNavigate();
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
          caption : post ? post?.caption : "",
          file : [],
          location :  post ?  post?.location : " ",
          tags : post ?  post.tags.join(',') : ''
        },
      })
     
      // 2. Define a submit handler.
     async function onSubmit(values: z.infer<typeof PostValidation>) {
      const newPost  = await createPost({
        ...values,
        userId: user.id,
    })

    if(!newPost){
        toast({
            title: 'Please try again'
        })
    }
    navigate('/');
      }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full max-w-5xl gap-9">
      <FormField
        control={form.control}
        name="caption"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Caption</FormLabel>
            <FormControl>
              <Textarea className="shad-textarea custom-scrollbar" placeholder="shadcn" {...field} />
            </FormControl>
           
            <FormMessage className="shad-form_message" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Add Photos</FormLabel>
            <FormControl>
           <FileUploader fieldChange= {field.onChange} mediaUrl ={post?.imageUrl}/>
            </FormControl>
           
            <FormMessage className="shad-form_message" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Add Location</FormLabel>
            <FormControl>
      <Input type="text" className="shad-input"  {...field}/>
            </FormControl>
           
            <FormMessage className="shad-form_message" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Add Tags(separated  by comma " , ")</FormLabel>
            <FormControl>
      <Input type="text" className="shad-input"  placeholder="Art, Expression , Learn, Viral" {...field}/>
            </FormControl>
           
            <FormMessage className="shad-form_message" />
          </FormItem>
        )}
      />
      <div className="flex items-center justify-end gap-4"><Button type="submit" className="shad-button_dark_4">cancel</Button></div>
      <div><Button type="submit" className="shad-button_primary whitespace-nowrap">Submit</Button></div>
      
    </form>
  </Form>
  )
}

export default PostForm